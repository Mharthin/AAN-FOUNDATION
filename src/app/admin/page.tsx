"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardData = {
  metrics: Record<string, number>;
  upcomingEvents: Array<{ id: string; title: string; startsAt: string; _count: { registrations: number } }>;
};

const cards = [
  ["scholarshipApplications", "Scholarship applications"],
  ["pendingApplications", "Pending applications"],
  ["approvedApplications", "Approved applications"],
  ["volunteerApplications", "Volunteer applications"],
  ["mentorApplications", "Mentor applications"],
  ["eventRegistrations", "Event registrations"],
  ["donations", "Donation records"],
  ["publishedStories", "Published stories"],
  ["upcomingEvents", "Upcoming events"],
] as const;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [message, setMessage] = useState("Loading dashboard...");

  useEffect(() => {
    void fetch("/api/admin/dashboard").then(async (response) => {
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error || "Unable to load dashboard.");
        return;
      }
      setData(result);
      setMessage("");
    });
  }, []);

  async function signOut() {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/admin/sign-in/");
  }

  return (
    <main className="min-h-screen bg-[var(--ivory)]">
      <div className="section-shell py-12 lg:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">AAN operations</p>
            <h1 className="display-text mt-4 text-5xl text-[var(--forest-950)]">Dashboard</h1>
            <p className="mt-4 text-sm text-[var(--muted)]">A live overview of applications, participation, giving, and published work.</p>
          </div>
          <button onClick={signOut} className="self-start border border-[var(--line-strong)] px-5 py-3 text-sm font-bold text-[var(--forest-950)]">Sign out</button>
        </div>
        {message ? <p role="status" className="mt-5 text-sm text-[var(--muted)]">{message}</p> : null}
        {data ? (
          <>
            <nav aria-label="Admin navigation" className="mt-10 flex gap-2 overflow-x-auto border-y border-[var(--line)] py-3 text-sm font-semibold whitespace-nowrap">
              {[["Dashboard", "/admin"], ["Applications", "/admin/applications"], ["Events", "/admin/events"], ["Donations", "/admin/donations"], ["Stories", "/admin/stories"], ["Volunteers", "/admin/volunteers"], ["Mentors", "/admin/mentors"]].map(([label, href]) => <Link key={href} href={href} className="px-3 py-2 hover:bg-[var(--forest-100)]">{label}</Link>)}
            </nav>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map(([key, label]) => <article key={key} className="border border-[var(--line)] bg-[var(--paper)] p-5"><p className="text-sm text-[var(--muted)]">{label}</p><p className="display-text mt-3 text-4xl text-[var(--forest-950)]">{data.metrics[key] ?? 0}</p>{key === "donations" ? <p className="mt-2 text-xs text-[var(--muted)]">Successful amount: GHS {data.metrics.successfulDonationAmount ?? 0}</p> : null}</article>)}
            </section>
            <section className="mt-12">
              <div className="flex items-end justify-between"><div><p className="eyebrow">Next on the calendar</p><h2 className="display-text mt-3 text-3xl text-[var(--forest-950)]">Upcoming events</h2></div><Link href="/admin/events" className="text-sm font-bold text-[var(--forest-800)]">Manage events -&gt;</Link></div>
              {data.upcomingEvents.length ? <div className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">{data.upcomingEvents.map((event) => <div key={event.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><span className="font-semibold">{event.title}</span><span className="text-sm text-[var(--muted)]">{new Date(event.startsAt).toLocaleString()} · {event._count.registrations} registered</span></div>)}</div> : <p className="mt-5 text-sm text-[var(--muted)]">No upcoming events.</p>}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
