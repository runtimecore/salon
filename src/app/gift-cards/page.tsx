import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ActionLink from "@/components/ActionLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: `Give the gift of beauty. Purchase an ${site.name} gift card online — the perfect present for birthdays, holidays, and every occasion.`,
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
    body: "The lucky recipient redeems it toward any service or product they love.",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift Cards"
        title="Give the gift of beauty"
        subtitle="An Aphrodite gift card is the perfect present for birthdays, holidays, thank-yous, or just because. Redeemable on any service or product."
      />

      {/* Card visual + buy */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Gift card mockup */}
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-espresso via-espresso to-[#5a4633] p-8 text-cream shadow-xl shadow-gold/10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-2xl" />
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-serif text-2xl text-white">{site.name}</p>
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

            <div className="mt-6 flex flex-wrap gap-3">
              {site.giftCardAmounts.map((amount) => (
                <ActionLink
                  key={amount}
                  href={giftCardUrl}
                  pendingTitle="Gift card purchasing coming soon"
                  className="rounded-full border border-sand bg-white/70 px-6 py-3 font-serif text-lg text-espresso transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  ${amount}
                </ActionLink>
              ))}
              <ActionLink
                href={giftCardUrl}
                pendingTitle="Gift card purchasing coming soon"
                className="rounded-full border border-sand bg-white/70 px-6 py-3 text-sm font-medium text-espresso transition-colors hover:border-gold hover:text-gold-dark"
              >
                Custom
              </ActionLink>
            </div>

            <div className="mt-8">
              <ActionLink
                href={giftCardUrl}
                pendingTitle="Gift card purchasing coming soon"
                className="inline-flex items-center justify-center rounded-full bg-gold px-9 py-4 text-base font-semibold text-white transition-colors hover:bg-gold-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Buy a Gift Card
              </ActionLink>
              <p className="mt-3 text-sm text-muted">
                Prefer in person? Gift cards are also available at the salon.
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
