import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ActionLink from "@/components/ActionLink";
import GiftCardFace from "@/components/GiftCardFace";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: `Buy a ${site.name} gift card online. Redeemable against any treatment on the menu, delivered by email, and it never expires.`,
};

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";

const giftCardUrl = site.giftCardUrl || site.bookingUrl;
const pendingTitle = "Gift card purchasing coming soon";

const steps = [
  {
    step: "01",
    title: "Choose an amount",
    body: "Pick a preset or enter your own at checkout. $25 covers a B12 shot; $175 covers a HydraFacial outright.",
  },
  {
    step: "02",
    title: "Add a message",
    body: "Write a note and give us the recipient's email. It arrives the moment you pay, or on a date you set.",
  },
  {
    step: "03",
    title: "They book",
    body: "They redeem it against any treatment or product. No expiry date, and no minimum spend to use it.",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title="A gift with no wrong answer"
        subtitle={`Redeemable against everything on the ${site.name} menu — surface to bloodstream. Delivered by email, valid forever, and refundable against nothing but a better mood.`}
      />

      {/* Card + amounts */}
      <section className={`${shell} surface-bleed py-16 lg:py-20`}>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <GiftCardFace />
          </Reveal>

          <Reveal delay={80}>
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">
                Choose an amount
              </h2>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-slate">
                Any value works — a card can cover a whole treatment or go
                towards a course of them. Custom amounts are set at checkout.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {site.giftCardAmounts.map((amount) => (
                  <ActionLink
                    key={amount}
                    href={giftCardUrl}
                    pendingTitle={pendingTitle}
                    className="num rounded-[2px] border border-ink/20 px-6 py-3.5 text-[0.9375rem] text-ink transition-colors hover:border-jade hover:bg-jade hover:text-clinic"
                  >
                    ${amount}
                  </ActionLink>
                ))}
                <ActionLink
                  href={giftCardUrl}
                  pendingTitle={pendingTitle}
                  className="label rounded-[2px] border border-dashed border-ink/25 px-6 py-3.5 text-ink transition-colors hover:border-jade hover:text-jade"
                >
                  Custom
                </ActionLink>
              </div>

              <div className="mt-10">
                <ActionLink
                  href={giftCardUrl}
                  pendingTitle={pendingTitle}
                  className="label inline-flex items-center justify-center rounded-[2px] bg-ink px-8 py-4 text-[0.6875rem] text-clinic transition-colors hover:bg-jade"
                >
                  Buy a gift card
                </ActionLink>
                <p className="num mt-4 text-[0.6875rem] text-muted">
                  Also sold at the front desk · {site.addressLine1}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works — a real sequence, so it gets numbers */}
      <section className="border-t border-mist bg-surface-raised py-16 lg:py-24">
        <div className={shell}>
          <Reveal>
            <p className="label flex items-center gap-3 text-jade">
              <span aria-hidden className="h-px w-8 bg-jade" />
              How it works
            </p>
            <h2 className="mt-6 max-w-xl text-[clamp(1.75rem,3.4vw,2.75rem)]">
              Three minutes, start to sent
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-mist md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.step} delay={i * 80}>
                <div className="relative pt-7">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[3px] w-[3px] bg-jade"
                  />
                  <p className="num text-[0.6875rem] text-jade">{step.step}</p>
                  <h3 className="mt-3 text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
