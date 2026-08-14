import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import OfferCard from "@/components/OfferCard";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { offeredServices } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Special Offers",
  description: `Discounted pricing on ${site.name} treatments — each offer listed with the layer it works in, what it normally costs, and what you save.`,
};

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";

const terms = [
  "One offer per visit. Offers can't be combined with each other or with member pricing — you're charged whichever is lower.",
  "An offer holds while it's listed on this page. Once it comes off, the treatment goes back to its menu price — we won't backdate it, and we won't pretend it's about to disappear either.",
  "Every offer is still subject to a suitability consultation. Some treatments aren't right for every skin type, and we will say so before taking payment.",
  "Prices shown are for the treatment as listed on the menu. Your provider confirms the total before anything is opened.",
];

export default function OffersPage() {
  const offers = offeredServices();
  const [lead, ...rest] = offers;
  const categories = new Set(offers.map((o) => o.categorySlug)).size;

  return (
    <>
      <PageHero
        eyebrow="On offer now"
        title="Special offers"
        subtitle="A handful of treatments off the menu, priced down while they're running. Same providers, same equipment, same depth — the only thing that changes is what it costs."
      >
        {offers.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-mist pt-6">
            <span className="flex items-baseline gap-2.5">
              <span className="num text-[0.9375rem] text-ink">
                {offers.length}
              </span>
              <span className="label-sm text-muted">
                {offers.length === 1 ? "treatment" : "treatments"} discounted
              </span>
            </span>
            <span className="flex items-baseline gap-2.5">
              <span className="num text-[0.9375rem] text-ink">
                {categories}
              </span>
              <span className="label-sm text-muted">
                {categories === 1 ? "category" : "categories"}
              </span>
            </span>
            <span className="label-sm text-jade">
              Listed here means available now
            </span>
          </div>
        )}
      </PageHero>

      {offers.length === 0 ? (
        /* Reached whenever the last `offer` block comes out of the catalogue —
           which is how promotions end here, so this is a real state. */
        <section className={`${shell} surface-bleed py-24 lg:py-32`}>
          <Reveal>
            <p className="label flex items-center gap-3 text-jade">
              <span aria-hidden className="h-px w-8 bg-jade" />
              Between offers
            </p>
            <h2 className="mt-6 max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)]">
              Nothing is discounted at the moment.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate">
              When something is, it shows up here — and it stays until it
              doesn&rsquo;t. The full menu is priced the same as always in the
              meantime, and a consultation is free either way.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <BookButton>Book a consultation</BookButton>
              <Link
                href="/services"
                className="label inline-flex items-center justify-center rounded-[2px] border border-ink/25 px-7 py-4 text-[0.6875rem] text-ink transition-colors hover:border-jade hover:text-jade"
              >
                See the full menu
              </Link>
            </div>
          </Reveal>
        </section>
      ) : (
        <section className={`${shell} surface-bleed pb-16 pt-14 lg:pb-20 lg:pt-16`}>
          {/* The first offer in the catalogue leads, on the deep panel. Which
              one that is, is an editorial choice made in lib/services.ts by
              ordering the menu — not something computed from a clock. */}
          <Reveal>
            <div className="border-t border-mist">
              <OfferCard service={lead} featured />
            </div>
          </Reveal>

          {rest.length > 0 && (
            <div className="grid lg:grid-cols-2">
              {rest.map((service, i) => (
                <Reveal
                  key={service.name}
                  delay={i * 70}
                  className="h-full border-mist lg:odd:border-r"
                >
                  <OfferCard service={service} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-slate">
              Not on this list?{" "}
              <Link
                href="/services"
                className="text-jade underline decoration-jade/30 decoration-1 underline-offset-4 transition-colors hover:decoration-jade"
              >
                The full menu
              </Link>{" "}
              is priced the same as it always is — no offer means no catch.
            </p>
          </Reveal>
        </section>
      )}

      {/* Fine print */}
      <section className="border-t border-mist bg-surface-raised py-16 lg:py-20">
        <div className={shell}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="label flex items-center gap-3 text-jade">
                  <span aria-hidden className="h-px w-8 bg-jade" />
                  How offers work
                </p>
                <h2 className="mt-6 text-[clamp(1.75rem,3.4vw,2.5rem)]">
                  The conditions, in plain words
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <ul className="border-t border-mist">
                {terms.map((term) => (
                  <li
                    key={term}
                    className="border-b border-mist py-5 text-sm leading-relaxed text-slate"
                  >
                    {term}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="on-dark bg-surface-ink py-20 text-clinic lg:py-24">
        <div className={shell}>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
              <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] text-clinic">
                Want to know which of these is actually for you?
              </h2>
              <div className="lg:pb-3">
                <p className="mb-7 max-w-sm leading-relaxed text-clinic/70">
                  Book a consultation. A provider maps your skin and tells you
                  plainly whether the discounted treatment is the right one —
                  and if it isn&rsquo;t, which is.
                </p>
                <BookButton variant="light">Book a consultation</BookButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
