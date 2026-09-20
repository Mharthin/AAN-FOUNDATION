"use client";

import { useState } from "react";

export default function AdminStoriesPage() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("Enter the CMS token to manage editorial content.");
  const [story, setStory] = useState({ title: "", slug: "", excerpt: "", body: "", category: "News", status: "DRAFT" });
  async function save(event: React.FormEvent) {
    event.preventDefault(); setMessage("Saving...");
    const response = await fetch("/api/admin/stories", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(story) });
    setMessage(response.ok ? "Story saved." : (await response.json()).error || "Unable to save story.");
  }
  return <main className="section-shell min-h-screen py-16"><p className="eyebrow">Admin · CMS</p><h1 className="display-text mt-4 text-5xl text-[var(--forest-950)]">Publish a story</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">Create approved stories, announcements, news, and program updates without changing application code.</p><form onSubmit={save} className="surface-card mt-10 max-w-3xl space-y-5 p-6 sm:p-8"><label className="block text-sm font-semibold">CMS token<input className="form-control mt-2" type="password" value={token} onChange={(event) => setToken(event.target.value)} required /></label><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Title<input className="form-control mt-2" value={story.title} onChange={(event) => setStory({ ...story, title: event.target.value })} required /></label><label className="text-sm font-semibold">Slug<input className="form-control mt-2" value={story.slug} onChange={(event) => setStory({ ...story, slug: event.target.value })} required /></label><label className="text-sm font-semibold">Category<input className="form-control mt-2" value={story.category} onChange={(event) => setStory({ ...story, category: event.target.value })} required /></label><label className="text-sm font-semibold">Status<select className="form-control mt-2" value={story.status} onChange={(event) => setStory({ ...story, status: event.target.value })}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label></div><label className="block text-sm font-semibold">Summary<textarea className="form-control mt-2" value={story.excerpt} onChange={(event) => setStory({ ...story, excerpt: event.target.value })} required /></label><label className="block text-sm font-semibold">Content<textarea className="form-control mt-2 min-h-64" value={story.body} onChange={(event) => setStory({ ...story, body: event.target.value })} required /></label><button className="bg-[var(--forest-950)] px-6 py-3 text-sm font-bold text-white">Save story</button><p role="status" className="text-sm text-[var(--muted)]">{message}</p></form></main>;
}
