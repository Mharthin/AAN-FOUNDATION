"use client";

import { useState } from "react";
import { donationPurposes } from "@/lib/validation/donation";

const amounts = [50, 100, 250, 500];

export function DonationForm() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [purpose, setPurpose] = useState<(typeof donationPurposes)[number]>("General Fund");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedAmount = custom ? Number(custom) : amount;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/donations/initialize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: selectedAmount, purpose, donorName: form.get("donorName"), email: form.get("email"), phone: form.get("phone"), message: form.get("message") }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to start donation.");
      window.location.assign(data.authorizationUrl);
    } catch (submitError) { setError(submitError instanceof Error ? submitError.message : "Unable to start donation."); setLoading(false); }
  }

  return <section className="section-shell grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24"><div><p className="eyebrow">Give with purpose</p><h2 className="display-text mt-4 text-4xl text-[var(--forest-950)]">Your support becomes practical opportunity.</h2><p className="mt-5 text-sm leading-7 text-[var(--muted)]">Donations are recorded securely with a transaction reference and payment status so the foundation can reconcile every gift.</p></div><form onSubmit={submit} className="surface-card p-6 sm:p-9"><fieldset><legend className="text-sm font-bold text-[var(--forest-950)]">Where should your gift go?</legend><div className="mt-4 grid gap-2 sm:grid-cols-2">{donationPurposes.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 border border-[var(--line)] p-3 text-sm"><input type="radio" name="purpose" value={item} checked={purpose === item} onChange={() => setPurpose(item)} />{item}</label>)}</div></fieldset><div className="mt-8"><p className="text-sm font-bold text-[var(--forest-950)]">Amount (GHS)</p><div className="mt-3 flex flex-wrap gap-2">{amounts.map((value) => <button type="button" key={value} onClick={() => { setAmount(value); setCustom(""); }} className={`border px-4 py-2 text-sm font-semibold ${!custom && amount === value ? "border-[var(--forest-800)] bg-[var(--forest-100)]" : "border-[var(--line)]"}`}>GHS {value}</button>)}<input className="form-control max-w-36" type="number" min="1" name="customAmount" placeholder="Custom" value={custom} onChange={(event) => setCustom(event.target.value)} /></div></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Name <input className="form-control mt-2" name="donorName" placeholder="Optional" /></label><label className="text-sm font-semibold">Email * <input className="form-control mt-2" required type="email" name="email" /></label><label className="text-sm font-semibold">Phone <input className="form-control mt-2" name="phone" placeholder="Optional" /></label><label className="text-sm font-semibold sm:col-span-2">Message <textarea className="form-control mt-2" name="message" placeholder="Optional note" /></label></div>{error ? <p role="alert" className="mt-4 text-sm text-[var(--danger)]">{error}</p> : null}<button disabled={loading} className="mt-6 w-full bg-[var(--forest-950)] px-5 py-4 text-sm font-bold text-white disabled:opacity-60">{loading ? "Connecting to Paystack..." : `Continue with GHS ${selectedAmount || 0}`}</button></form></section>;
}
