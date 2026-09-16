import Link from "next/link";
import { AboutShell } from "@/components/about";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/patterns";
import type { PublicScholarship } from "@/features/scholarships/queries";

export function ScholarshipCard({ scholarship }: { scholarship: PublicScholarship }) {
  return <article className="border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] sm:p-8"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[var(--gold-100)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--warning)]">Scholarship</span>{scholarship.featured ? <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-500)]">Featured</span> : null}</div><h2 className="display-text mt-8 text-3xl text-[var(--forest-950)]">{scholarship.name}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{scholarship.shortDescription}</p><Link href={`/scholarships/${scholarship.slug}/`} className="mt-6 inline-block text-sm font-bold text-[var(--forest-800)]">View scholarship -&gt;</Link></article>;
}

export function ScholarshipDetail({ scholarship }: { scholarship: PublicScholarship }) {
  return <><section className="bg-[var(--paper)] py-16 lg:py-24"><div className="section-shell max-w-5xl"><p className="eyebrow">Scholarship opportunity</p><h1 className="display-text mt-5 text-5xl leading-tight text-[var(--forest-950)] sm:text-6xl">{scholarship.name}</h1><p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">{scholarship.shortDescription}</p><Link href={`/scholarships/${scholarship.slug}/apply/`} className="mt-8 inline-flex bg-[var(--forest-950)] px-6 py-4 text-sm font-bold text-white">Start application</Link></div></section><section className="section-shell grid gap-12 py-16 lg:grid-cols-[1fr_0.7fr] lg:py-24"><div><p className="eyebrow">About this opportunity</p><div className="mt-5 whitespace-pre-line text-base leading-8 text-[var(--muted)]">{scholarship.description}</div></div><aside className="space-y-8"><Info title="Eligibility" value={scholarship.eligibility} /><Info title="Application information" value={scholarship.applicationInfo} /></aside></section></>;
}

function Info({ title, value }: { title: string; value: string }) {
  return <div className="border-l-2 border-[var(--gold-500)] pl-5"><p className="eyebrow">{title}</p><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--muted)]">{value}</p></div>;
}

export function ScholarshipEmptyState() {
  return <EmptyState title="Scholarship opportunities are being prepared" description="Published scholarship information will appear here once opportunities and eligibility details have been confirmed by the foundation." />;
}

export function ApplicationPortalNotice({ title = "Application portal configuration required" }: { title?: string }) {
  return <div className="border-l-4 border-[var(--gold-500)] bg-[var(--gold-100)] p-5"><p className="font-bold text-[var(--forest-950)]">{title}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Secure sign-in, private document storage, and email notifications must be configured before applications can be submitted. No application data is collected on this page yet.</p></div>;
}

export function ScholarshipApplicationShell({ scholarshipName }: { scholarshipName: string }) {
  return <AboutShell><section className="bg-[var(--paper)] py-16 lg:py-24"><div className="section-shell max-w-4xl"><p className="eyebrow">Scholarship application</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">Apply for {scholarshipName}</h1><p className="mt-6 text-base leading-7 text-[var(--muted)]">Applications will be saved as drafts, reviewed before submission, and assigned a private reference number.</p><div className="mt-8"><ApplicationPortalNotice /></div></div></section><section className="section-shell py-16 lg:py-24"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow">Application steps</p><ol className="mt-5 space-y-4 text-sm font-semibold text-[var(--forest-950)]"><li>01 Create an account or sign in</li><li>02 Complete and save your draft</li><li>03 Upload verified documents</li><li>04 Review and submit</li><li>05 Track your status securely</li></ol></div><div className="space-y-6"><fieldset disabled className="space-y-5 opacity-70"><label className="block text-sm font-bold text-[var(--forest-950)]">Full name<input className="form-control mt-2" /></label><label className="block text-sm font-bold text-[var(--forest-950)]">Personal statement<textarea className="form-control mt-2" /></label><label className="block text-sm font-bold text-[var(--forest-950)]">Supporting document<input type="file" className="form-control mt-2" /></label><Button type="button">Save draft</Button></fieldset><ApplicationPortalNotice title="Form disabled until secure services are connected" /></div></div></section></AboutShell>;
}
