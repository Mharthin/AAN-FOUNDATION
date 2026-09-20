import type { Metadata } from "next";
import Link from "next/link";
import { AboutHero, AboutShell } from "@/components/about";
import { getPublishedEvents } from "@/features/events/queries";

export const metadata: Metadata = { title: "Events", description: "Join upcoming AAN Legacy Foundation events." };

export default async function EventsPage() {
  const events = await getPublishedEvents();
  return <AboutShell><AboutHero eyebrow="Gatherings & opportunities" title="There is strength in showing up together." description="Find upcoming events and register for the moments where AAN's work becomes shared community." /><section className="section-shell py-16 lg:py-24">{events.length ? <div className="grid gap-5 md:grid-cols-2">{events.map((event) => <article key={event.id} className="border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><span className="eyebrow">{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(event.startsAt)}</span><span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--success)]">{event.capacity ? `${event.capacity - event._count.registrations} spaces` : "Open registration"}</span></div><h2 className="display-text mt-8 text-3xl text-[var(--forest-950)]"><Link href={`/events/${event.slug}`}>{event.title}</Link></h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{event.summary}</p><p className="mt-5 text-sm text-[var(--muted)]">{event.location || "Location to be confirmed"}</p><Link href={`/events/${event.slug}`} className="mt-6 inline-block text-sm font-bold text-[var(--forest-800)]">View event -&gt;</Link></article>)}</div> : <p className="border-l-2 border-[var(--gold-500)] pl-5 text-[var(--muted)]">Upcoming events will appear here when confirmed by the foundation.</p>}</section></AboutShell>;
}
