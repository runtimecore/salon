import Link from "next/link";
import BookButton from "@/components/BookButton";
import SignatureServiceCard from "@/components/SignatureServiceCard";
import AnnotatedPhoto from "@/components/AnnotatedPhoto";
import DepthChart from "@/components/DepthChart";
import GiftCardFace from "@/components/GiftCardFace";
import Reveal from "@/components/Reveal";
import { stratumColor } from "@/components/StratumTag";
import { featuredServices, strata } from "@/lib/services";
import { memberships } from "@/lib/memberships";
import { site } from "@/lib/site";

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";

/** A real sequence — first visit to follow-up — so the numbering earns itself. */
const visit = [
  {
    step: "01",
    title: "Consult",
    body: "You tell us what's bothering you. A provider looks at your skin, maps what's actually treatable, and says so plainly — including when the answer is “nothing yet”.",
  },
  {
    step: "02",
    title: "Plan",
    body: "You see the layer, the dose, the number of sessions, and the total before anything is opened. Nothing gets added at the chair.",
  },
  {
    step: "03",
    title: "Treat",
    body: "Your provider talks you through each step as it happens. Most appointments run under an hour, and most people go straight back to their day.",
  },
  {
    step: "04",
    title: "Review",
    body: "We look at your results two weeks later. If something needs adjusting inside that window, the adjustment is on us.",
  },
];

const testimonials = [
  {
    quote:
      "They talked me out of filler and into two sessions of microneedling. Cheaper, and my skin looks better than it has in years.",
    name: "Maya L.",
    treatment: "Microneedling with RF",
  },
  {
    quote:
      "The Botox looks like nothing happened, which is exactly what I asked for. My forehead still moves.",
    name: "Sophia R.",
    treatment: "Botox / Neurotoxin",
  },
  {
    quote:
      "First clinic that showed me the full price before starting. Nothing extra appeared at the desk afterwards.",
    name: "Daniela P.",
    treatment: "HydraFacial",
  },
];

export default function Home() {
  const featuredPlan = memberships.find((m) => m.featured);

  return (
    <>
      {/* ══ Hero ══════════════════════════════════════════════════════ */}
      <section className="border-b border-mist bg-paper">
        <div
          className={`${shell} grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:pb-20 lg:pt-20`}
        >
          <div>
            <p className="enter label flex items-center gap-3 text-jade">
              <span aria-hidden className="h-px w-8 bg-jade" />
              {site.tagline} · {site.city}
            </p>

            <h1
              className="enter mt-7 text-[clamp(2.15rem,3.9vw,3.6rem)]"
              style={{ animationDelay: "90ms" }}
            >
              Your skin has layers.
              <br />
              <span className="display-quiet">Every treatment has a depth.</span>
            </h1>

            <p
              className="enter mt-7 max-w-lg text-base leading-relaxed text-slate"
              style={{ animationDelay: "180ms" }}
            >
              {site.name} is a licensed medical spa in {site.city}. Before
              anything begins you&apos;ll know which layer we&apos;re treating,
              how long it takes, and what it costs — written down, not implied.
            </p>

            <div
              className="enter mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animationDelay: "270ms" }}
            >
              <BookButton>Book an appointment</BookButton>
              <Link
                href="/services"
                className="label group inline-flex items-center gap-3 text-ink"
              >
                See the treatment menu
                <span
                  aria-hidden
                  className="h-px w-6 bg-ink transition-all duration-300 group-hover:w-10 group-hover:bg-jade"
                />
              </Link>
            </div>

            <p
              className="enter num mt-7 text-[0.6875rem] text-muted"
              style={{ animationDelay: "340ms" }}
            >
              Consultations are free · Open six days a week
            </p>
          </div>

          <div className="enter-photo" style={{ animationDelay: "200ms" }}>
            <AnnotatedPhoto
              src="/images/hero.png"
              alt={`A provider treating a client at ${site.name}`}
              ratio="4/5"
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              plates={[
                {
                  x: 30,
                  y: 19,
                  side: "right",
                  label: "Layer",
                  value: "Surface · 0 mm",
                  delay: 950,
                },
                {
                  x: 93,
                  y: 88,
                  side: "left",
                  label: "Session",
                  value: "45 min",
                  delay: 1150,
                },
              ]}
            />
          </div>
        </div>

        {/* Depth key — the legend for the entire site, stated once, up front */}
        <div className="border-t border-mist">
          <div className={`${shell} py-6`}>
            <p className="label-sm mb-4 text-muted">Depth key</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {strata.map((stratum, i) => (
                <li
                  key={stratum.id}
                  className="enter-tick flex items-baseline gap-2.5"
                  style={{ animationDelay: `${600 + i * 60}ms` }}
                >
                  <span
                    aria-hidden
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[1px]"
                    style={{ background: stratumColor[stratum.id] }}
                  />
                  <span>
                    <span className="label block text-ink">{stratum.name}</span>
                    <span className="num mt-1 block text-[0.6875rem] text-muted">
                      {stratum.depth}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ Depth chart ═══════════════════════════════════════════════ */}
      <section className={`${shell} py-20 lg:py-28`}>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="label flex items-center gap-3 text-jade">
                <span aria-hidden className="h-px w-8 bg-jade" />
                The menu, by depth
              </p>
              <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4vw,3.25rem)]">
                Where each treatment works
              </h2>
            </div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-slate lg:pb-2">
              A facial and a filler are not the same kind of decision, and the
              difference is depth. Here is the whole menu, cut top to bottom.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <DepthChart />
        </div>

        <Reveal>
          <p className="num mt-6 max-w-2xl text-[0.6875rem] leading-relaxed text-muted">
            Depths shown are typical published ranges. Yours are mapped by your
            provider at consultation.
          </p>
        </Reveal>
      </section>

      {/* ══ Signature treatments ══════════════════════════════════════ */}
      <section className="border-y border-mist bg-paper py-20 lg:py-28">
        <div className={shell}>
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-mist pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="label flex items-center gap-3 text-jade">
                  <span aria-hidden className="h-px w-8 bg-jade" />
                  Most booked
                </p>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)]">
                  Signature treatments
                </h2>
              </div>
              <Link
                href="/services"
                className="label group inline-flex items-center gap-3 text-ink"
              >
                Full menu &amp; pricing
                <span
                  aria-hidden
                  className="h-px w-6 bg-ink transition-all duration-300 group-hover:w-10 group-hover:bg-jade"
                />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.name} delay={(i % 3) * 80} className="h-full">
                <SignatureServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ The visit ═════════════════════════════════════════════════ */}
      <section className={`${shell} py-20 lg:py-28`}>
        <Reveal>
          <p className="label flex items-center gap-3 text-jade">
            <span aria-hidden className="h-px w-8 bg-jade" />
            How a visit works
          </p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4vw,3.25rem)]">
            What happens when you come in
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-mist sm:grid-cols-2 lg:grid-cols-4">
          {visit.map((phase, i) => (
            <Reveal key={phase.step} delay={i * 80}>
              <div className="relative pt-7">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[3px] w-[3px] bg-jade"
                />
                <p className="num text-[0.6875rem] text-jade">{phase.step}</p>
                <h3 className="mt-3 text-xl">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {phase.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ Membership ════════════════════════════════════════════════ */}
      <section className="on-dark bg-petrol py-20 text-clinic lg:py-28">
        <div className={shell}>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <p className="label flex items-center gap-3 text-mint">
                  <span aria-hidden className="h-px w-8 bg-mint" />
                  Membership
                </p>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] text-clinic">
                  For skin that responds to repetition
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-clinic/75">
                  Most of what we do works on a schedule, not in a single visit.
                  A membership puts a treatment credit in your account each
                  month and holds your slot before the calendar fills.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href="/membership"
                    className="label inline-flex items-center justify-center rounded-[2px] bg-clinic px-7 py-4 text-[0.6875rem] text-ink transition-colors hover:bg-mint"
                  >
                    Compare plans
                  </Link>
                  <BookButton variant="ghost">Book a single visit</BookButton>
                </div>
              </div>

              {featuredPlan && (
                <div className="border-t border-clinic/20 pt-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl text-clinic">
                      {featuredPlan.name}
                    </h3>
                    <p className="num text-lg text-mint">
                      {featuredPlan.price}
                      <span className="text-[0.6875rem] text-clinic/60">
                        {featuredPlan.cadence}
                      </span>
                    </p>
                  </div>
                  <ul className="mt-6 space-y-0">
                    {featuredPlan.perks.map((perk) => (
                      <li
                        key={perk}
                        className="border-b border-clinic/10 py-3.5 text-sm text-clinic/80"
                      >
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Testimonials ══════════════════════════════════════════════ */}
      <section className={`${shell} py-20 lg:py-28`}>
        <Reveal>
          <p className="label flex items-center gap-3 text-jade">
            <span aria-hidden className="h-px w-8 bg-jade" />
            In their words
          </p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-12 border-t border-mist md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="relative flex h-full flex-col pt-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[3px] w-[3px] bg-jade"
                />
                <blockquote className="flex-1 text-[1.125rem] leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6">
                  <span className="label block text-ink">{t.name}</span>
                  <span className="num mt-1.5 block text-[0.6875rem] text-muted">
                    {t.treatment}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ Gift cards ════════════════════════════════════════════════ */}
      <section className="border-y border-mist bg-paper py-20 lg:py-24">
        <div className={shell}>
          <Reveal>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <div>
                <p className="label flex items-center gap-3 text-jade">
                  <span aria-hidden className="h-px w-8 bg-jade" />
                  Gift cards
                </p>
                <h2 className="mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)]">
                  Let them pick the treatment
                </h2>
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-slate">
                  Redeemable against anything on the menu, from a $25 B12 shot
                  to a course of laser. Delivered by email, and it never
                  expires.
                </p>
                <Link
                  href="/gift-cards"
                  className="label mt-8 inline-flex items-center justify-center rounded-[2px] bg-ink px-7 py-4 text-[0.6875rem] text-clinic transition-colors hover:bg-jade"
                >
                  Buy a gift card
                </Link>
              </div>

              <GiftCardFace className="mx-auto max-w-md" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Close ═════════════════════════════════════════════════════ */}
      <section className="on-dark bg-ink py-24 text-clinic lg:py-32">
        <div className={shell}>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
              <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,4rem)] text-clinic">
                Come in once. Leave knowing exactly what was done.
              </h2>
              <div className="lg:pb-3">
                <p className="mb-7 max-w-sm leading-relaxed text-clinic/70">
                  Booking takes about a minute and the consultation costs
                  nothing. Bring your questions — the harder the better.
                </p>
                <BookButton variant="light">Book an appointment</BookButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
