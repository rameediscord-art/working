---
name: Email setup
description: Nodemailer + Gmail SMTP configured for rameediscord@gmail.com with app password
---

Email is sent via Nodemailer using Gmail SMTP.

- Gmail account: rameediscord@gmail.com
- Env var: `GMAIL_APP_PASSWORD` (stored as shared env var in Replit)
- Helper file: `artifacts/api-server/src/lib/email.ts`
- Functions: `sendPasswordResetEmail`, `sendOrderConfirmationEmail`, `sendContactEmail`

**Why:** Resend and other third-party email services require external accounts. Gmail app passwords work without any third-party integration — the user provided the app password directly.

**How to apply:** If `GMAIL_APP_PASSWORD` is not set, the helper logs a warning and skips sending (graceful degradation). Always check this env var is set when deploying to production.
