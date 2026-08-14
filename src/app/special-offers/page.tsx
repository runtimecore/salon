import type { Metadata } from "next";
import Link from "next/link";
import OfferCard from "@/components/OfferCard";
import OfferCountdown from "@/components/OfferCountdown";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { formatOfferEnd, liveOffers, offerEndsAt } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Special Offers",
  description: `Limited-time savings on ${site.name} treatments — injectables, laser, facials, body, and wellness. Book before the offer ends.`,
};

/**
 * Offers expire by date, so this page can't be baked once at build time and
 * left alone: re-render it hourly and a promotion drops off the site the day
 * after it ends, with no deploy. (Route segment config, valid here because
 * Cache Components is not enabled in next.config.ts.)
 */
export const revalidate = 3600;

const reasons = [
  {
    title: "Same treatment, same team",
    body: "Offers are a price change, not a lesser service — the same licensed providers and medical-grade technology.",
  },
  {
    title: "Book before the clock runs out",
    body: "The discount is held by your booking date. Reserve now and keep the price even if your visit lands later.",
  },
  {
    title: "One offer per visit",
    body: "Offers can't be combined with each other or with membership pricing — we'll always apply whichever saves you more.",
  },
];

export default function SpecialOffersPage() {
  const offers = liveOffers();
  // Sorted soonest-first, so the first one is the next deadline on the site.
  const nextDeadline = offers[0]?.offer;

  return (
    <>
      {/* ── Hero: the headline deadline ── */}
      <section className="relative overflow-hidden border-b border-sand/70 bg-espresso text-cream">
        <div className="animate-float pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-rose/25 blur-3xl" />
        <div className="animate-float-slower pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-11 text-center sm:py-14">
          <p className="hero-enter eyebrow text-gold">Limited time</p>
          <h1
            className="hero-enter mt-3 text-4xl text-white sm:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            Special Offers
          </h1>
          <p
            className="hero-enter mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/75"
            style={{ animationDelay: "180ms" }}
          >
            {offers.length > 0
              ? `A handful of our most-booked treatments, at a price that won't be here for long. When the clock runs out, they go back to the regular menu.`
              : `No promotions are running right now — but our full treatment menu is always open, and members save on every visit.`}
          </p>

          {nextDeadline && (
            <div
              className="hero-enter mt-9 inline-flex flex-col items-center gap-3"
              style={{ animationDelay: "260ms" }}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-cream/50">
                Next offer ends in
              </p>
              <OfferCountdown
                variant="boxed"
                endsAt={offerEndsAt(nextDeadline)}
                endsOnLabel={formatOfferEnd(nextDeadline)}
              />
            </div>
          )}
        </div>
      </section>

      {offers.length > 0 ? (
        <>
          {/* ── The offers ── */}
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((service, i) => (
                <Reveal
                  key={service.name}
                  delay={(i % 3) * 70}
                  className="h-full"
                >
                  <OfferCard service={service} />
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-10 text-center text-sm text-muted">
                Looking for something else?{" "}
                <Link
                  href="/services"
                  className="font-semibold text-espresso underline-offset-4 hover:text-gold-dark hover:underline"
                >
                  See the full menu →
                </Link>
              </p>
            </Reveal>
          </section>

          {/* ── The small print, said plainly ── */}
          <section className="bg-linen/60 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <Reveal>
                <div className="text-center">
                  <p className="eyebrow text-gold-dark">Good to know</p>
                  <h2 className="mt-2 text-3xl text-ink">
                    How our offers work
                  </h2>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {reasons.map((r, i) => (
                  <Reveal key={r.title} delay={i * 90}>
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-serif text-xl text-gold-dark ring-1 ring-gold/30">
                        {i + 1}
                      </div>
                      <h3 className="mt-4 text-lg text-ink">{r.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {r.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final push ── */}
          <section className="mx-auto max-w-4xl px-6 py-20 text-center">
            <Reveal>
              <h2 className="text-3xl text-ink sm:text-4xl">
                Don&apos;t let the clock decide for you.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                These prices come off the menu when the countdown ends. Book in
                under a minute and lock yours in.
              </p>
              <div className="mt-8 flex justify-center">
                <BookButton className="px-10 py-4 text-base">
                  Book at the Offer Price
                </BookButton>
              </div>
            </Reveal>
          </section>
        </>
      ) : (
        /* Every offer has expired (or none is set) — say so, and keep the
           client moving rather than showing an empty grid. */
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl text-ink">No offers running right now</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              New promotions land regularly — follow us or join the membership
              for pricing that never expires.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
              >
                Explore Memberships
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-gold hover:text-white"
              >
                View Services
              </Link>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
