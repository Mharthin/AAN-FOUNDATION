# AAN Legacy Foundation production-readiness status

This is the quick status page for the production-readiness work. The detailed roadmap remains in [PRODUCTION_READINESS_PLAN.md](./PRODUCTION_READINESS_PLAN.md), and deployment tasks remain in [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

Last checked: 2026-10-05

## Decision

**Stage 2 remains in progress. Do not enable real users or proceed to Stage 3 yet.**

Stage 1 database setup was completed for the original Supabase project. A separate staging Supabase project now exists, but no migrations have been confirmed on it. The Vercel project tracks `main` for Production and non-production branches for Preview. A fresh Preview from `staging` was blocked because the commit author lacked deployment access on the Hobby plan for this private repository.

The live Vercel homepage can be viewed, but do not use its forms, authentication, donation, or application flows. Treat it as visual-only until a genuine Preview deployment is unblocked and verified.

## Stage 1 — Data protection and safe environment

### Completed

- Prisma is configured for PostgreSQL.
- Database credentials are read from `DATABASE_URL`; they are not hardcoded.
- Initial Prisma migration exists.
- Session migration exists.
- Supabase connection was successfully reached from the local project.
- Both migrations were successfully applied to Supabase:
  - `20260920172000_initial`
  - `20260920173000_add_sessions`
- `npm run env:check` now loads the root `.env` file correctly.
- The encryption key passed validation.
- TypeScript and ESLint pass.

### Not yet complete

`npm run env:check` still reports:

- `PAYSTACK_SECRET_KEY` is missing. This is needed when Paystack payment flows are enabled.
- `RATE_LIMIT_PROVIDER` is not set to `platform`. This is required for a real multi-instance production deployment.

These are deployment configuration items, not database or migration failures. Do not use fake values.

### Stage 1 conclusion

**Development can proceed to Stage 2.** Before production deployment, configure the real Paystack secret in the hosting provider and configure a platform/distributed rate-limit provider.

## Stage 2 — Authentication and sessions

### Completed in the codebase

- Applicant registration.
- Public registrations use the `APPLICANT` role by default; the role migration must be applied before this is effective in a database.
- Password hashing with Node `scrypt`.
- Database-backed sessions.
- Secure HTTP-only session cookies.
- Session expiry and logout.
- Sign-in and registration rate limits.
- Session-backed role checks for protected CMS APIs.
- General CMS authorization excludes the `REVIEWER` role; reviewer access is reserved for scholarship review.
- Admin dashboard session integration.
- Applicant portal session requirement.
- Safe administrator bootstrap through environment-only seed variables.

### Remaining Stage 2 work

- Add password recovery.
- Add email verification.
- Add MFA for administrators.
- Connect all applicant application API routes to the authenticated user.
- Complete audit attribution across privileged administrative actions.
- Review and explicitly reassign any confirmed reviewer accounts after the migration demotes existing `REVIEWER` users to `APPLICANT`.
- Test registration, login, logout, inactive-user rejection, and role restrictions against Supabase.
- Configure a distributed rate-limit provider and verify it across deployments.

## Manual actions currently required

- Keep the Supabase staging project separate from the existing database.
- Apply and verify migrations on staging only after the corrected code is merged.
- Use an authorized GitHub account to merge the security changes into `staging`, so Vercel can create an unblocked Preview deployment.
- Do not create the first production administrator until explicitly approved.

Never commit `.env`, administrator passwords, database passwords, Paystack secrets, or encryption keys.

## Verification commands

Run from the project root:

```powershell
npm run db:generate
npm run typecheck
npm run lint
npm run build
npm run env:check
```

`npm run env:check` is expected to fail until the real Paystack secret and production rate-limit configuration are provided. That failure must not be bypassed with fake production values.
