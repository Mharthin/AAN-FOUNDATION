"use client";

export default function ProgramError({ reset }: { reset: () => void }) {
  return <main className="flex min-h-screen items-center justify-center bg-[var(--ivory)] px-6"><div className="max-w-md text-center"><p className="eyebrow">Program unavailable</p><h1 className="display-text mt-4 text-4xl text-[var(--forest-950)]">We could not load this program.</h1><button type="button" onClick={reset} className="mt-8 bg-[var(--forest-950)] px-5 py-3 text-sm font-bold text-white">Try again</button></div></main>;
}
