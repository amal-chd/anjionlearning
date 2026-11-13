import { defineConfig, loadEnv } from 'vite';
import registrationHandler from './api/registrations.js';

function localRegistrationApi() {
  return {
    name: 'local-registration-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (new URL(req.url || '/', 'http://localhost').pathname !== '/api/registrations') return next();
        if (req.method === 'POST') {
          let raw = '';
          req.setEncoding('utf8');
          for await (const chunk of req) {
            raw += chunk;
            if (raw.length > 16_384) {
              res.statusCode = 413; res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid request size.' })); return;
            }
          }
          try { req.body = JSON.parse(raw); }
          catch { res.statusCode = 400; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: 'Please submit valid registration details.' })); return; }
        }
        const response = {
          setHeader: (key, value) => res.setHeader(key, value),
          status(code) { res.statusCode = code; return this; },
          json(value) { res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(value)); return this; },
          send(value) { res.end(value); return this; },
        };
        try { await registrationHandler(req, response); }
        catch (error) { console.error('Local registration API error:', error); if (!res.headersSent) { res.statusCode = 500; res.end(JSON.stringify({ error: 'Registration service error.' })); } }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['DATABASE_URL', 'POSTGRES_URL', 'ADMIN_API_TOKEN', 'RATE_LIMIT_SECRET']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  }
  return { plugins: [localRegistrationApi()] };
});
