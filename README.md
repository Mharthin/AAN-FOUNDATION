# AAN Legacy Foundation

The AAN Legacy Foundation platform is a Next.js, TypeScript, and PostgreSQL application for public storytelling, programs, applications, and foundation operations.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies with `npm install`.
3. Generate the Prisma client with `npm run db:generate`.
4. Create and apply a local migration with `npm run db:migrate -- --name init`.
5. Start development with `npm run dev`.

The local site is available at http://localhost:3000.

## Production deployment

The donation and CMS features require a Node.js runtime and PostgreSQL; the application is no longer a static export. Deploy the application to a server-capable Next.js host (such as Vercel, Render, or a managed Node.js service), configure the environment variables below, and set the Paystack webhook URL to `/api/paystack/webhook`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

See [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md) for the production release process and required manual verification.

## Database commands

- `npm run db:migrate` creates and applies development migrations.
- `npm run db:migrate:deploy` applies committed migrations in staging or production.
- `npm run db:studio` opens Prisma Studio.
- `npm run db:seed` inserts explicitly marked local placeholder content.

Do not commit `.env` files or real credentials. Scholarship, volunteer, and mentor workflows require Auth.js or an equivalent session provider, private S3-compatible object storage where documents are involved, malware scanning, and a configured `APPLICATION_ENCRYPTION_KEY` before public submissions are enabled. The GitHub Pages deployment intentionally keeps application controls disabled because it cannot securely run server-side auth, uploads, or database mutations.

### Donation and CMS environment

- `PAYSTACK_SECRET_KEY` is server-only and is used for initialization, verification, and webhook signature checks.
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is reserved for client-side Paystack integrations and must never contain the secret key.
- Administrative APIs use database-backed sessions and role permissions. Do not place session credentials in application code or manually constructed headers.
