type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--forest-600)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-tight text-[var(--forest-950)] sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-7 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}
