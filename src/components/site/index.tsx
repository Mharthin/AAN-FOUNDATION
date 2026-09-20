"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type LinkItem = { label: string; href: string };

const navItems: LinkItem[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Stories", href: "/stories" },
  { label: "Impact", href: "/#impact" },
  { label: "Get involved", href: "/#involved" },
];

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" aria-label="AAN Legacy Foundation home" className="group inline-flex items-center gap-3">
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold-500)] text-sm font-extrabold transition-transform group-hover:rotate-6", inverse ? "text-white" : "text-[var(--forest-950)]")}>
        AAN
      </span>
      <span className="leading-none">
        <span className={cn("block font-display text-xl font-semibold", inverse ? "text-white" : "text-[var(--forest-950)]")}>AAN Legacy</span>
        <span className={cn("mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.24em]", inverse ? "text-white/55" : "text-[var(--muted)]")}>Foundation</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:rgba(255,254,250,0.94)] backdrop-blur-md">
      <div className="section-shell flex h-[4.75rem] items-center justify-between">
        <BrandMark />
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--forest-950)]">
              {item.label}
            </Link>
          ))}
          <Link href="/donate"><Button variant="gold" size="sm" type="button">Support our work</Button></Link>
        </nav>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-[var(--line-strong)] lg:hidden"
        >
          <span className={cn("h-px w-5 bg-[var(--forest-950)] transition-transform", isOpen && "translate-y-2 rotate-45")} />
          <span className={cn("h-px w-5 bg-[var(--forest-950)] transition-opacity", isOpen && "opacity-0")} />
          <span className={cn("h-px w-5 bg-[var(--forest-950)] transition-transform", isOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>
      {isOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[var(--line)] bg-[var(--paper)] px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="border-b border-[var(--line)] py-4 text-sm font-semibold text-[var(--forest-950)]">
                {item.label}
              </Link>
            ))}
            <Link href="/donate"><Button variant="gold" size="md" className="mt-4 w-full">Support our work</Button></Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className="bg-[var(--forest-950)] text-white">
      <div className="section-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:py-20">
        <div>
          <BrandMark inverse />
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Building legacies. Impacting lives. Transforming the world.</p>
        </div>
        <div>
          <p className="eyebrow text-[var(--gold-300)]">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[var(--gold-300)]">Contact</p>
          <p className="mt-5 text-sm leading-7 text-white/70">Contact details will be added when confirmed by the foundation.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 AAN Legacy Foundation</span>
          <span>Content and impact figures are subject to confirmation.</span>
        </div>
      </div>
    </footer>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-[var(--paper)]">
      <div className="absolute right-[-12rem] top-[-11rem] h-[30rem] w-[30rem] rounded-full border-[3rem] border-[var(--gold-100)]" aria-hidden="true" />
      <div className="section-shell relative grid min-h-[42rem] items-center gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
        <div className="max-w-2xl animate-[aan-rise_700ms_ease-out_both]">
          <p className="eyebrow">Building legacies. Impacting lives.</p>
          <h1 className="display-text mt-6 text-5xl leading-[1.02] text-[var(--forest-950)] sm:text-6xl lg:text-[5.1rem]">Building Legacies. Impacting Lives. Transforming the World.</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--muted)]">AAN Legacy Foundation creates opportunities through education, scholarships, youth empowerment, humanitarian support, and community development.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="primary" size="lg">Discover AAN</Button>
            <Button variant="secondary" size="lg">Get involved</Button>
          </div>
        </div>
        <div className="relative min-h-[25rem] overflow-hidden bg-[var(--forest-950)] p-8 animate-[aan-rise_800ms_120ms_ease-out_both] sm:min-h-[32rem] lg:min-h-[36rem] lg:p-12">
          <div className="absolute right-[-4rem] top-[-4rem] h-64 w-64 rounded-full border-[1.4rem] border-[var(--gold-500)]" aria-hidden="true" />
          <div className="absolute bottom-[-8rem] left-[-5rem] h-72 w-72 rounded-full border-[2rem] border-[var(--forest-600)]" aria-hidden="true" />
          <div className="absolute right-5 top-5 w-48 sm:right-8 sm:top-8 sm:w-60">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/AAN_logo1.png`} alt="AAN Legacy Foundation logo" width={1080} height={1080} className="h-auto w-full" priority />
          </div>
          <div className="relative flex h-full min-h-[19rem] flex-col justify-end border-l border-[var(--gold-500)] pl-6 sm:min-h-[26rem]">
            <p className="eyebrow text-[var(--gold-300)]">The AAN philosophy</p>
            <p className="display-text mt-4 max-w-md text-3xl leading-tight text-white sm:text-4xl">Gratitude becomes purpose when it is shared.</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">AAN represents people, gratitude, purpose, and a commitment to impact lives.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-text mt-4 text-4xl leading-tight text-[var(--forest-950)] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}

export function ProgramCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article className="group border-t-2 border-[var(--forest-950)] bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-3xl text-[var(--gold-500)]">{number}</span>
        <span className="text-xl text-[var(--forest-600)] transition-transform group-hover:translate-x-1">↗</span>
      </div>
      <h3 className="mt-12 text-xl font-bold text-[var(--forest-950)]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{description}</p>
    </article>
  );
}

export function StoryCard({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <article className="grid gap-6 border-t border-[var(--line-strong)] py-6 sm:grid-cols-[0.35fr_1fr] sm:gap-10">
      <p className="eyebrow pt-1">{label}</p>
      <div>
        <h3 className="display-text text-2xl leading-tight text-[var(--forest-950)]">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>
        <span className="mt-5 inline-block text-sm font-bold text-[var(--forest-800)]">Content to be confirmed <span aria-hidden="true">↗</span></span>
      </div>
    </article>
  );
}

export function EventCard() {
  return (
    <article className="border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <span className="rounded-full bg-[var(--gold-100)] px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[var(--warning)]">Upcoming</span>
        <span className="text-sm font-semibold text-[var(--muted)]">Date to be confirmed</span>
      </div>
      <h3 className="display-text mt-12 text-3xl text-[var(--forest-950)]">AAN community gathering</h3>
      <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">Event details will be published here once the foundation confirms the date, location, and registration information.</p>
      <Button variant="quiet" size="sm" className="mt-6 px-0">View event details <span className="ml-2" aria-hidden="true">→</span></Button>
    </article>
  );
}

export function ImpactCard({ label, value = "To be measured" }: { label: string; value?: string }) {
  return (
    <article className="border-l-2 border-[var(--gold-500)] pl-5">
      <p className="display-text text-3xl text-white">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">{label}</p>
    </article>
  );
}

export function InvolvementCard({ number, title, description }: { number: string; title: string; description: string }) {
  return <a href="#contact" className="group block border border-[var(--line-strong)] bg-[var(--paper)] p-5 transition-colors hover:border-[var(--forest-600)] hover:bg-[var(--forest-100)]"><span className="font-display text-2xl text-[var(--gold-500)]">{number}</span><h3 className="mt-8 text-lg font-bold text-[var(--forest-950)]">{title}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p><span className="mt-5 block text-sm font-bold text-[var(--forest-800)] transition-transform group-hover:translate-x-1">Learn more -&gt;</span></a>;
}

export function CTASection() {
  return (
    <section id="involved" className="bg-[var(--gold-500)]">
      <div className="section-shell flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--forest-950)]">Join the work</p>
          <h2 className="display-text mt-4 text-4xl leading-tight text-[var(--forest-950)] sm:text-5xl">Your impact can become someone else&apos;s opportunity.</h2>
        </div>
        <Button variant="primary" size="lg">Get involved</Button>
      </div>
    </section>
  );
}
