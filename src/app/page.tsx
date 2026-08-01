import Link from "next/link";
import BookButton from "@/components/BookButton";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { featuredServices, serviceCategories } from "@/lib/services";
import { memberships } from "@/lib/memberships";
import { site } from "@/lib/site";

const values = [
  {
    title: "Expert Stylists",
    body: "A seasoned team that listens first, then delivers results you'll love to show off.",
  },
  {
    title: "Premium Products",
    body: "We use trusted, skin-kind, professional brands so your look lasts beyond the chair.",
  },
  {
    title: "Effortless Booking",
    body: "Reserve your spot online in under a minute, any time of day, and get instant confirmation.",
  },
  {
    title: "A Warm Escape",
    body: "A calm, welcoming space designed to make every visit feel like a moment for yourself.",
  },
];

const testimonials = [
  {
    quote:
      "The best balayage I've ever had. The team truly listened and I walked out glowing.",
    name: "Sophia R.",
  },
  {
    quote:
      "Relaxing, professional, and always on time. Aphrodite has become my monthly ritual.",
    name: "Maya L.",
  },
  {
    quote:
      "From the moment you walk in, you feel cared for. My facials leave my skin incredible.",
    name: "Daniela P.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-linen">
        {/* Decorative warm glows (gently floating) */}
        <div className="animate-float pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blush/40 blur-3xl" />
        <div className="animate-float-slower pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="hero-enter eyebrow text-gold-dark">{site.city} · Beauty Salon</p>
            <h1
              className="hero-enter mt-4 text-5xl leading-[1.05] text-ink sm:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              Beauty, <span className="text-gold-dark">reimagined</span> for you.
            </h1>
            <p
              className="hero-enter mt-6 max-w-md text-lg leading-relaxed text-espresso/80"
              style={{ animationDelay: "220ms" }}
            >
              At {site.name}, expert stylists and a warm, modern space come
              together to bring out your most radiant self. Book your moment of
              renewal today.
            </p>
            <div
              className="hero-enter mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "320ms" }}
            >
              <BookButton className="px-8 py-3.5 text-base">Book an Appointment</BookButton>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-espresso underline-offset-4 hover:text-gold-dark hover:underline"
              >
                View Services →
              </Link>
            </div>
            <div
              className="hero-enter mt-10 flex items-center gap-8 text-sm text-muted"
              style={{ animationDelay: "420ms" }}
            >
              <div>
                <p className="font-serif text-2xl text-ink">10+</p>
                <p>Years of care</p>
              </div>
              <div className="h-8 w-px bg-sand" />
              <div>
                <p className="font-serif text-2xl text-ink">5,000+</p>
                <p>Happy clients</p>
              </div>
              <div className="h-8 w-px bg-sand" />
              <div>
                <p className="font-serif text-2xl text-ink">4.9★</p>
                <p>Average rating</p>
              </div>
            </div>
          </div>

          {/* Hero visual — replace with a real photo (see notes) */}
          <div className="hero-enter relative" style={{ animationDelay: "250ms" }}>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush via-sand to-gold/40 shadow-xl shadow-gold/10">
              <div className="flex h-full items-center justify-center p-8 text-center">
                <span className="font-serif text-2xl text-espresso/50">
                  Your salon photo here
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-sand bg-cream/95 px-6 py-4 shadow-lg sm:block">
              <p className="font-serif text-lg text-ink">Walk in. Glow out.</p>
              <p className="text-xs text-muted">Open 6 days a week</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value props ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="mb-4 h-12 w-12 rounded-full bg-gold/15 ring-1 ring-gold/30" />
              <h3 className="text-lg text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured services ── */}
      <section className="bg-linen/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
              <div>
                <p className="eyebrow text-gold-dark">What we do</p>
                <h2 className="mt-2 text-4xl text-ink">Our signature services</h2>
              </div>
              <Link
                href="/services"
                className="text-sm font-semibold text-espresso underline-offset-4 hover:text-gold-dark hover:underline"
              >
                See full menu →
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.name} delay={i * 90}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {serviceCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/services#${c.slug}`}
                  className="rounded-full border border-sand bg-white/70 px-5 py-2 text-sm text-espresso transition-colors hover:border-gold hover:text-gold-dark"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Membership teaser ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-espresso px-8 py-14 text-cream sm:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-gold">Become a member</p>
                <h2 className="mt-3 text-4xl text-white">
                  More glow, more often, for less.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-cream/80">
                  Join the {site.name} membership and enjoy monthly service
                  credits, member-only pricing, and priority booking. Beauty as a
                  habit, not a splurge.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/membership"
                    className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                  >
                    Explore Memberships
                  </Link>
                  <BookButton variant="light">Book a Visit</BookButton>
                </div>
              </div>
              <ul className="space-y-4">
                {memberships.find((m) => m.featured)?.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-cream/90">
                    <span className="mt-1 text-gold">✦</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-linen/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-gold-dark">Loved by our clients</p>
              <h2 className="mt-2 text-4xl text-ink">Kind words</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <figure className="flex h-full flex-col rounded-2xl border border-sand bg-white/70 p-7">
                  <div className="text-gold">★★★★★</div>
                  <blockquote className="mt-4 flex-1 text-espresso/90">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 font-serif text-lg text-ink">
                    {t.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gift card teaser ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[2rem] border border-sand bg-linen px-8 py-12 sm:px-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-dark">Gift Cards</p>
              <h2 className="mt-3 text-4xl text-ink">The perfect little luxury.</h2>
              <p className="mt-4 max-w-md text-muted">
                Not sure what to give? An {site.name} gift card lets them choose
                their own moment of self-care — redeemable on any service or
                product, and it never expires.
              </p>
              <div className="mt-7">
                <Link
                  href="/gift-cards"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  Shop Gift Cards
                </Link>
              </div>
            </div>
            {/* Mini gift card visual */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-espresso via-espresso to-[#5a4633] p-6 text-cream shadow-lg shadow-gold/10">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <p className="font-serif text-xl text-white">{site.name}</p>
                    <span className="rounded-full border border-gold/50 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-widest text-gold">
                      Gift Card
                    </span>
                  </div>
                  <p className="font-serif text-2xl text-white">Any amount</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <p className="eyebrow text-gold-dark">Ready when you are</p>
          <h2 className="mt-3 text-4xl text-ink sm:text-5xl">
            Your next look is one click away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Reserve your appointment online in under a minute. We can&apos;t wait
            to welcome you to {site.name}.
          </p>
          <div className="mt-8 flex justify-center">
            <BookButton className="px-10 py-4 text-base">Book Now</BookButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
