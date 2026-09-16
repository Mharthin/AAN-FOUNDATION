import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedScholarshipBySlug, getPublishedScholarships } from "@/features/scholarships/queries";
import { ScholarshipApplicationShell } from "@/components/scholarships";

type ApplyPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const scholarships = await getPublishedScholarships();
  return scholarships.length > 0 ? scholarships.map((scholarship) => ({ slug: scholarship.slug })) : [{ slug: "__no-published-scholarships__" }];
}

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await getPublishedScholarshipBySlug(slug);
  return scholarship ? { title: `Apply: ${scholarship.name}`, description: `Application information for ${scholarship.name}.` } : { title: "Apply" };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  if (slug === "__no-published-scholarships__") notFound();
  const scholarship = await getPublishedScholarshipBySlug(slug);
  if (!scholarship) notFound();
  return <ScholarshipApplicationShell scholarshipName={scholarship.name} />;
}
