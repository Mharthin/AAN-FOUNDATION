"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/sign-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    if (!response.ok) { setError("Invalid email or password."); setLoading(false); return; }
    router.push("/admin/");
  }
  return <main className="section-shell flex min-h-screen items-center justify-center py-20"><form onSubmit={submit} className="surface-card w-full max-w-md space-y-5 p-8"><p className="eyebrow">Admin portal</p><h1 className="display-text text-4xl text-[var(--forest-950)]">Sign in</h1><label className="block text-sm font-bold">Email<input name="email" type="email" required className="form-control mt-2" /></label><label className="block text-sm font-bold">Password<input name="password" type="password" required className="form-control mt-2" /></label>{error ? <p role="alert" className="text-sm text-[var(--danger)]">{error}</p> : null}<button disabled={loading} className="w-full bg-[var(--forest-950)] px-5 py-3 text-sm font-bold text-white">{loading ? "Signing in..." : "Sign in"}</button></form></main>;
}
