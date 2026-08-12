import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import BookButton from "@/components/BookButton";
import { serviceCategories } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: `Explore ${site.name}'s full menu of injectables, laser, facial, and wellness treatments with transparent pricing.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Menu"
        title="Services & Pricing"
        subtitle="Every service begins with a consultation, so your look is tailored to you. Prices are a starting guide and may vary with length, density, or add-ons."
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        {serviceCategories.map((category) => (
          <section key={category.slug} id={category.slug} className="scroll-mt-24 py-10">
            <div className="mb-8 border-b border-sand pb-5">
              <h2 className="text-3xl text-ink">{category.title}</h2>
              <p className="mt-1 text-muted">{category.blurb}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-10 rounded-2xl bg-linen px-8 py-12 text-center">
          <h2 className="text-3xl text-ink">Found your service?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Book online and pick the time that works for you. Confirmation is
            instant.
          </p>
          <div className="mt-6 flex justify-center">
            <BookButton className="px-9 py-3.5 text-base">Book Now</BookButton>
          </div>
        </div>
      </div>
    </>
  );
}
