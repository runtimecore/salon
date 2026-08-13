/**
 * The masthead every inner page opens with. Left-aligned rather than centred:
 * the title sets the page, the standfirst sits at its baseline on the right,
 * and a hairline closes the block — the same structure a technical document
 * uses for a section head.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional meta row rendered under the hairline (legends, counts, links). */
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-mist bg-paper">
      <div className="mx-auto max-w-[84rem] px-6 pb-12 pt-14 lg:px-12 lg:pb-16 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div>
            {eyebrow && (
              <p className="label flex items-center gap-3 text-jade">
                <span aria-hidden className="h-px w-8 bg-jade" />
                {eyebrow}
              </p>
            )}
            <h1 className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)]">{title}</h1>
          </div>
          {subtitle && (
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-slate lg:pb-2">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
