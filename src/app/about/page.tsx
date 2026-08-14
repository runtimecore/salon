import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the team behind ${site.name} — a modern medical spa built on care, craft, and a warm welcome.`,
};

// TODO: replace with real providers and photos.
const team = [
  {
    name: "Elena Marchetti",
    role: "Founder & Medical Director",
    photo: "/images/team-founder.png",
  },
  {
    name: "Priya Nair",
    role: "Nurse Injector, RN",
    photo: "/images/team-nurse-injector.png",
  },
  {
    name: "Jordan Kim",
    role: "Licensed Esthetician",
    photo: "/images/team-esthetician.png",
  },
  {
    name: "Camila Torres",
    role: "Patient Care Coordinator",
    photo: "/images/team-care-coordinator.png",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Care is our craft"
        subtitle={`${site.name} was founded on a simple belief: everyone deserves to feel confident and cared for. Here's who we are.`}
      />

      {/* Story */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/about-interior.png"
              alt={`${site.name} treatment room`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl text-ink">A warm, modern escape</h2>
            <p className="mt-4 leading-relaxed text-espresso/80">
              From the moment you step through our doors, {site.name} is
              designed to feel like a retreat from the everyday. Our providers
              blend clinical expertise with genuine attention, so every visit
              leaves you looking — and feeling — your best.
            </p>
            <p className="mt-4 leading-relaxed text-espresso/80">
              We invest in ongoing training and medical-grade technology,
              because your skin, health, and time deserve nothing less. Whether
              it&apos;s a quick refresh or a full transformation, we&apos;re
              here for it.
            </p>
            <div className="mt-8">
              <BookButton>Book Your Visit</BookButton>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-linen/60 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-gold-dark">The Team</p>
              <h2 className="mt-2 text-3xl text-ink">Meet your stylists</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 90}>
                <div className="text-center">
                  <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg text-ink">{member.name}</h3>
                  <p className="text-sm text-gold-dark">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
