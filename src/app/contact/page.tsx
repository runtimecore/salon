import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Visit ${site.name} at ${fullAddress}. Hours, phone, directions, and online booking.`,
};

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";
const mapsQuery = encodeURIComponent(`${site.name} ${fullAddress}`);
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title={`Find ${site.name}`}
        subtitle="Call, email, or book online — whichever is quickest. If you're not sure what you need yet, book the consultation and ask us there."
      />

      <section className={`${shell} surface-bleed py-16 lg:py-20`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Details */}
          <Reveal>
            <div className="border-t border-mist">
              <Row label="Address">
                <p className="text-ink">
                  {site.addressLine1}
                  {site.addressLine2 ? `, ${site.addressLine2}` : ""}
                  <br />
                  {site.city}, {site.region} {site.postalCode}
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label group mt-3 inline-flex items-center gap-3 text-ink"
                >
                  Get directions
                  <span
                    aria-hidden
                    className="h-px w-6 bg-ink transition-all duration-300 group-hover:w-10 group-hover:bg-jade"
                  />
                </a>
              </Row>

              <Row label="Contact">
                <p>
                  <a
                    href={site.phoneHref}
                    className="num text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-jade hover:decoration-jade"
                  >
                    {site.phone}
                  </a>
                </p>
                <p className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-jade hover:decoration-jade"
                  >
                    {site.email}
                  </a>
                </p>
              </Row>

              <Row label="Hours">
                <ul className="max-w-xs">
                  {site.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between gap-6 border-b border-mist py-2 last:border-0"
                    >
                      <span className="text-ink">{h.day}</span>
                      <span className="num text-[0.75rem] text-muted">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </Row>

              <Row label="Booking">
                <p className="max-w-sm text-sm leading-relaxed text-slate">
                  Online booking runs through Fresha and confirms instantly.
                  Consultations are free and take about twenty minutes.
                </p>
                <div className="mt-5">
                  <BookButton>Book an appointment</BookButton>
                </div>
              </Row>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={80}>
            <div className="h-full overflow-hidden rounded-[2px] border border-mist">
              <iframe
                title={`Map to ${site.name}`}
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                className="h-full min-h-[460px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** One labelled block of the contact ledger: mono label left, content right. */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b border-mist py-7 sm:grid-cols-[7rem_1fr] sm:gap-8">
      <h2 className="label pt-1 text-muted">{label}</h2>
      <div className="text-[0.9375rem] leading-relaxed text-slate">
        {children}
      </div>
    </div>
  );
}
