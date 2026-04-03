type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-brand/80">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 transition-colors duration-300 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 transition-colors duration-300 dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
