import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutShell } from "@/components/about";
import { getPublishedStories, getPublishedStoryBySlug } from "@/features/stories/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const story = await getPublishedStoryBySlug((await params).slug);
  return story ? { title: story.seoTitle || story.title, description: story.seoDescription || story.excerpt } : {};
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const story = await getPublishedStoryBySlug((await params).slug);
  if (!story) notFound();
  const related = (await getPublishedStories({ category: story.category, pageSize: 3 })).stories.filter((item) => item.slug !== story.slug).slice(0, 2);
  return <AboutShell><article className="section-shell max-w-4xl py-16 lg:py-24"><header className="border-b border-[var(--line)] pb-10"><p className="eyebrow">{story.category}</p><h1 className="display-text mt-5 text-5xl leading-tight text-[var(--forest-950)] sm:text-6xl">{story.title}</h1><p className="mt-6 text-lg leading-8 text-[var(--muted)]">{story.excerpt}</p><p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{story.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(story.publishedAt) : ""}{story.author?.name ? ` · ${story.author.name}` : ""}</p></header><div className="prose mt-12 max-w-none whitespace-pre-line text-base leading-8 text-[var(--muted)]">{story.body}</div></article>{related.length ? <section className="section-shell border-t border-[var(--line)] py-16"><p className="eyebrow">Continue reading</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{related.map((item) => <a key={item.id} href={`/stories/${item.slug}`} className="border border-[var(--line)] bg-[var(--paper)] p-6"><h2 className="display-text text-2xl text-[var(--forest-950)]">{item.title}</h2><p className="mt-3 text-sm text-[var(--muted)]">{item.excerpt}</p></a>)}</div></section> : null}</AboutShell>;
}
