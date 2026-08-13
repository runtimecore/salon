import Image from "next/image";
import BookButton from "./BookButton";
import StratumTag from "./StratumTag";
import { bookingUrlFor, type FeaturedService } from "@/lib/services";

/**
 * The homepage treatment card. A photograph tagged with the layer it treats,
 * then the three things a client actually decides on: what it is, how long it
 * takes, what it costs.
 *
 * Deliberately not the same component as `ServiceCard` (used on /services,
 * where the full menu is a ledger). No "Popular" badge here — every treatment
 * in this section is popular, so the badge would label nothing.
 *
 * Services without an `image` still render: the frame fills with sage, so the
 * grid never breaks while photography is being swapped in.
 */
export default function SignatureServiceCard({
  service,
}: {
  service: FeaturedService;
}) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-sage">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.imageAlt ?? service.name}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div aria-hidden className="h-full w-full" />
        )}

        {service.layer && (
          <div className="absolute bottom-0 left-0">
            <StratumTag layer={service.layer} />
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <p className="label text-jade">{service.category}</p>
        <h3 className="mt-2.5 text-[1.35rem]">{service.name}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate">
          {service.description}
        </p>

        {/* Ledger: what it takes on the left, what it costs on the right */}
        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-mist pt-3">
          <span className="num text-[0.6875rem] text-muted">
            {service.duration}
            {service.spec ? ` · ${service.spec}` : ""}
          </span>
          <span className="num text-[0.9375rem] text-ink">{service.price}</span>
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
