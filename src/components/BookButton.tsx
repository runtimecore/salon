"use client";

import { site } from "@/lib/site";

type Props = {
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  size?: "md" | "sm";
  className?: string;
  /**
   * Overrides the destination — pass a service's own Fresha link (see
   * `bookingUrlFor` in lib/services.ts) to open Fresha with that service
   * pre-selected. Omit for the salon's general booking page.
   */
  href?: string;
  /** Accessible label, e.g. "Book Gel Manicure" when the text just says "Book". */
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const sizes = {
  md: "px-7 py-3 text-sm",
  sm: "px-5 py-2 text-xs",
};

const variants = {
  solid: "bg-gold text-white hover:bg-gold-dark",
  outline: "border border-gold text-espresso hover:bg-gold hover:text-white",
  light: "bg-white/90 text-espresso hover:bg-white",
};

/**
 * The single call-to-action used everywhere. Defaults to the salon's Fresha
 * booking page (set `bookingUrl` in lib/site.ts), or opens a specific service
 * when given an `href`. Until a link is set the button renders but does
 * nothing — no broken navigation or blank tab.
 */
export default function BookButton({
  children = "Book Now",
  variant = "solid",
  size = "md",
  className = "",
  href,
  ariaLabel,
}: Props) {
  const target = href ?? site.bookingUrl;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (!target) {
    return (
      <a
        href="#"
        aria-disabled="true"
        aria-label={ariaLabel}
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
      href={target}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {children}
    </a>
  );
}
