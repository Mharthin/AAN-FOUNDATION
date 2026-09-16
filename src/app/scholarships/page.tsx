import type { Metadata } from "next";
import { AboutHero, AboutShell } from "@/components/about";
import { ScholarshipCard, ScholarshipEmptyState } from "@/components/scholarships";
import { getPublishedScholarships } from "@/features/scholarships/queries";

export const metadata: Metadata = { title: "Scholarships", description: "Explore scholarship opportunities from AAN Legacy Foundation." };

export default async function ScholarshipsPage() {
  const scholarships = await getPublishedScholarships();
  return <AboutShell><AboutHero eyebrow="Scholarships" title="An opportunity can change a future." description="Explore scholarship opportunities from AAN Legacy Foundation. Eligibility and application details are published only after they have been confirmed." /><section className="section-shell py-20 lg:py-28">{scholarships.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{scholarships.map((scholarship) => <ScholarshipCard key={scholarship.id} scholarship={scholarship} />)}</div> : <ScholarshipEmptyState />}</section></AboutShell>;
}
