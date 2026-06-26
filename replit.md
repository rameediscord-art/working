# NexusHub

NexusHub is a premium digital services platform where customers browse plans, check out, and receive order confirmations — managed by an admin dashboard.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `GMAIL_APP_PASSWORD` — Gmail App Password for rameediscord@gmail.com (stored as shared env var)
- Required env: `SESSION_SECRET` — session signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 (port 8080)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Email: Nodemailer + Gmail SMTP (rameediscord@gmail.com)

## Where things live

- `artifacts/discord-services` — public landing page at `/`
- `artifacts/admin-dashboard` — admin panel at `/admin`
- `artifacts/api-server` — Express API at `/api`
- `lib/db/src/schema/` — Drizzle ORM tables (source of truth for DB)
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for API)
- `lib/api-client-react/src/generated/` — auto-generated React Query hooks (do not edit)

## Architecture decisions

- Contract-first API: all endpoints defined in `openapi.yaml` first, hooks generated via Orval codegen
- All `db` and table imports come from `@workspace/db` — never from a local `../db` path
- Order IDs use format `ORD-YYYYMMDD-XXXXX` (5 random digits), generated server-side
- Account lockout after failed logins: 30 minutes (not 15)
- Email is sent via Nodemailer + Gmail SMTP; `GMAIL_APP_PASSWORD` must be set

## Product

- **Public site** (`/`): Hero, Services, Pricing, Testimonials, FAQ, Contact form, full legal pages (Privacy, Terms, Refund, Cookies), About page, Checkout page, Order Confirmation page
- **Checkout flow**: Customer fills name + email + plan → order created → receives Order ID by email → admin sees order in dashboard
- **Admin dashboard** (`/admin`): Dashboard stats, Orders management, Plans, Packs, Settings, Audit Logs, Forgot/Reset Password flow

## User preferences

- Contact/support email: rameediscord@gmail.com
- No Discord, LemonSqueezy, or country/address references anywhere on the site
- Payment processor branding: Paddle
- Legal pages use the full provided content (not placeholder text)

## Gotchas

- Always import `db` from `@workspace/db`, never from a local path like `../db`
- After any OpenAPI spec change, run codegen: `pnpm --filter @workspace/api-spec run codegen`
- After any DB schema change, run push: `pnpm --filter @workspace/db run push`
- The admin dashboard has pre-existing TS errors in packs.tsx, plans.tsx, settings.tsx — these are known and unrelated to new features
- Never name OpenAPI schemas `<OperationIdPascal>Response` or `<OperationIdPascal>Body` — causes TS2308

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
