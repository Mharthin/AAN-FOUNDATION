import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutShell } from "@/components/about";
import { ProgramDetail } from "@/components/programs";
import { getPublishedProgramBySlug, getPublishedPrograms } from "@/features/programs/queries";

type ProgramPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programs = await getPublishedPrograms();
  return programs.length > 0 ? programs.map((program) => ({ slug: program.slug })) : [{ slug: "__no-published-programs__" }];
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "__no-published-programs__") notFound();
  const program = await getPublishedProgramBySlug(slug);
  if (!program) return { title: "Program" };
  return { title: program.name, description: program.summary };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await getPublishedProgramBySlug(slug);
  if (!program) notFound();
  return <AboutShell><ProgramDetail program={program} /></AboutShell>;
}
