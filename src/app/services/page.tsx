import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { stratumColor } from "@/components/StratumTag";
import { serviceCategories, strata } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: `Explore ${site.name}'s full menu of injectables, laser, facial, and wellness treatments — each one listed with the skin layer it treats, how long it takes, and what it costs.`,
};

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatment menu"
        title="Services & pricing"
        subtitle="Every treatment is listed with the layer it works in, how long it takes, and what it costs. Prices start where the menu says; your provider confirms the total before anything is opened."
      >
        <nav
          aria-label="Treatment categories"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-mist pt-6"
        >
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={`#${category.slug}`}
              className="label text-slate transition-colors hover:text-jade"
            >
              {category.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      {/* Depth legend, repeated here because the menu rows are colour-coded */}
      <div className="border-b border-mist bg-surface">
        <div className={`${shell} flex flex-wrap items-center gap-x-6 gap-y-3 py-5`}>
          <span className="label-sm text-muted">Depth key</span>
          {strata.map((stratum) => (
            <span key={stratum.id} className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-[1px]"
                style={{ background: stratumColor[stratum.id] }}
              />
              <span className="label-sm text-slate">{stratum.name}</span>
              <span className="num text-[0.625rem] text-muted">
                {stratum.depth}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className={`${shell} surface-bleed pb-8 pt-16 lg:pt-20`}>
        {serviceCategories.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-24 pb-16"
          >
            <Reveal>
              <div className="flex flex-col justify-between gap-3 border-b border-ink/25 pb-5 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">
                    {category.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-slate">
                    {category.blurb}
                  </p>
                </div>
                <p className="num text-[0.6875rem] text-muted">
                  {category.services.length} treatments
                </p>
              </div>
            </Reveal>

            <div>
              {category.services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Close */}
      <section className="on-dark bg-surface-ink py-20 text-clinic lg:py-24">
        <div className={shell}>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
              <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] text-clinic">
                Not sure which layer you need?
              </h2>
              <div className="lg:pb-3">
                <p className="mb-7 max-w-sm leading-relaxed text-clinic/70">
                  Book a consultation. A provider maps your skin, tells you what
                  is treatable, and gives you a written plan — no charge, no
                  obligation to book anything on the day.
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
