/**
 * Instrument marks for the standards on /about.
 *
 * Drawn by hand rather than pulled from an icon set so the stroke matches the
 * hairlines used everywhere else (the section rules, the annotation leaders,
 * the depth gutter). Rules for anything added here:
 *   · 24×24 viewBox, stroke-only, 1.25 weight, round caps and joins.
 *   · Draw the instrument, not the metaphor — a caliper, not a "quality" tick.
 *   · No enclosing shape; the heading beside each one carries the meaning, so
 *     they're hidden from assistive tech.
 */

type IconProps = { className?: string };

function Svg({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Mapped before we begin — a scale over a measured span. */
export function Caliper(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 5.5h19" />
      <path d="M7 5.5v3M12 5.5v4.5M17 5.5v3" />
      <path d="M7 15h10" />
      <path d="M7 12.8v4.4M17 12.8v4.4" />
    </Svg>
  );
}

/** Medical-grade devices — light, at a wavelength. */
export function Waveform(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 12c1.6-5 3.2-5 4.8 0s3.2 5 4.8 0 3.2-5 4.8 0 3.2 5 4.8 0" />
    </Svg>
  );
}

/** Priced by the unit — a graduated vial, marked so you can read the dose. */
export function Vial(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.4 2.8h5.2" />
      <path d="M10.6 2.8v3.6a2 2 0 0 1-.42 1.23L8.7 9.55a3 3 0 0 0-.62 1.83v7.42a2 2 0 0 0 2 2h3.84a2 2 0 0 0 2-2v-7.42a3 3 0 0 0-.62-1.83l-1.48-1.92a2 2 0 0 1-.42-1.23V2.8" />
      <path d="M8.08 13.2h2.1M8.08 16.4h2.1" />
    </Svg>
  );
}

/** Licensed providers only — a credential with a seal. */
export function Credential(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.4h16a1.5 1.5 0 0 1 1.5 1.5v10.2a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5V6.9A1.5 1.5 0 0 1 4 5.4z" />
      <circle cx="8.4" cy="12" r="2.5" />
      <path d="M13.6 10.2h5M13.6 13.8h3.4" />
    </Svg>
  );
}
