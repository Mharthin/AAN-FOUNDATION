import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--ivory)] px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--forest-600)]">404</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--forest-950)]">That page is not here.</h1>
        <Link href="/" className="mt-8 inline-flex bg-[var(--forest-950)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--forest-800)]">
          Return home
        </Link>
      </div>
    </main>
  );
}
