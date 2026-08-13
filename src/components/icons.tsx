/**
 * Hairline icons for the homepage value props.
 *
 * Drawn by hand rather than pulled from an icon set so the stroke weight
 * matches the gold hairlines used elsewhere (the ledger rules, the alcove
 * outline). Rules for anything added here:
 *   · 24×24 viewBox, stroke-only, 1.4 weight, round caps and joins.
 *   · No enclosing circle — these sit inside a circular chip already, and a
 *     ring inside a ring reads as a rendering bug.
 *   · Decorative: the heading next to each one carries the meaning, so they
 *     are hidden from assistive tech.
 */

type IconProps = { className?: string };

function Svg({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
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

/** Expert Providers — a laurel around a check: "board-certified", and a nod to
 *  the olive branches standing in the treatment rooms. */
export function LaurelCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.6 4.6C4 7.6 4 15.2 8 18.8" />
      <path d="M16.4 4.6C20 7.6 20 15.2 16 18.8" />
      <path d="M9 11.9l2.2 2.4 4.2-4.6" />
    </Svg>
  );
}

/** Medical-Grade Products — a serum bottle with a dropper cap. */
export function SerumBottle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 2.9h4v2.3h-4z" />
      <path d="M10.9 5.2v1.7M13.1 5.2v1.7" />
      <path d="M9.6 6.9h4.8a2 2 0 0 1 2 2v10.2a2 2 0 0 1-2 2H9.6a2 2 0 0 1-2-2V8.9a2 2 0 0 1 2-2z" />
      <path d="M7.6 13.6h8.8" />
    </Svg>
  );
}

/** Effortless Booking — a date with a check: reserved and confirmed. */
export function BookedDate(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 5.6h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2z" />
      <path d="M3.5 10.1h17" />
      <path d="M8.4 3.2v4.6M15.6 3.2v4.6" />
      <path d="M9 14.9l2.1 2.2 4-4.3" />
    </Svg>
  );
}

/** A Calming Space — the plaster archway, the same alcove the treatment
 *  photographs are masked into. The inner arch is load-bearing: a single dome
 *  on a groundline reads as a headstone, the opening makes it a doorway. */
export function Archway(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.2 20.4v-8.4a7.8 7.8 0 0 1 15.6 0v8.4" />
      <path d="M7.9 20.4v-8.1a4.1 4.1 0 0 1 8.2 0v8.1" />
      <path d="M2.4 20.4h19.2" />
    </Svg>
  );
}
