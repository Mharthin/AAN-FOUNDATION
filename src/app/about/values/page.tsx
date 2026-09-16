import type { Metadata } from "next";
import { AboutHero, AboutLinkGrid, AboutShell, EditorialSection, PhilosophyQuote } from "@/components/about";

export const metadata: Metadata = { title: "Values", description: "The philosophy themes that guide AAN Legacy Foundation." };

const themes = [
  ["People", "Every lasting legacy begins with attention to a person, a family, or a community."],
  ["Gratitude", "AAN turns the good received by one person into opportunity that can be shared with others."],
  ["Purpose", "Support becomes meaningful when it is connected to a clear commitment to serve and strengthen."],
  ["Impact", "The work looks toward lives changed, families strengthened, and generations shaped."],
];

export default function ValuesPage() {
  return <AboutShell><AboutHero eyebrow="Values & philosophy" title="The way we carry the work matters." description="AAN&apos;s core philosophy is rooted in people, gratitude, purpose, and a commitment to impact lives." /><EditorialSection eyebrow="Core philosophy" title="AAN is not only a name." tone="paper"><div className="space-y-8"><PhilosophyQuote>It represents people, gratitude, purpose, and a commitment to impact lives.</PhilosophyQuote><p className="text-base leading-8">The themes below are drawn directly from the foundation&apos;s stated philosophy. Formal value statements and operating principles can be expanded here when they are confirmed by the foundation.</p></div></EditorialSection><section className="section-shell py-20 lg:py-28"><div className="grid gap-4 sm:grid-cols-2">{themes.map(([title, description], index) => <article key={title} className="border-t-2 border-[var(--forest-950)] bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] sm:p-8"><span className="font-display text-4xl text-[var(--gold-500)]">0{index + 1}</span><h2 className="display-text mt-12 text-3xl text-[var(--forest-950)]">{title}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{description}</p></article>)}</div></section><section className="bg-[var(--forest-950)] py-20 lg:py-28"><div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow text-[var(--gold-300)]">A promise in practice</p><h2 className="display-text mt-4 text-4xl leading-tight text-white sm:text-5xl">Values become real through the way people are treated.</h2></div><p className="max-w-xl text-base leading-8 text-white/65">That means holding space for dignity, listening to communities, supporting young people, and being honest about what has been achieved and what is still to come.</p></div></section><section className="section-shell py-20 lg:py-28"><div className="mb-12"><p className="eyebrow">Continue exploring</p><h2 className="display-text mt-4 text-4xl text-[var(--forest-950)] sm:text-5xl">Values in motion.</h2></div><AboutLinkGrid /></section></AboutShell>;
}
