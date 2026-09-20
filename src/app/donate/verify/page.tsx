"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DonationVerificationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Checking your payment...");
  useEffect(() => { if (!reference) return; fetch(`/api/donations/verify?reference=${encodeURIComponent(reference)}`).then(async (response) => { const data = await response.json(); setStatus(response.ok && data.status === "SUCCESS" ? "Thank you. Your donation was received." : "We could not confirm this donation yet. Please keep your Paystack receipt and contact the foundation."); }).catch(() => setStatus("We could not confirm this donation yet. Please contact the foundation.")); }, [reference]);
  return <main className="section-shell flex min-h-screen items-center justify-center py-20"><div className="surface-card max-w-xl p-8 text-center"><p className="eyebrow">Donation status</p><h1 className="display-text mt-4 text-4xl text-[var(--forest-950)]">{reference ? status : "No transaction reference was provided."}</h1><Link href="/donate" className="mt-8 inline-block font-bold text-[var(--forest-800)]">Return to donations -&gt;</Link></div></main>;
}
