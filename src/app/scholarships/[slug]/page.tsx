import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutShell } from "@/components/about";
import { ScholarshipDetail } from "@/components/scholarships";
import { getPublishedScholarshipBySlug, getPublishedScholarships } from "@/features/scholarships/queries";

type ScholarshipPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const scholarships = await getPublishedScholarships();
  return scholarships.length > 0 ? scholarships.map((scholarship) => ({ slug: scholarship.slug })) : [{ slug: "__no-published-scholarships__" }];
}

export async function generateMetadata({ params }: ScholarshipPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await getPublishedScholarshipBySlug(slug);
  return scholarship ? { title: scholarship.name, description: scholarship.shortDescription } : { title: "Scholarship" };
}

export default async function ScholarshipPage({ params }: ScholarshipPageProps) {
  const { slug } = await params;
  if (slug === "__no-published-scholarships__") notFound();
  const scholarship = await getPublishedScholarshipBySlug(slug);
  if (!scholarship) notFound();
  return <AboutShell><ScholarshipDetail scholarship={scholarship} /></AboutShell>;
}
