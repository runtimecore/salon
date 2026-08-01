"use client";

import { site } from "@/lib/site";

type Props = {
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants = {
  solid: "bg-gold text-white hover:bg-gold-dark",
  outline: "border border-gold text-espresso hover:bg-gold hover:text-white",
  light: "bg-white/90 text-espresso hover:bg-white",
};

/**
 * The single call-to-action used everywhere. Links to the salon's Fresha
 * booking page (set `bookingUrl` in lib/site.ts). Until that link is set the
 * button renders but does nothing — no broken navigation or blank tab.
 */
export default function BookButton({
  children = "Book Now",
  variant = "solid",
  className = "",
}: Props) {
  const ready = Boolean(site.bookingUrl);
  const classes = `${base} ${variants[variant]} ${className}`;

  if (!ready) {
    return (
      <a
        href="#"
        aria-disabled="true"
        title="Online booking coming soon"
        onClick={(e) => e.preventDefault()}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {children}
    </a>
  );
}
