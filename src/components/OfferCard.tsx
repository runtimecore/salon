import BookButton from "./BookButton";
import { bookingUrlFor, type OfferedService } from "@/lib/services";

/**
 * A discounted treatment on /special-offers.
 *
 * The difference from `ServiceCard` is all pressure: a rose corner ribbon with
 * the saving and the old price struck through beside the new one. Everything
 * else — the type, the ledger line, the
 * per-service Fresha link — is the same treatment shown on the menu, because
 * it *is* the same treatment; only the pricing treatment is new.
 */
export default function OfferCard({ service }: { service: OfferedService }) {
  const { offer } = service;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rose/40 bg-white/80 p-6 pt-7 transition-all duration-200 hover:-translate-y-1 hover:border-rose hover:shadow-lg hover:shadow-rose/10">
      {/* Corner ribbon — the saving, before anything else */}
      <span className="absolute right-0 top-0 rounded-bl-2xl bg-rose px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
        {offer.label}
      </span>

      <p className="eyebrow text-[0.62rem] text-gold-dark">
        {service.category}
      </p>
      <h3 className="mt-2 pr-20 text-xl leading-snug text-ink">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.description}
      </p>

      {/* Ledger: time on the left, was/now on the right */}
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-sand pt-4">
        <span className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          {service.duration}
        </span>
        <span className="flex items-baseline gap-2">
          <s className="text-sm text-muted/80 decoration-rose/70">
            {service.price}
          </s>
          <span className="font-serif text-xl text-gold-dark">
            {offer.price}
          </span>
        </span>
      </div>

      {offer.terms && (
        <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
          {offer.terms}
        </p>
      )}

      <BookButton
        href={bookingUrlFor(service)}
        size="sm"
        className="mt-4 w-full"
        ariaLabel={`Book ${service.name} at the offer price of ${offer.price}`}
      >
        Claim this offer
      </BookButton>
    </article>
  );
}
