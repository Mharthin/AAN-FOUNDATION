"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--ivory)] px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--forest-600)]">Something went wrong</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--forest-950)]">We could not load this page.</h1>
        <button
          type="button"
          onClick={reset}
          className="mt-8 bg-[var(--forest-950)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--forest-800)]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
