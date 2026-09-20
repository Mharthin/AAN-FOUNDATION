import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutShell } from "@/components/about";
import { EventRegistrationForm } from "@/components/events";
import { getPublishedEventBySlug } from "@/features/events/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = await getPublishedEventBySlug((await params).slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = await getPublishedEventBySlug((await params).slug);
  if (!event) notFound();
  const closed = Boolean(event.registrationDeadline && event.registrationDeadline < new Date()) || event.status !== "PUBLISHED" || (event.capacity !== null && event._count.registrations >= event.capacity);
  return <AboutShell><article className="section-shell py-16 lg:py-24"><p className="eyebrow">{new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "short" }).format(event.startsAt)}</p><h1 className="display-text mt-5 max-w-4xl text-5xl leading-tight text-[var(--forest-950)] sm:text-6xl">{event.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">{event.summary}</p><div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.8fr]"><div><div className="whitespace-pre-line text-base leading-8 text-[var(--muted)]">{event.description}</div><dl className="mt-10 grid gap-5 border-y border-[var(--line)] py-6 text-sm sm:grid-cols-3"><div><dt className="eyebrow">Location</dt><dd className="mt-2 font-semibold">{event.location || "To be confirmed"}</dd></div><div><dt className="eyebrow">Capacity</dt><dd className="mt-2 font-semibold">{event.capacity ? `${event._count.registrations} / ${event.capacity} registered` : "Open"}</dd></div><div><dt className="eyebrow">Deadline</dt><dd className="mt-2 font-semibold">{event.registrationDeadline ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(event.registrationDeadline) : "Until full"}</dd></div></dl></div><div>{closed ? <div className="border border-[var(--line)] bg-[var(--paper)] p-7"><p className="eyebrow">Registration closed</p><p className="mt-4 text-sm leading-7 text-[var(--muted)]">Registration is no longer available for this event.</p></div> : <EventRegistrationForm eventId={event.id} />}</div></div></article></AboutShell>;
}
