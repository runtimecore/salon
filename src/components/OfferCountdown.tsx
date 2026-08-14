"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Timestamp the offer expires — `offerEndsAt(offer)` from lib/services. */
  endsAt: number;
  /**
   * Shown before the clock starts and if JavaScript never runs, e.g. "Aug 31"
   * from `formatOfferEnd`. Rendered identically on the server and on the first
   * client paint, so hydration always matches.
   */
  endsOnLabel: string;
  variant?: "inline" | "boxed";
  className?: string;
};

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

/** Hours left below which the countdown turns urgent (rose, and it says so). */
const URGENT_HOURS = 72;

function remainingFrom(ms: number): Remaining {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A live countdown to an offer's deadline — the "hurry" cue on /special-offers.
 *
 * Deliberately does *not* tick during server rendering: the first paint shows
 * the plain end date, then the clock takes over once mounted. That keeps the
 * markup identical on both sides of hydration (a ticking value can't be), and
 * leaves something honest and readable for anyone without JavaScript.
 *
 * Under 72 hours it shifts to rose and calls itself out, so a deadline that is
 * genuinely close looks different from one three weeks out.
 */
export default function OfferCountdown({
  endsAt,
  endsOnLabel,
  variant = "inline",
  className = "",
}: Props) {
  const [left, setLeft] = useState<Remaining | null>(null);
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const tick = () => {
      const ms = endsAt - Date.now();
      setLeft(remainingFrom(ms));
      setUrgent(ms <= URGENT_HOURS * 3600 * 1000);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const units: [string, number][] = left
    ? [
        ["Days", left.days],
        ["Hrs", left.hours],
        ["Min", left.minutes],
        ["Sec", left.seconds],
      ]
    : [];

  if (variant === "boxed") {
    return (
      <div className={`flex gap-2.5 sm:gap-3 ${className}`}>
        {left ? (
          units.map(([label, value]) => (
            <div
              key={label}
              className="min-w-[3.75rem] rounded-xl border border-white/15 bg-white/10 px-2 py-2.5 text-center backdrop-blur-sm sm:min-w-[4.25rem]"
            >
              <span className="block font-serif text-2xl leading-none text-white tabular-nums sm:text-3xl">
                {pad(value)}
              </span>
              <span className="mt-1.5 block text-[0.6rem] uppercase tracking-[0.18em] text-cream/60">
                {label}
              </span>
            </div>
          ))
        ) : (
          <span className="font-serif text-2xl text-white sm:text-3xl">
            Ends {endsOnLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold tabular-nums ${
        urgent ? "text-rose" : "text-espresso/70"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full bg-rose ${urgent ? "pulse-dot" : ""}`}
      />
      {left ? (
        <>
          {urgent ? "Hurry — ends in" : "Ends in"}{" "}
          {left.days > 0 && `${left.days}d `}
          {pad(left.hours)}h {pad(left.minutes)}m {pad(left.seconds)}s
        </>
      ) : (
        <>Ends {endsOnLabel}</>
      )}
    </span>
  );
}
