# AAN Legacy Foundation deployment checklist

This checklist separates work that can be completed in the repository from work that must be configured and verified in the hosting, database, Paystack, email, and domain environments.

## 1. Environment configuration

### Development

- Copy `.env.example` to `.env`.
- Use a non-production PostgreSQL database.
- Use test Paystack credentials only.
- Use a development `NEXT_PUBLIC_APP_URL`.
- Never use production donor, applicant, or payment data locally.

### Staging and production

Configure secrets through the hosting provider, not Git:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL` using the HTTPS production URL
- `APPLICATION_ENCRYPTION_KEY`
- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` if the chosen Paystack client flow requires it
- Database-backed administrator sessions and role assignments
- Email provider credentials when transactional email is enabled

Verify that `.env`, `.env.local`, and provider secret exports are not committed.

## 2. Database and media

- Provision managed PostgreSQL with encrypted connections.
- Create a least-privilege application database user.
- Run `npm ci`.
- Run `npm run db:generate`.
- Review the migration SQL.
- Apply production migrations with `npm run db:migrate:deploy`.
- Confirm backups, point-in-time recovery, retention, and restore testing.
- Configure private object storage for scholarship documents.
- Enable malware scanning and size/type restrictions before document uploads are enabled.
- Do not use local filesystem storage for production uploads.

## 3. Payments and email

- Activate the correct Paystack business/test mode.
- Configure the webhook URL as `/api/paystack/webhook`.
- Confirm webhook signatures are validated.
- Test successful, failed, cancelled, pending, duplicate, and replayed events.
- Configure a verified email sender and delivery monitoring.
- Do not log card details, Paystack secret keys, or full sensitive payloads.

## 4. Authentication and administration

- Do not launch applicant submissions until real authentication and sessions are enabled.
- Create individual admin accounts with hashed passwords, secure sessions, logout, recovery, and optional MFA.
- Assign database-backed roles per user.
- Confirm inactive users cannot access admin APIs.
- Create the first production administrator through a controlled bootstrap process.
- Review administrator permissions for dashboard, events, stories, donations, applications, users, and settings.

## 5. Hosting and network

- Deploy to a Node.js-compatible Next.js host; GitHub Pages is not suitable for this server-backed application.
- Configure a custom domain and HTTPS certificate.
- Redirect HTTP to HTTPS.
- Configure DNS and verify the canonical `NEXT_PUBLIC_APP_URL`.
- Keep CORS same-origin by default; explicitly allow only trusted origins if a separate frontend is introduced.
- Retain the configured security headers and review the Content Security Policy after adding third-party services.
- Use platform or distributed rate limiting in addition to the process-local development safeguard.

## 6. Pre-deployment commands

Run from a clean checkout:

```bash
npm ci
npm run db:generate
npm run env:check
npm run typecheck
npm run lint
npm run build
npm run db:migrate:deploy
```

Apply migrations before starting the new application version, and confirm the migration completed successfully.

## 7. Critical-flow verification

The following flows must be tested in staging with test data before production:

1. Public navigation at mobile and desktop widths
2. User registration
3. Login and logout
4. Scholarship application
5. Secure document upload and malware rejection
6. Admin login and role restrictions
7. Application review and status change
8. Volunteer registration
9. Event registration, duplicate prevention, capacity, deadline, and CSV export
10. Donation initialization
11. Paystack verification and webhook processing
12. Story draft, publish, edit, and delete permissions

Record the expected result, observed result, environment, and tester for every flow. Do not mark the application production-ready while any required flow is untested or failing.

## 8. Post-deployment smoke test

- Open the homepage, About, Programs, Scholarships, Stories, Events, and Donate pages.
- Verify page titles, canonical URLs, Open Graph metadata, `robots.txt`, and `sitemap.xml`.
- Submit one controlled event registration.
- Run one Paystack test transaction and verify the webhook.
- Create and publish one controlled story.
- Open the admin dashboard and confirm metrics load.
- Check error monitoring, logs, database health, webhook delivery, backups, and rate-limit dashboards.
- Remove all test records or clearly mark them as test data.

## 9. Monitoring and operations

- Configure error tracking with secret/PII redaction.
- Monitor response time, error rate, database connections, queue/email failures, payment failures, and webhook retries.
- Alert on failed backups and migration failures.
- Define an incident owner and rollback process.
- Review dependencies and security advisories regularly.
- Schedule background jobs only when a concrete requirement exists; document each job, retry policy, and failure alert.
