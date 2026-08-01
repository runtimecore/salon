import Link from "next/link";
import { site, fullAddress } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-serif text-2xl text-white">{site.name}</p>
          <p className="eyebrow mt-1 text-gold">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Where beauty meets care. Book your moment of self-renewal with us.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/membership" className="hover:text-white">Membership</Link></li>
            <li><Link href="/gift-cards" className="hover:text-white">Gift Cards</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">
            Visit
          </h4>
          <address className="mt-4 space-y-2 text-sm not-italic text-cream/80">
            <p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${fullAddress}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/20 decoration-1 underline-offset-4 transition-colors hover:text-white hover:decoration-gold"
              >
                {fullAddress}
              </a>
            </p>
            <p>
              <a
                href={site.phoneHref}
                className="underline decoration-white/20 decoration-1 underline-offset-4 transition-colors hover:text-white hover:decoration-gold"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-white/20 decoration-1 underline-offset-4 transition-colors hover:text-white hover:decoration-gold"
              >
                {site.email}
              </a>
            </p>
          </address>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">
            Hours
          </h4>
          <ul className="mt-4 space-y-1.5 text-sm text-cream/80">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-cream/60">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} Beauty Salon. All rights reserved.</p>
          <div className="flex gap-5">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            )}
            {site.social.tiktok && (
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
