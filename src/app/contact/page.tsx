import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Visit ${site.name} at ${fullAddress}. Find our hours, phone, and directions.`,
};

const mapsQuery = encodeURIComponent(`${site.name} ${fullAddress}`);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Visit Aphrodite"
        subtitle="We'd love to welcome you. Find us, call us, or book online anytime."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="text-2xl text-ink">Salon details</h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                  Address
                </h3>
                <p className="mt-2 text-espresso/90">
                  {site.addressLine1}
                  {site.addressLine2 ? `, ${site.addressLine2}` : ""}
                  <br />
                  {site.city}, {site.region} {site.postalCode}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-gold-dark underline-offset-4 hover:underline"
                >
                  Get directions →
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                  Contact
                </h3>
                <p className="mt-2 text-espresso/90">
                  <a href={site.phoneHref} className="hover:text-gold-dark">{site.phone}</a>
                  <br />
                  <a href={`mailto:${site.email}`} className="hover:text-gold-dark">{site.email}</a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                  Hours
                </h3>
                <ul className="mt-2 space-y-1.5 text-espresso/90">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex max-w-xs justify-between gap-6">
                      <span>{h.day}</span>
                      <span className="text-muted">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <BookButton className="px-8 py-3.5 text-base">Book an Appointment</BookButton>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-3xl border border-sand shadow-sm">
            <iframe
              title={`Map to ${site.name}`}
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
