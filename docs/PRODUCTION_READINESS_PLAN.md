# AAN Legacy Foundation production-readiness plan

This is the step-by-step plan we will follow before presenting the application to a real client.

The order is intentional: we will fix the things that can cause data loss, unauthorized access, or failed payments before polishing lower-risk items.

## Current status

- The application is a Next.js and TypeScript project using Prisma and PostgreSQL.
- Public content, events, donations, stories, admin APIs, SEO, and deployment documentation exist.
- The latest reviewed commit is `8e589a8`.
- The application is **not production-ready yet**.
- The current admin token is temporary.
- Applicant authentication and secure document uploads are not implemented.
- No production database or payment credentials are configured in this development workspace.
- A reproducible initial Prisma migration has now been generated in `prisma/migrations/`.

## What I will implement and what you will do manually

I will:

- Modify application code.
- Create database migrations.
- Add validation and automated tests where practical.
- Run type checks, linting, builds, and local smoke tests.
- Explain every manual setup step before you perform it.

You will eventually need to:

- Create accounts with the chosen hosting, database, email, storage, and payment providers.
- Copy secrets into provider dashboards, never into Git.
- Confirm organization information, email addresses, domain, policies, and approved content.
- Perform provider verification steps that require your identity or organization ownership.
- Test real staging flows using test data and test payment credentials.

## Stage 1 — Protect the data and establish a safe environment

**Why first:** We should not build on an unsafe or unrecoverable database.

I will:

- Review the Prisma schema for production correctness.
- Generate and commit Prisma migrations.
- Add safe development and production environment validation.
- Add database health checks and safer error handling.
- Document backup and restore expectations.
- Provide an `npm run env:check` command that validates production configuration without printing secret values.

You will manually:

- Choose a PostgreSQL provider.
- Create separate development, staging, and production databases.
- Enable automated backups and point-in-time recovery where available.
- Keep the database connection strings in the hosting provider's secret manager.

Exit condition:

- A clean environment can reproduce the database schema with `prisma migrate deploy`.
- `npm run env:check` passes in the production environment.

## Stage 2 — Implement real authentication and sessions

**Why second:** No public applications or real admin access should be enabled without reliable identity.

I will:

- Replace the shared CMS token with individual admin accounts.
- Add secure password hashing.
- Add sessions, logout, expiry, and revocation.
- Connect applicant registration and login to real sessions.
- Add role-based authorization tied to database users.
- Protect admin pages and APIs consistently.
- Add audit attribution to admin actions.

You will manually:

- Choose or approve the authentication provider.
- Create the first production administrator through a controlled setup process.
- Decide who should receive which administrative role.

Exit condition:

- An applicant can register, log in, log out, and access only their own application data.
- An administrator can log in and access only permitted modules.

## Stage 3 — Secure scholarship applications and document uploads

**Why third:** Applications contain sensitive personal information and documents.

I will:

- Connect scholarship forms to authenticated users.
- Enforce ownership and reviewer permissions at every route.
- Add private object storage integration.
- Add file type, size, checksum, and malware-scan checks.
- Add secure, expiring document access.
- Add safe error responses without exposing private data.

You will manually:

- Choose a private object-storage provider.
- Configure malware scanning credentials/service if required.
- Confirm retention and deletion policies for applicant documents.

Exit condition:

- A test applicant can submit an application and upload an approved test document.
- An invalid or malicious file is rejected.
- Another applicant cannot access the document.

## Stage 4 — Make payments and webhooks production-safe

**Why fourth:** Financial records must be trustworthy before accepting real donations.

I will:

- Add and apply webhook migrations.
- Test Paystack initialization, verification, failure, cancellation, and pending states.
- Verify amount, currency, reference, and provider status server-side.
- Add webhook replay and duplicate handling.
- Add payment audit records without storing card data.
- Add clear donor-facing confirmation states.

You will manually:

- Create or verify the Paystack account.
- Obtain test credentials first.
- Configure the staging webhook URL.
- Complete Paystack business verification before live payments.

Exit condition:

- Test payments reconcile correctly in the database.
- Replayed webhooks do not create duplicate success records.
- Secret keys never appear in browser code, logs, or responses.

## Stage 5 — Complete events, CMS, and administration

**Why fifth:** Operational users need dependable tools after identity and data protection exist.

I will:

- Fix event capacity concurrency.
- Finish event edit, cancel, registration, search, and export workflows.
- Add story draft, publish, edit, and delete permissions.
- Improve admin loading, empty, error, and confirmation states.
- Add pagination and bounded admin queries.
- Add audit logs for sensitive admin actions.

You will manually:

- Confirm which staff member receives each role.
- Approve the content categories and publication workflow.
- Provide approved event, story, program, and organization content.

Exit condition:

- Staff can perform normal operations without database or code access.

## Stage 6 — Email and user communications

**Why sixth:** Users need reliable confirmations and operational notifications.

I will:

- Add transactional email abstractions.
- Add confirmation emails for applications, event registration, and donations.
- Add safe retry and failure handling.
- Ensure emails do not expose unnecessary personal data.

You will manually:

- Choose an email provider.
- Verify the sending domain.
- Provide approved sender addresses and message content.

Exit condition:

- Test emails arrive reliably and failed deliveries are visible to administrators.

## Stage 7 — Production operations and monitoring

**Why seventh:** A production system needs visibility and recovery procedures.

I will:

- Add structured server logging with secret and PII redaction.
- Add health/readiness checks.
- Add distributed rate-limiting integration guidance or implementation.
- Review security headers and CORS.
- Document rollback and incident response.

You will manually:

- Choose an error-monitoring provider.
- Configure alerts.
- Configure backups and verify a restore.
- Assign someone responsible for incidents.

Exit condition:

- A failed request, failed payment, database outage, and webhook failure are detectable.

## Stage 8 — Staging deployment and critical-flow testing

**Why eighth:** We must test the complete system in an environment close to production.

I will:

- Prepare the deployment configuration.
- Run clean-install checks.
- Run typecheck, lint, build, and migration checks.
- Add browser tests for critical public and admin flows where practical.
- Fix defects found during staging verification.

You will manually:

- Create the staging deployment.
- Add staging secrets.
- Test provider dashboards and email delivery.
- Review the staging site at mobile and desktop widths.

Critical flows:

1. Public navigation
2. Applicant registration
3. Login and logout
4. Scholarship application
5. Secure document upload
6. Admin login
7. Role restrictions
8. Application review
9. Volunteer registration
10. Event registration and duplicate prevention
11. Donation initialization
12. Payment verification and webhook handling
13. Story publishing

Exit condition:

- Every flow has a recorded pass result in staging.

## Stage 9 — Production deployment and smoke test

**Why last:** Production should only receive a tested release.

I will:

- Provide the exact deployment commands and release sequence.
- Review the production build output.
- Check production routes and security headers.
- Help interpret deployment errors.

You will manually:

- Configure the production domain and HTTPS.
- Add production secrets.
- Apply production migrations.
- Configure live Paystack webhooks.
- Perform the final smoke test.

Exit condition:

- Production smoke tests pass.
- Monitoring, backups, authentication, payments, and rollback are confirmed.

## What we will do first

We will begin with **Stage 1: database migrations and environment safety**.

We will not accept real applications, real documents, or real donations until Stages 1–4 have passed their exit conditions.
