import Image from "next/image";
import BookButton from "./BookButton";
import { bookingUrlFor, type FeaturedService } from "@/lib/services";

/**
 * The homepage treatment card: a photo in an arched alcove, then the name and
 * a ledger line giving the two things a client actually decides on — how long
 * it takes and what it costs.
 *
 * Deliberately not the same card as `ServiceCard` (used on /services, where
 * the full menu is a dense text list). No "Popular" badge here: every service
 * in this section is popular, so the badge would label nothing.
 *
 * Services without a `image` still render — the arch fills with linen — so the
 * grid never breaks while photography is being swapped in.
 */
export default function SignatureServiceCard({
  service,
}: {
  service: FeaturedService;
}) {
  return (
    <article className="group flex h-full flex-col">
      {/* Arched alcove */}
      <div className="relative">
        <div
          aria-hidden
          className="alcove-outline arch pointer-events-none absolute inset-0 border border-gold/30"
        />
        <div className="arch relative aspect-[4/5] overflow-hidden bg-linen ring-1 ring-espresso/5">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.imageAlt ?? service.name}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              className="alcove-photo object-cover"
            />
          ) : (
            <div className="flex h-full items-end justify-center pb-10 text-2xl text-gold/50">
              ✦
            </div>
          )}
        </div>
      </div>

      {/* Label */}
      <div className="mt-7 flex flex-1 flex-col">
        <p className="eyebrow text-[0.62rem] text-gold-dark">{service.category}</p>
        <h3 className="mt-2 text-2xl leading-snug text-ink">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {service.description}
        </p>

        {/* Ledger: time on the left, cost on the right */}
        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-sand pt-3">
          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
            {service.duration}
          </span>
          <span className="font-serif text-lg text-gold-dark">{service.price}</span>
        </div>

        <BookButton
          href={bookingUrlFor(service)}
          variant="outline"
          size="sm"
          className="mt-5 self-start"
          ariaLabel={`Book ${service.name}`}
        >
          Book
        </BookButton>
      </div>
    </article>
  );
}
