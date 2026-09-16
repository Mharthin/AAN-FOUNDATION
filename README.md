# AAN Legacy Foundation

The AAN Legacy Foundation platform is a Next.js, TypeScript, and PostgreSQL application for public storytelling, programs, applications, and foundation operations.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies with `npm install`.
3. Generate the Prisma client with `npm run db:generate`.
4. Create and apply a local migration with `npm run db:migrate -- --name init`.
5. Start development with `npm run dev`.

The local site is available at http://localhost:3000.

## GitHub Pages deployment

Pushes to `main` build the static Next.js export and deploy it through GitHub Pages Actions. In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**. The published site is available at https://mharthin.github.io/AAN-FOUNDATION/.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Database commands

- `npm run db:migrate` creates and applies development migrations.
- `npm run db:migrate:deploy` applies committed migrations in staging or production.
- `npm run db:studio` opens Prisma Studio.
- `npm run db:seed` inserts explicitly marked local placeholder content.

Do not commit `.env` files or real credentials. The initial schema intentionally contains only foundation content, users, events, and audit logging; application and payment models belong to later phases.
