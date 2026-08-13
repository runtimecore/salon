import Link from "next/link";
import { site, fullAddress } from "@/lib/site";
import { strata } from "@/lib/services";

const linkStyle =
  "text-clinic/75 underline decoration-clinic/20 decoration-1 underline-offset-4 transition-colors hover:text-clinic hover:decoration-mint";

const stratumColors = [
  "var(--color-strat-1)",
  "var(--color-strat-2)",
  "var(--color-strat-3)",
  "var(--color-strat-4)",
  "var(--color-strat-5)",
  "var(--color-strat-6)",
];

export default function Footer() {
  return (
    <footer className="on-dark bg-petrol text-clinic">
      {/* The core sample, one last time — the site's spine closing the page */}
      <div aria-hidden className="flex h-1 w-full">
        {strata.map((stratum, i) => (
          <span
            key={stratum.id}
            className="flex-1"
            style={{ background: stratumColors[i % stratumColors.length] }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-[84rem] px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-3 border-b border-clinic/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="display -mr-[0.3em] text-3xl uppercase leading-none sm:text-4xl"
              style={{ fontVariationSettings: '"wdth" 120', letterSpacing: "0.3em" }}
            >
              {site.name}
            </p>
            <p className="label mt-4 text-mint">
              {site.tagline} · {site.city}, {site.region}
            </p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-clinic/70">
            Licensed providers, medical-grade equipment, and a price you see
            before anything begins.
          </p>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Visit */}
          <div>
            <h2 className="label text-mint">Visit</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-clinic/75">
              <p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${fullAddress}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  {fullAddress}
                </a>
              </p>
              <p>
                <a href={site.phoneHref} className={linkStyle}>
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className={linkStyle}>
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h2 className="label text-mint">Hours</h2>
            <ul className="mt-5 space-y-2 text-sm">
              {site.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex justify-between gap-4 border-b border-clinic/10 pb-2 last:border-0"
                >
                  <span className="text-clinic/75">{h.day}</span>
                  <span className="num text-[0.75rem] text-clinic/55">
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h2 className="label text-mint">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                { href: "/services", label: "Services & pricing" },
                { href: "/membership", label: "Membership" },
                { href: "/gift-cards", label: "Gift cards" },
                { href: "/about", label: "About the clinic" },
                { href: "/contact", label: "Contact & location" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-clinic/75 transition-colors hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-clinic/15">
        <div className="mx-auto flex max-w-[84rem] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-12">
          <p className="label-sm text-clinic/50">
            © {new Date().getFullYear()} {site.name} {site.tagline}
          </p>
          <div className="flex gap-6">
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm text-clinic/50 transition-colors hover:text-mint"
              >
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm text-clinic/50 transition-colors hover:text-mint"
              >
                Facebook
              </a>
            )}
            {site.social.tiktok && (
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm text-clinic/50 transition-colors hover:text-mint"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
