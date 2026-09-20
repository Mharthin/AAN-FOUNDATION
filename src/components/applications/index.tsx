"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AboutShell } from "@/components/about";
import { ApplicationPortalNotice } from "@/components/scholarships";
import { Button } from "@/components/ui/button";

export function SignInShell({ createAccount = false }: { createAccount?: boolean }) {
  const title = createAccount ? "Create your applicant account." : "Sign in to your applicant account.";
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);
    const response = await fetch(createAccount ? "/api/auth/register" : "/api/auth/sign-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Authentication failed."); setLoading(false); return; }
    router.push("/applications/");
  }
  return <AboutShell><section className="section-shell grid min-h-[70vh] items-center gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Applicant portal</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">{title}</h1><p className="mt-6 text-base leading-7 text-[var(--muted)]">Your application information and private documents will be protected behind your account.</p></div><form onSubmit={submit} className="space-y-5 border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8">{createAccount ? <label className="block text-sm font-bold text-[var(--forest-950)]">Full name<input name="name" required minLength={2} className="form-control mt-2" /></label> : null}<label className="block text-sm font-bold text-[var(--forest-950)]">Email address<input name="email" required type="email" className="form-control mt-2" /></label><label className="block text-sm font-bold text-[var(--forest-950)]">Password<input name="password" required minLength={12} type="password" className="form-control mt-2" /></label>{error ? <p role="alert" className="text-sm text-[var(--danger)]">{error}</p> : null}<Button type="submit" disabled={loading}>{loading ? "Please wait..." : createAccount ? "Create account" : "Sign in"}</Button><p className="text-sm text-[var(--muted)]">{createAccount ? "Already have an account? " : "Need an account? "}<Link href={createAccount ? "/sign-in/" : "/create-account/"} className="font-bold text-[var(--forest-800)]">{createAccount ? "Sign in" : "Create one"}</Link></p></form></section></AboutShell>;
}

export function ApplicationStatusShell({ reference }: { reference?: string }) {
  return <AboutShell><section className="section-shell py-20 lg:py-28"><p className="eyebrow">Application portal</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">Track your application.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">Sign in to view your private application reference, documents, status history, and messages.</p><div className="mt-10 max-w-2xl"><ApplicationPortalNotice title="Applicant authentication is required" />{reference ? <p className="mt-6 text-sm text-[var(--muted)]">Requested reference: <span className="font-bold text-[var(--forest-950)]">{reference}</span></p> : null}</div></section></AboutShell>;
}

export function AdminApplicationsShell({ reference }: { reference?: string }) {
  return <AboutShell><section className="section-shell py-16 lg:py-24"><p className="eyebrow">Admin workspace</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">Scholarship applications.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">Review applicant information, documents, notes, and audit-friendly status history from a protected admin workspace.</p><div className="mt-10"><ApplicationPortalNotice title="Admin authentication and private storage are not configured" /></div><div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]"><input aria-label="Search applications" placeholder="Search by reference number" className="form-control" disabled /><select aria-label="Filter by status" className="form-control md:w-56" disabled><option>All statuses</option></select></div><div className="mt-6 border border-dashed border-[var(--line-strong)] bg-[var(--paper)] p-10 text-center text-sm text-[var(--muted)]">{reference ? `Application ${reference} will appear here after admin authentication is enabled.` : "Application records will appear here after admin authentication is enabled."}</div></section></AboutShell>;
}
