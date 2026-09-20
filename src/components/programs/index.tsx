import Image from "next/image";
import Link from "next/link";
import type { PublicProgram } from "@/features/programs/queries";

const assetPath = (path: string) => path.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

export function ProgramImage({ program, detail = false }: { program: PublicProgram; detail?: boolean }) {
  if (program.featuredImage) {
    return <Image src={assetPath(program.featuredImage)} alt="" width={1200} height={800} sizes="(min-width: 1024px) 50vw, 100vw" unoptimized={program.featuredImage.startsWith("http")} className="h-full w-full object-cover" priority={detail} />;
  }

  return <div className="subtle-grid flex h-full min-h-52 items-end bg-[var(--forest-100)] p-6"><div><p className="eyebrow">Program image</p><p className="mt-2 text-sm text-[var(--muted)]">Approved imagery will be added here.</p></div></div>;
}

export function ProgramCard({ program }: { program: PublicProgram }) {
  return <article className="group overflow-hidden border border-[var(--line)] bg-[var(--paper)] shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"><Link href={`/programs/${program.slug}/`} className="block"><div className="aspect-[16/10] overflow-hidden"><ProgramImage program={program} /></div><div className="p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[var(--forest-100)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--forest-800)]">{program.category}</span>{program.featured ? <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-500)]">Featured</span> : null}</div><h2 className="display-text mt-6 text-3xl leading-tight text-[var(--forest-950)]">{program.name}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{program.summary}</p><span className="mt-6 inline-block text-sm font-bold text-[var(--forest-800)] transition-transform group-hover:translate-x-1">Explore program -&gt;</span></div></Link></article>;
}

export function ProgramMeta({ program }: { program: PublicProgram }) {
  const start = formatDate(program.startDate);
  const end = formatDate(program.endDate);
  return <div className="grid gap-4 border-y border-[var(--line)] py-5 text-sm sm:grid-cols-3"><div><p className="eyebrow">Category</p><p className="mt-2 font-semibold text-[var(--forest-950)]">{program.category}</p></div><div><p className="eyebrow">Program period</p><p className="mt-2 font-semibold text-[var(--forest-950)]">{start || end ? `${start ?? "To be confirmed"} - ${end ?? "Ongoing"}` : "To be confirmed"}</p></div><div><p className="eyebrow">Status</p><p className="mt-2 font-semibold text-[var(--success)]">Published</p></div></div>;
}

export function ProgramDetail({ program }: { program: PublicProgram }) {
  return <><section className="bg-[var(--paper)] py-16 lg:py-24"><div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end"><div><p className="eyebrow">{program.category}</p><h1 className="display-text mt-5 text-5xl leading-[1.03] text-[var(--forest-950)] sm:text-6xl">{program.name}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">{program.summary}</p></div><div className="aspect-[4/3] overflow-hidden"><ProgramImage program={program} detail /></div></div></section><section className="section-shell py-12"><ProgramMeta program={program} /><div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.7fr]"><div><p className="eyebrow">About this program</p><div className="mt-5 whitespace-pre-line text-base leading-8 text-[var(--muted)]">{program.description}</div></div><aside className="space-y-8"><InfoBlock title="Eligibility" value={program.eligibility} /><InfoBlock title="Application information" value={program.applicationInfo} /></aside></div></section>{program.gallery.length > 0 ? <section className="section-shell pb-20 lg:pb-28"><p className="eyebrow">Program gallery</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{program.gallery.map((image, index) => <div key={image} className="aspect-[4/3] overflow-hidden bg-[var(--forest-100)]"><Image src={assetPath(image)} alt={`${program.name} gallery image ${index + 1}`} width={900} height={675} sizes="(min-width: 640px) 50vw, 100vw" unoptimized={image.startsWith("http")} className="h-full w-full object-cover" /></div>)}</div></section> : null}</>;
}

function InfoBlock({ title, value }: { title: string; value: string | null }) {
  return <div className="border-l-2 border-[var(--gold-500)] pl-5"><p className="eyebrow">{title}</p><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{value || "Information will be published when confirmed by the foundation."}</p></div>;
}
