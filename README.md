# Anjion Learning — The Strategy Drop

A responsive React campaign website for two separate free webinar funnels: FCI Exam Strategy and Kerala PSC LDC Study Strategy. Built with Vite, React, Vercel Functions, and Neon/Postgres.

## Local development

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

The site pages are `/`, `/fci`, `/kerala-psc-ldc`, `/privacy`, and `/admin`. The Vite development server mounts the same registration handler as the Vercel Function at `POST /api/registrations`; it needs a working database URL for a successful save. The admin CSV export uses `GET /api/registrations` with a bearer token.

For local API development, create a `.env.local` file with `DATABASE_URL` from a Neon database, `ADMIN_API_TOKEN` set to a long random secret, and optionally `RATE_LIMIT_SECRET` (otherwise a keyed hash uses the database URL). Do not commit `.env.local` or production credentials.

## Deploy to Vercel

1. Import this repository into Vercel and keep the project root at the repository root. Vercel detects Vite; the production build command is `npm run build` and output directory is `dist`.
2. Add a PostgreSQL integration from the Vercel Marketplace (Neon is the configured serverless driver) and ensure `DATABASE_URL` or `POSTGRES_URL` is available to production and preview environments. The API creates the required tables on first use.
3. Set `ADMIN_API_TOKEN` to a high-entropy secret and `RATE_LIMIT_SECRET` to another high-entropy secret in Vercel project settings. Redeploy after changing environment variables.
4. Optionally set `VITE_META_PIXEL_ID` to the numeric Meta Pixel ID, then redeploy. The Meta Lead conversion fires only after the database insert succeeds. If unset, there is no Meta Pixel request. UTM parameters and `fbclid` / `gclid` are preserved for the registration record.
5. The API Function is pinned to Mumbai (`bom1`) for the India-focused audience; choose the matching Mumbai / `ap-south-1` region for the Neon database where available. Review consent/privacy text for the business’s actual contact, retention and deletion policies before public launch.

No event date, time, instructor profile, testimonial or pass limit has been invented. Add these only after they are confirmed. The privacy page and form copy should be updated if the business's actual handling differs from the documented flow.

## Lead workflow and CRM integration plan

Registration form submissions are validated in the Vercel Function and stored in the connected Postgres database. A pass confirmation is shown only for a successful insert. The private `/admin` page downloads a CSV after checking `ADMIN_API_TOKEN`; the export includes campaign attribution. Import that file to the approved CRM/Google Sheet workflow using restricted staff access. For automatic CRM delivery, add a server-side webhook after the database insert, store the CRM credential in Vercel environment variables, and retry failed deliveries without affecting the saved registration. Do not expose the admin token or CRM secret in browser code.

The API includes a database-backed per-minute IP rate limit (stores an HMAC, not the raw IP), a hidden honeypot field, strict form value allowlists, and prepared SQL values. Registration exports contain personal information; share and retain them only under the business's approved data policy.

## Conversion strategy

The home page routes aspirants to the correct exam-specific page. Each page repeats one dominant free-pass action, explains concrete takeaways and attendee fit, then asks only for the contact and preparation information needed to follow up. Mobile uses a fixed CTA. Success and Meta Lead tracking happen after save, while validation and API failures remain on the form. Dates and urgency stay factual until an event schedule is confirmed.
