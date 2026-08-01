import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the team behind ${site.name} — a modern beauty salon built on care, craft, and a warm welcome.`,
};

// TODO: replace with real stylists and photos.
const team = [
  { name: "Elena Marchetti", role: "Founder & Master Stylist" },
  { name: "Priya Nair", role: "Color Specialist" },
  { name: "Jordan Kim", role: "Skin & Facials Expert" },
  { name: "Camila Torres", role: "Nail Artist" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Care is our craft"
        subtitle={`${site.name} was founded on a simple belief: everyone deserves to feel beautiful and cared for. Here's who we are.`}
      />

      {/* Story */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-sand via-blush/60 to-gold/30">
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-xl text-espresso/50">
                Salon interior photo
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl text-ink">A warm, modern escape</h2>
            <p className="mt-4 leading-relaxed text-espresso/80">
              From the moment you step through our doors, {site.name} is designed
              to feel like a retreat from the everyday. Our stylists blend
              technical mastery with genuine attention, so every visit leaves you
              looking — and feeling — your best.
            </p>
            <p className="mt-4 leading-relaxed text-espresso/80">
              We invest in ongoing training and premium, skin-kind products,
              because your hair, skin, and time deserve nothing less. Whether
              it&apos;s a quick refresh or a full transformation, we&apos;re here
              for it.
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
          <div className="text-center">
            <p className="eyebrow text-gold-dark">The Team</p>
            <h2 className="mt-2 text-3xl text-ink">Meet your stylists</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-blush/70 to-sand">
                  <div className="flex h-full items-center justify-center text-espresso/40">
                    Photo
                  </div>
                </div>
                <h3 className="mt-4 text-lg text-ink">{member.name}</h3>
                <p className="text-sm text-gold-dark">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
