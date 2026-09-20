"use client";

import { useState } from "react";

export function EventRegistrationForm({ eventId }: { eventId: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/events/${eventId}/registrations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    const data = await response.json();
    setMessage(response.ok ? "Registration confirmed. We look forward to seeing you." : data.error || "Registration could not be completed.");
    if (response.ok) event.currentTarget.reset();
    setLoading(false);
  }
  return <form onSubmit={submit} className="surface-card p-6 sm:p-8"><p className="eyebrow">Register for this event</p><div className="mt-6 space-y-4"><label className="block text-sm font-semibold">Full name<input name="fullName" className="form-control mt-2" required /></label><label className="block text-sm font-semibold">Email<input name="email" className="form-control mt-2" required type="email" /></label><label className="block text-sm font-semibold">Phone<input name="phone" className="form-control mt-2" /></label><label className="block text-sm font-semibold">Note<textarea name="notes" className="form-control mt-2" /></label></div><button disabled={loading} className="mt-6 w-full bg-[var(--forest-950)] px-5 py-4 text-sm font-bold text-white disabled:opacity-60">{loading ? "Submitting..." : "Confirm registration"}</button>{message ? <p role="status" className="mt-4 text-sm text-[var(--muted)]">{message}</p> : null}</form>;
}
