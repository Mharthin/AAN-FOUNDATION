"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "gold" | "success" | "info" | "warning" }) {
  const tones = {
    neutral: "bg-[var(--line)] text-[var(--muted)]",
    gold: "bg-[var(--gold-100)] text-[var(--warning)]",
    success: "bg-[var(--success-soft)] text-[var(--success)]",
    info: "bg-[var(--info-soft)] text-[var(--info)]",
    warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
  };

  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]", tones[tone])}>{children}</span>;
}

export function Alert({ title, children, tone = "info" }: { title: string; children: ReactNode; tone?: "info" | "success" | "warning" | "danger" }) {
  const tones = {
    info: "border-[var(--info)] bg-[var(--info-soft)] text-[var(--info)]",
    success: "border-[var(--success)] bg-[var(--success-soft)] text-[var(--success)]",
    warning: "border-[var(--warning)] bg-[var(--warning-soft)] text-[var(--warning)]",
    danger: "border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--danger)]",
  };

  return <div role="status" className={cn("border-l-4 p-4", tones[tone])}><p className="font-bold">{title}</p><div className="mt-1 text-sm leading-6">{children}</div></div>;
}

export function FormField({ label, id, hint, error, children }: { label: string; id: string; hint?: string; error?: string; children?: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-bold text-[var(--forest-950)]">{label}</label>
      {children ?? <input id={id} name={id} className="form-control" />}
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : hint ? <p className="text-xs leading-5 text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted)]">{items.map((item, index) => <span key={item.label} className="flex items-center gap-2">{index > 0 ? <span aria-hidden="true">/</span> : null}{item.href ? <a href={item.href} className="hover:text-[var(--forest-950)]">{item.label}</a> : <span aria-current="page" className="text-[var(--forest-950)]">{item.label}</span>}</span>)}</nav>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="border border-dashed border-[var(--line-strong)] bg-[var(--paper)] px-6 py-14 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--forest-100)] text-lg text-[var(--forest-800)]">+</div><h3 className="mt-5 font-display text-2xl text-[var(--forest-950)]">{title}</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">{description}</p>{action ? <div className="mt-6">{action}</div> : null}</div>;
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return <div role="status" className="flex items-center justify-center gap-3 py-12 text-sm font-semibold text-[var(--muted)]"><span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--line-strong)] border-t-[var(--forest-800)]" />{label}</div>;
}

export function Modal({ title, trigger, children }: { title: string; trigger: ReactNode; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return <><button type="button" onClick={() => setIsOpen(true)}>{trigger}</button>{isOpen ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(13,45,34,0.55)] p-6" role="presentation" onClick={() => setIsOpen(false)}><section role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-auto bg-[var(--paper)] p-6 shadow-[var(--shadow-lg)] sm:p-8"><div className="flex items-start justify-between gap-6"><h2 id="modal-title" className="display-text text-3xl text-[var(--forest-950)]">{title}</h2><button type="button" aria-label="Close dialog" onClick={() => setIsOpen(false)} className="text-2xl leading-none text-[var(--muted)] hover:text-[var(--forest-950)]">x</button></div><div className="mt-6">{children}</div></section></div> : null}</>;
}

export function ImageGallery({ items }: { items: Array<{ label: string; description: string }> }) {
  return <div className="grid gap-3 sm:grid-cols-2">{items.map((item, index) => <figure key={item.label} className={cn("group relative min-h-48 overflow-hidden bg-[var(--forest-950)] p-5", index === 0 && "sm:row-span-2 sm:min-h-full")}><div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,122,82,0.75),rgba(13,45,34,0.95))] transition-transform duration-500 group-hover:scale-105" /><figcaption className="relative flex h-full min-h-36 flex-col justify-end text-white"><p className="eyebrow text-[var(--gold-300)]">Gallery placeholder</p><h3 className="mt-2 font-display text-2xl">{item.label}</h3><p className="mt-2 text-xs leading-5 text-white/65">{item.description}</p></figcaption></figure>)}</div>;
}

type TableColumn<T> = { key: keyof T; label: string };

export function DataTable<T extends Record<string, ReactNode>>({ columns, rows }: { columns: Array<TableColumn<T>>; rows: T[] }) {
  return <div className="overflow-x-auto border border-[var(--line)]"><table className="w-full min-w-[32rem] border-collapse text-left text-sm"><thead className="bg-[var(--forest-100)] text-xs uppercase tracking-[0.12em] text-[var(--forest-800)]"><tr>{columns.map((column) => <th key={String(column.key)} className="px-4 py-3 font-bold">{column.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-t border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--ivory)]">{columns.map((column) => <td key={String(column.key)} className="px-4 py-4 text-[var(--muted)]">{row[column.key]}</td>)}</tr>)}</tbody></table></div>;
}
