import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { memberships } from "@/lib/memberships";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description: `Join the ${site.name} membership for a monthly treatment credit, member pricing, and priority booking.`,
};

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";

const faqs = [
  {
    q: "How do membership credits work?",
    a: "Each month your plan adds a service credit to your account, redeemable against any eligible treatment. Unused credits roll over for one month, so a missed month is never a lost month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Every plan is month-to-month with no contract and no cancellation fee. Tell us before your next billing date and it stops there.",
  },
  {
    q: "Do member discounts stack with promotions?",
    a: "Member pricing applies to regular-priced treatments and retail. It can't be combined with limited-time offers — you'll always be charged whichever is lower.",
  },
  {
    q: "Can I use my credit on any layer?",
    a: "Credits apply to treatments at or below your plan's tier. Renew covers express treatments, Radiance covers signature treatments, and Elite covers the premium end of the menu.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Results compound. So should the price."
        subtitle="Most of what we do works on a schedule — collagen answers over months, hair thins over sessions. A membership prices that reality instead of charging you for it a visit at a time."
      />

      {/* Plans */}
      <section className={`${shell} surface-bleed py-16 lg:py-20`}>
        <Reveal>
          <div className="grid border-y border-mist lg:grid-cols-3">
            {memberships.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col border-b border-mist p-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 ${
                  plan.featured ? "on-dark bg-surface-deep text-clinic" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    className={`text-2xl ${plan.featured ? "text-clinic" : "text-ink"}`}
                  >
                    {plan.name}
                  </h2>
                  {plan.featured && (
                    <span className="label-sm text-mint">Most chosen</span>
                  )}
                </div>

                <p
                  className={`mt-2 text-sm ${plan.featured ? "text-clinic/70" : "text-slate"}`}
                >
                  {plan.tagline}
                </p>

                <p className="mt-8 flex items-baseline gap-1.5">
                  <span
                    className={`num text-4xl ${plan.featured ? "text-clinic" : "text-ink"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`num text-[0.75rem] ${plan.featured ? "text-clinic/60" : "text-muted"}`}
                  >
                    {plan.cadence}
                  </span>
                </p>

                <ul className="mt-8 flex-1">
                  {plan.perks.map((perk) => (
                    <li
                      key={perk}
                      className={`border-t py-3.5 text-sm last:border-b ${
                        plan.featured
                          ? "border-clinic/15 text-clinic/80"
                          : "border-mist text-slate"
                      }`}
                    >
                      {perk}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`label mt-8 inline-flex items-center justify-center rounded-[2px] px-7 py-4 text-[0.6875rem] transition-colors ${
                    plan.featured
                      ? "bg-clinic text-ink hover:bg-mint"
                      : "border border-ink/25 text-ink hover:border-jade hover:text-jade"
                  }`}
                >
                  Join {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="text-sm text-slate">
              Rather try one treatment before committing to twelve?
            </p>
            <BookButton variant="outline" size="sm">
              Book a single visit
            </BookButton>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-mist bg-surface-raised py-16 lg:py-24">
        <div className={shell}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="label flex items-center gap-3 text-jade">
                  <span aria-hidden className="h-px w-8 bg-jade" />
                  Before you join
                </p>
                <h2 className="mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)]">
                  The fine print, in plain words
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="border-t border-mist">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-mist">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 marker:hidden">
                      <span className="text-[1.0625rem] text-ink">{f.q}</span>
                      <span
                        aria-hidden
                        className="relative mt-2.5 h-px w-3.5 shrink-0 bg-jade before:absolute before:left-1/2 before:top-1/2 before:h-3.5 before:w-px before:-translate-x-1/2 before:-translate-y-1/2 before:bg-jade before:transition-transform before:duration-300 group-open:before:scale-y-0"
                      />
                    </summary>
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-slate">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
