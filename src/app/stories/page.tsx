import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { AboutShell, AboutHero } from "@/components/about";
import { getPublishedStories } from "@/features/stories/queries";

export const metadata: Metadata = pageMetadata("Stories", "Stories, news, announcements, and program updates from AAN Legacy Foundation.", "/stories");

export default async function StoriesPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; page?: string }> }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1) || 1);
  const { stories, total, categories } = await getPublishedStories({ query: params.q, category: params.category, page });
  const pages = Math.ceil(total / 6);
  return <AboutShell><AboutHero eyebrow="Stories & updates" title="The work is carried by people." description="Read approved stories, announcements, and program updates from the foundation." /><section className="section-shell py-16 lg:py-24"><form className="grid gap-3 border-y border-[var(--line)] py-5 sm:grid-cols-[1fr_16rem_auto]"><input className="form-control" name="q" defaultValue={params.q} placeholder="Search stories" aria-label="Search stories" /><select className="form-control" name="category" defaultValue={params.category}><option value="">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select><button className="bg-[var(--forest-950)] px-6 py-3 text-sm font-bold text-white">Search</button></form>{stories.length ? <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{stories.map((story) => <article key={story.id} className="border border-[var(--line)] bg-[var(--paper)] p-6"><p className="eyebrow">{story.category}</p><h2 className="display-text mt-4 text-3xl text-[var(--forest-950)]"><Link href={`/stories/${story.slug}`}>{story.title}</Link></h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{story.excerpt}</p><Link className="mt-6 inline-block text-sm font-bold text-[var(--forest-800)]" href={`/stories/${story.slug}`}>Read story -&gt;</Link></article>)}</div> : <p className="mt-12 border-l-2 border-[var(--gold-500)] pl-5 text-[var(--muted)]">Published stories will appear here when approved by the foundation.</p>}{pages > 1 ? <nav aria-label="Story pages" className="mt-12 flex gap-3">{Array.from({ length: pages }, (_, index) => <Link key={index} href={`/stories?page=${index + 1}${params.category ? `&category=${encodeURIComponent(params.category)}` : ""}`} className="border border-[var(--line)] px-4 py-2 text-sm">{index + 1}</Link>)}</nav> : null}</section></AboutShell>;
}
