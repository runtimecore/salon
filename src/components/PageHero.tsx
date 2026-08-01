export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-sand/70 bg-linen">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        {eyebrow && <p className="eyebrow text-gold-dark">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
