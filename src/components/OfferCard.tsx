import Link from "next/link";
import BookButton from "./BookButton";
import { stratumColor } from "./StratumTag";
import {
  bookingUrlFor,
  stratumById,
  type OfferedService,
} from "@/lib/services";

/**
 * One discounted treatment. Same information as its row on the menu — layer,
 * depth, spec — with the list price struck through beside the offer price.
 *
 * **Nothing here is a clock.** No countdown, no closing date, not even the
 * treatment's duration: an offer card states a price and what's saved, and
 * that's the whole promise. What pressure there is comes from the size of the
 * saving and, where there's a real cap, from how many are left — facts that
 * stay true however long the page sits open.
 *
 * `featured` is the first offer in the catalogue, and it gets the deep panel.
 */
export default function OfferCard({
  service,
  featured = false,
}: {
  service: OfferedService;
  featured?: boolean;
}) {
  const { offer } = service;
  const stratum = service.layer ? stratumById(service.layer) : null;

  const heading = featured ? "text-clinic" : "text-ink";
  const body = featured ? "text-clinic/70" : "text-slate";
  const meta = featured ? "text-clinic/55" : "text-muted";
  const accent = featured ? "text-mint" : "text-jade";
  const rule = featured ? "border-clinic/20" : "border-mist";
  // Written out in full rather than interpolated: Tailwind scans source text,
  // so `hover:${accent}` would compile to nothing.
  const categoryLink = featured
    ? "text-clinic/55 transition-colors hover:text-mint"
    : "text-muted transition-colors hover:text-jade";

  return (
    <article
      className={`relative flex h-full flex-col border-b p-8 lg:p-10 ${rule} ${
        featured ? "on-dark bg-surface-deep" : ""
      }`}
    >
      {/* The tissue rail from the menu row, so an offer is visibly the same
          treatment and not a separate product. */}
      {service.layer && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{ background: stratumColor[service.layer] }}
        />
      )}

      <div
        className={
          featured
            ? "grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
            : "flex flex-1 flex-col"
        }
      >
        {/* What it is */}
        <div className={featured ? "" : "flex-1"}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className={`label flex items-center gap-3 ${accent}`}>
              <span
                aria-hidden
                className={`h-px w-6 ${featured ? "bg-mint" : "bg-jade"}`}
              />
              {offer.label}
            </p>
            <Link
              href={`/services#${service.categorySlug}`}
              className={`label-sm ${categoryLink}`}
            >
              {service.category}
            </Link>
          </div>

          <h3
            className={`mt-5 ${heading} ${
              featured ? "text-[clamp(1.75rem,3.4vw,2.5rem)]" : "text-[1.375rem]"
            }`}
          >
            {service.name}
          </h3>

          {stratum && (
            <p className={`num mt-3 text-[0.6875rem] ${meta}`}>
              {stratum.name} · {stratum.depth}
              {service.spec ? ` · ${service.spec}` : ""}
            </p>
          )}

          <p className={`mt-4 max-w-md text-sm leading-relaxed ${body}`}>
            {service.description}
          </p>
        </div>

        {/* What it costs, and what that saves */}
        <div className={featured ? "flex flex-col gap-8" : "mt-8"}>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className={`num text-[2rem] leading-none ${heading}`}>
                {offer.price}
              </span>
              <span className={`num text-[0.9375rem] line-through ${meta}`}>
                {service.price}
              </span>
            </div>
            <span
              className={`label-sm mt-4 inline-block rounded-[2px] border px-2.5 py-1.5 ${
                featured ? "border-mint/40 text-mint" : "border-jade/40 text-jade"
              }`}
            >
              {offer.saving}
            </span>
          </div>

          {offer.spots && (
            <div className={featured ? "" : "mt-7"}>
              <p className={`label ${accent}`}>
                {offer.spots.left} of {offer.spots.total} left
              </p>
              <div
                aria-hidden
                className={`mt-2.5 h-[3px] w-full ${
                  featured ? "bg-clinic/20" : "bg-mist"
                }`}
              >
                <div
                  className={`h-[3px] ${featured ? "bg-mint" : "bg-jade"}`}
                  style={{
                    width: `${Math.min(100, (offer.spots.left / offer.spots.total) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className={featured ? "" : "mt-8"}>
            <BookButton
              href={bookingUrlFor(service)}
              variant={featured ? "light" : "solid"}
              ariaLabel={`Book ${service.name} at the offer price`}
              className="w-full sm:w-auto"
            >
              Claim this price
            </BookButton>
            {offer.terms && (
              <p className={`mt-4 max-w-sm text-xs leading-relaxed ${meta}`}>
                {offer.terms}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
