"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import BookButton from "./BookButton";

const navLinks = [
  { href: "/services", label: "Services" },
  // Flagged rather than styled loud: jade is the site's action colour, so an
  // item that costs less than the menu says gets the action colour and nothing
  // more — no badge, no colour from outside the palette.
  { href: "/offers", label: "Special Offers", flag: true },
  { href: "/membership", label: "Membership" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // This is the one backdrop-blur on the site, and it's load-bearing: the bar
  // is translucent so the shader background reads through it, which also means
  // content scrolls underneath it. The blur is what stops that content from
  // being legible through the bar. Everywhere else, translucency is plain alpha
  // over the single scrim in SiteBackground — far cheaper per frame.
  return (
    <header className="sticky top-0 z-50 border-b border-mist bg-surface backdrop-blur-md">
      <nav className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-6 py-5 lg:px-12">
        {/* Masthead: wordmark, hairline, then the two facts that place it */}
        <Link
          href="/"
          className="flex items-center gap-4"
          onClick={() => setOpen(false)}
        >
          <span
            className="display -mr-[0.34em] text-[1.35rem] uppercase leading-none text-ink"
            style={{ fontVariationSettings: '"wdth" 120', letterSpacing: "0.34em" }}
          >
            {site.name}
          </span>
          <span className="hidden h-7 w-px bg-mist sm:block" />
          <span className="hidden sm:block">
            <span className="label-sm block text-jade">{site.tagline}</span>
            <span className="label-sm block text-muted">{site.city}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`label relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-jade after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 ${
                link.flag ? "text-jade" : "text-slate"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <BookButton size="sm" className="ml-1">
            Book
          </BookButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-[5px]">
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-mist bg-surface px-6 py-6 backdrop-blur-md lg:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`label border-b border-mist py-4 ${
                  link.flag ? "text-jade" : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <BookButton className="mt-6 w-full">Book an appointment</BookButton>
          </div>
        </div>
      )}
    </header>
  );
}
