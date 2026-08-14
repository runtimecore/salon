import BookButton from "./BookButton";
import OfferCountdown from "./OfferCountdown";
import {
  bookingUrlFor,
  formatOfferEnd,
  liveOfferFor,
  offerEndsAt,
  type Service,
} from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  // A running discount takes over the card: the badge corner, the price, and a
  // countdown. Someone reading the menu shouldn't have to find /special-offers
  // to learn this treatment is cheaper this week.
  const offer = liveOfferFor(service);

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        offer
          ? "border-rose/40 hover:border-rose hover:shadow-rose/10"
          : "border-sand hover:border-gold/60 hover:shadow-gold/5"
      }`}
    >
      {/* One badge only — the saving outranks "Popular" when both apply. */}
      {offer ? (
        <span className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-rose px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
          {offer.label}
        </span>
      ) : (
        service.popular && (
          <span className="absolute right-5 top-5 rounded-full bg-blush/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-rose">
            Popular
          </span>
        )
      )}

      <h3 className="pr-20 text-xl text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.description}
      </p>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-sand pt-4">
        <span className="text-xs uppercase tracking-wider text-muted">
          {service.duration}
        </span>
        {offer ? (
          <span className="flex items-baseline gap-2">
            <s className="text-sm text-muted/80 decoration-rose/70">{service.price}</s>
            <span className="font-serif text-lg text-gold-dark">{offer.price}</span>
          </span>
        ) : (
          <span className="font-serif text-lg text-gold-dark">{service.price}</span>
        )}
      </div>

      {offer && (
        <div className="mt-3">
          <OfferCountdown
            endsAt={offerEndsAt(offer)}
            endsOnLabel={formatOfferEnd(offer)}
          />
        </div>
      )}

      <BookButton
        href={bookingUrlFor(service)}
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        ariaLabel={`Book ${service.name}`}
      >
        Book
      </BookButton>
    </div>
  );
}
