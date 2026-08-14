import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ActionLink from "@/components/ActionLink";
import GiftCardAmountPicker from "@/components/GiftCardAmountPicker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: `Give the gift of self-care. Purchase a ${site.name} gift card online — the perfect present for birthdays, holidays, and every occasion.`,
};

const giftCardUrl = site.giftCardUrl || site.bookingUrl;

const steps = [
  {
    title: "Choose an amount",
    body: "Pick a preset value or enter a custom amount that suits your budget.",
  },
  {
    title: "Add a personal message",
    body: "Include a note and the recipient's email so it arrives just right.",
  },
  {
    title: "They book & glow",
    body: "The lucky recipient redeems it toward any treatment or product they love.",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift Cards"
        title="Give the gift of self-care"
        subtitle={`A ${site.name} gift card is the perfect present for birthdays, holidays, thank-yous, or just because. Redeemable on any treatment or product.`}
      />

      {/* Card visual + buy */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Gift card mockup */}
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-espresso via-espresso to-[#5a4633] p-8 text-cream shadow-xl shadow-gold/10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-2xl" />
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="pointer-events-none absolute bottom-5 right-6 h-14 w-14 text-cream/30"
                fill="none"
              >
                <path
                  d="M60 14c8 12 8 20 0 32c-8-12-8-20 0-32ZM106 60c-12 8-20 8-32 0c12-8 20-8 32 0ZM60 106c-8-12-8-20 0-32c8 12 8 20 0 32ZM14 60c12-8 20-8 32 0c-12 8-20 8-32 0ZM88 32c-4 12-10 18-22 22c4-12 10-18 22-22ZM88 88c-12-4-18-10-22-22c12 4 18 10 22 22ZM32 88c4-12 10-18 22-22c-4 12-10 18-22 22ZM32 32c12 4 18 10 22 22c-12-4-18-10-22-22Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-serif text-2xl text-white">
                      {site.name}
                    </p>
                    <p className="eyebrow text-gold">{site.tagline}</p>
                  </div>
                  <span className="rounded-full border border-gold/50 px-3 py-1 text-xs uppercase tracking-widest text-gold">
                    Gift Card
                  </span>
                </div>
                <div>
                  <p className="text-sm text-cream/70">The gift of self-care</p>
                  <p className="font-serif text-3xl text-white">Any amount</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buy panel */}
          <div>
            <h2 className="text-3xl text-ink">Choose your amount</h2>
            <p className="mt-3 text-muted">
              Select a value to get started, or choose a custom amount at
              checkout. Gift cards are delivered by email and never expire.
            </p>

            <GiftCardAmountPicker
              giftCardUrl={giftCardUrl}
              amounts={site.giftCardAmounts}
            />

            <div className="mt-8">
              <ActionLink
                href={giftCardUrl}
                pendingTitle="Gift card purchasing coming soon"
                className="inline-flex items-center justify-center rounded-full bg-gold px-9 py-4 text-base font-semibold text-white transition-colors hover:bg-gold-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Buy a Gift Card
              </ActionLink>
              <p className="mt-3 text-sm text-muted">
                Prefer in person? Gift cards are also available at the spa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-linen/60 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="eyebrow text-gold-dark">How it works</p>
            <h2 className="mt-2 text-3xl text-ink">Gifting made simple</h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-serif text-xl text-gold-dark ring-1 ring-gold/30">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
