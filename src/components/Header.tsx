"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import BookButton from "./BookButton";

const navLinks = [
  // `highlight` marks the promo link — it gets a gold dot so the eye lands on
  // it first without the nav turning into a billboard.
  { href: "/special-offers", label: "Special Offers", highlight: true },
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // The bar is opaque on purpose. A translucent + backdrop-blurred sticky
  // header makes the compositor re-blur the strip of page behind it on every
  // scroll frame, which is what made scrolling feel stiff. Cream on cream
  // reads the same and costs nothing.
  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-cream">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl tracking-wide text-ink">
            {site.name}
          </span>
          <span className="eyebrow text-gold-dark">{site.tagline}</span>
        </Link>

        {/* Desktop nav. Six links plus the CTA no longer fit at the md
            breakpoint, so the full bar starts at lg and the burger covers
            everything below it. */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-dark ${
                link.highlight
                  ? "inline-flex items-center gap-1.5 text-gold-dark"
                  : "text-espresso"
              }`}
            >
              {link.highlight && (
                <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
              )}
              {link.label}
            </Link>
          ))}
          <BookButton className="px-6 py-2.5">Book Now</BookButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-espresso lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-espresso transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-espresso transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-espresso transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand/70 bg-cream px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium ${
                  link.highlight
                    ? "inline-flex items-center gap-2 text-gold-dark"
                    : "text-espresso"
                }`}
              >
                {link.highlight && (
                  <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
                )}
                {link.label}
              </Link>
            ))}
            <BookButton className="mt-2 w-full">Book Now</BookButton>
          </div>
        </div>
      )}
    </header>
  );
}
