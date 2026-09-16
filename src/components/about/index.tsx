import Image from "next/image";
import Link from "next/link";
import { Footer, Navbar, SectionHeader } from "@/components/site";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export function AboutShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[var(--ivory)]"><Navbar />{children}<Footer /></main>;
}

export function AboutHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="relative overflow-hidden bg-[var(--paper)]"><div className="absolute right-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full border-[2.5rem] border-[var(--gold-100)]" aria-hidden="true" /><div className="section-shell relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28"><div className="max-w-4xl"><p className="eyebrow">{eyebrow}</p><h1 className="display-text mt-5 text-5xl leading-[1.03] text-[var(--forest-950)] sm:text-6xl lg:text-7xl">{title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">{description}</p></div><div className="relative ml-auto w-full max-w-xs"><Image src={assetPath("/brand/AAN_logo1.png")} alt="AAN Legacy Foundation logo" width={1080} height={1080} className="h-auto w-full" priority /></div></div></section>;
}

export function EditorialSection({ eyebrow, title, children, tone = "ivory" }: { eyebrow: string; title: string; children: React.ReactNode; tone?: "ivory" | "paper" | "forest" }) {
  const tones = { ivory: "bg-[var(--ivory)]", paper: "bg-[var(--paper)]", forest: "bg-[var(--forest-950)]" };
  return <section className={`${tones[tone]} py-20 lg:py-28`}><div className="section-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]"><SectionHeader eyebrow={eyebrow} title={title} /><div className={tone === "forest" ? "text-white/75" : "text-[var(--muted)]"}>{children}</div></div></section>;
}

export function LetterStory() {
  const letters = [
    ["A", "Amoako", "A family whose positive role helped shape Moses' academic and personal journey."],
    ["A", "Anson", "A family remembered with gratitude and carried forward in a wider purpose."],
    ["N", "Nyarko", "A family connected to the story of opportunity that inspired AAN's mission."],
  ];
  return <div className="grid gap-4 sm:grid-cols-3">{letters.map(([letter, name, description], index) => <article key={name} className={`border-t-2 ${index === 1 ? "border-[var(--gold-500)] sm:mt-8" : index === 2 ? "border-[var(--forest-600)] sm:mt-16" : "border-[var(--forest-950)]"} bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] sm:p-8`}><span className="display-text text-7xl text-[var(--forest-800)]">{letter}</span><h3 className="mt-12 text-xl font-bold text-[var(--forest-950)]">{name}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p></article>)}</div>;
}

export function PhilosophyQuote({ children }: { children: React.ReactNode }) {
  return <blockquote className="border-l-2 border-[var(--gold-500)] pl-6"><p className="display-text text-3xl leading-tight text-[var(--forest-950)] sm:text-4xl">{children}</p></blockquote>;
}

export function CommitmentList() {
  return <div className="grid gap-4 sm:grid-cols-2"><article className="border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8"><p className="eyebrow">For young people</p><h3 className="display-text mt-5 text-3xl text-[var(--forest-950)]">Room to grow into possibility.</h3><p className="mt-4 text-sm leading-7 text-[var(--muted)]">AAN is committed to education, scholarships, empowerment, and mentorship that help young people reach their full potential.</p></article><article className="border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8"><p className="eyebrow">For vulnerable communities</p><h3 className="display-text mt-5 text-3xl text-[var(--forest-950)]">Support with dignity.</h3><p className="mt-4 text-sm leading-7 text-[var(--muted)]">AAN is committed to humanitarian support and community development that strengthen families and create lasting opportunity.</p></article></div>;
}

export function AboutLinkGrid() {
  const links = [["Our story", "/about/story", "The inspiration, gratitude, and purpose behind AAN."], ["Vision & mission", "/about/vision-mission", "The future AAN is working toward and how it will serve."], ["Values", "/about/values", "The philosophy themes that guide the foundation's work."]];
  return <div className="grid gap-3 md:grid-cols-3">{links.map(([title, href, description]) => <Link key={href} href={href} className="group border-t-2 border-[var(--forest-950)] bg-[var(--paper)] p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"><h3 className="text-lg font-bold text-[var(--forest-950)]">{title}<span className="float-right text-[var(--forest-600)] transition-transform group-hover:translate-x-1">-&gt;</span></h3><p className="mt-4 text-sm leading-6 text-[var(--muted)]">{description}</p></Link>)}</div>;
}
