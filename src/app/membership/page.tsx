import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import Link from "next/link";
import { memberships } from "@/lib/memberships";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the Aphrodite membership for monthly service credits, member-only pricing, and priority booking.",
};

const faqs = [
  {
    q: "How do membership credits work?",
    a: "Each month your plan includes service credit(s) you can apply to eligible services. Unused credits roll over for one month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Memberships are month-to-month with no long-term contract. Just let us know before your next billing date.",
  },
  {
    q: "Do discounts stack with promotions?",
    a: "Member pricing applies to regular-priced services and retail, and can't be combined with other limited-time offers.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Beauty, as a beautiful habit."
        subtitle="Save on the services you love, enjoy priority booking, and make self-care part of your routine. Choose the plan that fits your glow."
      />

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {memberships.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                plan.featured
                  ? "border-gold bg-white shadow-xl shadow-gold/10"
                  : "border-sand bg-white/60"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl text-ink">{plan.price}</span>
                <span className="text-muted">{plan.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-espresso/90">
                    <span className="mt-0.5 text-gold-dark">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-gold text-white hover:bg-gold-dark"
                    : "border border-gold text-espresso hover:bg-gold hover:text-white"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Prefer to try us first?{" "}
          <span className="text-espresso">
            <BookButton variant="outline" className="px-5 py-2 align-middle">
              Book a single visit
            </BookButton>
          </span>
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-linen/60 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl text-ink">Membership questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-sand bg-white/70 p-6"
              >
                <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
                  <span className="flex items-center justify-between">
                    {f.q}
                    <span className="text-gold-dark transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
