import BookButton from "./BookButton";
import { stratumColor } from "./StratumTag";
import { bookingUrlFor, stratumById, type Service } from "@/lib/services";

/**
 * One line of the treatment menu. A ledger row rather than a card: on
 * /services the job is comparing sixteen treatments on depth, time, and
 * price, and rows compare where cards don't.
 *
 * The tissue colour on the left edge is the same one the depth chart uses,
 * so the menu and the chart are visibly the same system.
 */
export default function ServiceCard({ service }: { service: Service }) {
  const stratum = service.layer ? stratumById(service.layer) : null;

  return (
    <div className="group relative border-b border-mist transition-colors hover:bg-surface-raised">
      {service.layer && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{ background: stratumColor[service.layer] }}
        />
      )}

      <div className="grid gap-x-8 gap-y-4 py-7 pl-5 pr-1 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[1.15rem]">{service.name}</h3>
            {service.popular && (
              <span className="label-sm text-jade">Most booked</span>
            )}
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
            {service.description}
          </p>
          {stratum && (
            <p className="num mt-3 text-[0.6875rem] text-muted">
              {stratum.name} · {stratum.depth}
              {service.spec ? ` · ${service.spec}` : ""}
            </p>
          )}
        </div>

        <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-3">
          <div className="md:text-right">
            <p className="num text-[0.9375rem] text-ink">{service.price}</p>
            <p className="num mt-1 text-[0.6875rem] text-muted">
              {service.duration}
            </p>
          </div>
          <BookButton
            href={bookingUrlFor(service)}
            variant="outline"
            size="sm"
            ariaLabel={`Book ${service.name}`}
          >
            Book
          </BookButton>
        </div>
      </div>
    </div>
  );
}
