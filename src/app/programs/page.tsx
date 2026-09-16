import type { Metadata } from "next";
import { AboutShell, AboutHero } from "@/components/about";
import { ProgramCard } from "@/components/programs";
import { EmptyState } from "@/components/ui/patterns";
import { getPublishedPrograms } from "@/features/programs/queries";

export const metadata: Metadata = { title: "Programs", description: "Explore AAN Legacy Foundation programs and opportunities." };

export default async function ProgramsPage() {
  const programs = await getPublishedPrograms();
  return <AboutShell><AboutHero eyebrow="Our programs" title="Opportunity takes many forms." description="Explore the programs through which AAN Legacy Foundation will support education, young people, vulnerable communities, and lasting development." /><section className="section-shell py-20 lg:py-28"><div className="mb-12"><p className="eyebrow">Published programs</p><h2 className="display-text mt-4 max-w-2xl text-4xl leading-tight text-[var(--forest-950)] sm:text-5xl">Find the work that speaks to you.</h2></div>{programs.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{programs.map((program) => <ProgramCard key={program.id} program={program} />)}</div> : <EmptyState title="Programs are being prepared" description="Published program information will appear here once it has been confirmed by the foundation." />}</section></AboutShell>;
}
