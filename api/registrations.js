import { neon } from '@neondatabase/serverless';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

const WEBINARS = new Set(['FCI', 'Kerala PSC LDC']);
const PREPARATION_STATUSES = new Set([
  'Just getting started',
  'Preparing now',
  'Revising and practising',
]);
const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid',
];

let initialized;
async function ensureSchema(sql) {
  if (!initialized) {
    initialized = Promise.all([sql`CREATE TABLE IF NOT EXISTS webinar_registrations (
      id UUID PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      mobile VARCHAR(15) NOT NULL,
      email VARCHAR(254),
      preparation_status VARCHAR(40) NOT NULL,
      webinar VARCHAR(40) NOT NULL,
      consent BOOLEAN NOT NULL CHECK (consent = true),
      attribution JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`, sql`CREATE TABLE IF NOT EXISTS webinar_registration_limits (
      ip_hash CHAR(64) NOT NULL,
      minute_bucket BIGINT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 1,
      PRIMARY KEY (ip_hash, minute_bucket)
    )`]);
    try { await initialized; } catch (error) { initialized = undefined; throw error; }
  }
}

function reply(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = process.env.ADMIN_API_TOKEN;
    const provided = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token || provided.length !== token.length || !timingSafeEqual(Buffer.from(provided), Buffer.from(token))) {
      return reply(res, 401, { error: 'Access denied.' });
    }
    const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!databaseUrl) return reply(res, 503, { error: 'Registration storage is unavailable.' });
    try {
      const sql = neon(databaseUrl);
      await ensureSchema(sql);
      const rows = await sql`SELECT id, full_name, mobile, email, preparation_status, webinar, consent, attribution, created_at FROM webinar_registrations ORDER BY created_at DESC LIMIT 50000`;
      const columns = ['id', 'created_at', 'full_name', 'mobile', 'email', 'preparation_status', 'webinar', 'consent', 'attribution'];
      const cell = (value) => {
        let text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
        if (/^[=+@\-\t\r]/.test(text)) text = `'${text}`;
        return `"${text.replace(/"/g, '""')}"`;
      };
      const csv = [columns.join(','), ...rows.map((row) => columns.map((column) => cell(row[column])).join(','))].join('\r\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=anjion-webinar-registrations.csv');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(csv);
    } catch (error) {
      console.error('Registration export error:', error instanceof Error ? error.message : 'unknown');
      return reply(res, 503, { error: 'Could not export registrations right now.' });
    }
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return reply(res, 405, { error: 'Method not allowed.' });
  }
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) return reply(res, 503, { error: 'Registration is temporarily unavailable. Please try again later.' });

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(res, 400, { error: 'Please submit valid registration details.' });
  if (typeof body.website === 'string' && body.website.trim()) return reply(res, 422, { error: 'Unable to process this registration.' });

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const rawMobile = typeof body.mobile === 'string' ? body.mobile.trim() : '';
  const mobile = rawMobile.replace(/\D/g, '');
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const preparationStatus = body.preparationStatus;
  const webinar = body.webinar;
  const consent = body.consent === true || body.consent === 'on' || body.consent === 'true';

  if (fullName.length < 2 || fullName.length > 100) return reply(res, 422, { error: 'Enter your full name (2 to 100 characters).' });
  if (mobile.length < 8 || mobile.length > 15 || !/^[0-9+()\-\s]+$/.test(rawMobile)) return reply(res, 422, { error: 'Enter a valid mobile number.' });
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return reply(res, 422, { error: 'Enter a valid email address or leave it blank.' });
  if (!PREPARATION_STATUSES.has(preparationStatus) || !WEBINARS.has(webinar) || !consent) {
    return reply(res, 422, { error: 'Choose your preparation status and webinar, and agree to the registration terms.' });
  }

  const sql = neon(databaseUrl);
  const forwarded = req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const ip = String(forwarded).split(',')[0].trim();
  const rateSecret = process.env.RATE_LIMIT_SECRET || databaseUrl;
  const ipHash = createHmac('sha256', rateSecret).update(ip).digest('hex');
  const bucket = Math.floor(Date.now() / 60_000);

  try {
    await ensureSchema(sql);
    const [counter] = await sql`
      INSERT INTO webinar_registration_limits (ip_hash, minute_bucket, attempts)
      VALUES (${ipHash}, ${bucket}, 1)
      ON CONFLICT (ip_hash, minute_bucket)
      DO UPDATE SET attempts = webinar_registration_limits.attempts + 1
      RETURNING attempts`;
    if (Number(counter.attempts) > 12) return reply(res, 429, { error: 'Too many attempts. Please wait a minute and try again.' });

    const id = randomUUID();
    const attributionInput = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};
    const attribution = Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, String(attributionInput[key] || '').slice(0, 300)]));
    await sql`INSERT INTO webinar_registrations
      (id, full_name, mobile, email, preparation_status, webinar, consent, attribution)
      VALUES (${id}, ${fullName}, ${mobile}, ${email || null}, ${preparationStatus}, ${webinar}, true, ${JSON.stringify(attribution)}::jsonb)`;

    if (Math.random() < 0.02) await sql`DELETE FROM webinar_registration_limits WHERE minute_bucket < ${bucket - 120}`;
    return reply(res, 201, { ok: true, registrationId: id.slice(0, 8).toUpperCase() });
  } catch (error) {
    console.error('Registration service error:', error instanceof Error ? error.message : 'unknown');
    return reply(res, 503, { error: 'We couldn’t save your pass right now. Please try again shortly.' });
  }
}
