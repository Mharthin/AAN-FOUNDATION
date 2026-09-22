# AAN Legacy Foundation production-readiness status

This is the quick status page for the production-readiness work. The detailed roadmap remains in [PRODUCTION_READINESS_PLAN.md](./PRODUCTION_READINESS_PLAN.md), and deployment tasks remain in [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

Last checked: 2026-09-22

## Decision

**Yes, we can proceed to Stage 2 work.**

Stage 1 database setup is complete enough to continue development. The application is not production-ready yet because production provider configuration and staging verification are still outstanding.

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
- Password hashing with Node `scrypt`.
- Database-backed sessions.
- Secure HTTP-only session cookies.
- Session expiry and logout.
- Sign-in and registration rate limits.
- Session-backed role checks for protected CMS APIs.
- Admin dashboard session integration.
- Applicant portal session requirement.
- Safe administrator bootstrap through environment-only seed variables.

### Remaining Stage 2 work

- Add password recovery.
- Add email verification.
- Add MFA for administrators.
- Connect all applicant application API routes to the authenticated user.
- Add audit attribution consistently to administrative actions.
- Create and verify the first administrator in the Supabase database.
- Test registration, login, logout, inactive-user rejection, and role restrictions against Supabase.

## Manual actions currently required

You do not need to create another database or rerun migrations.

When ready to test authentication against Supabase:

1. Set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` only in the terminal environment.
2. Run `npm run db:seed`.
3. Open the application and test admin sign-in.
4. Remove those temporary terminal variables after seeding.

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
