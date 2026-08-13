"use client";

import { site } from "@/lib/site";

type Props = {
  children?: React.ReactNode;
  /** `light` and `ghost` are the two dark-ground variants — filled and outline. */
  variant?: "solid" | "outline" | "light" | "ghost";
  size?: "md" | "sm";
  className?: string;
  /**
   * Overrides the destination — pass a service's own Fresha link (see
   * `bookingUrlFor` in lib/services.ts) to open Fresha with that service
   * pre-selected. Omit for the spa's general booking page.
   */
  href?: string;
  /** Accessible label, e.g. "Book HydraFacial" when the text just says "Book". */
  ariaLabel?: string;
};

/* Square corners, mono label. A booking button here should look like the
   control on a piece of equipment, not a pill on a landing page. */
const base =
  "label inline-flex items-center justify-center rounded-[2px] transition-colors duration-200";

const sizes = {
  md: "px-7 py-4 text-[0.6875rem]",
  sm: "px-4 py-2.5 text-[0.5625rem]",
};

const variants = {
  solid: "bg-ink text-clinic hover:bg-jade",
  outline: "border border-ink/25 text-ink hover:border-jade hover:text-jade",
  light: "bg-clinic text-ink hover:bg-mint",
  ghost: "border border-clinic/35 text-clinic hover:border-mint hover:text-mint",
};

/**
 * The single call-to-action used everywhere. Defaults to the spa's Fresha
 * booking page (set `bookingUrl` in lib/site.ts), or opens a specific service
 * when given an `href`. Until a link is set the button renders identically but
 * does nothing — the page never shows a broken CTA while Fresha is pending.
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
        className={`${classes} cursor-default`}
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
