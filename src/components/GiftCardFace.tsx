import { stratumColor } from "./StratumTag";
import { strata } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * The gift card as an object: a petrol slab with the core sample down one
 * edge. It's the only place the stratum ramp appears without labels, because
 * by the time someone reaches it they've already been given the key.
 */
export default function GiftCardFace({ className = "" }: { className?: string }) {
  return (
    <div
      className={`on-dark relative flex aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-petrol text-clinic ${className}`}
    >
      <div aria-hidden className="flex w-2 shrink-0 flex-col sm:w-2.5">
        {strata.map((stratum) => (
          <span
            key={stratum.id}
            className="flex-1"
            style={{ background: stratumColor[stratum.id] }}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p
            className="display -mr-[0.3em] text-lg uppercase leading-none"
            style={{
              fontVariationSettings: '"wdth" 120',
              letterSpacing: "0.3em",
            }}
          >
            {site.name}
          </p>
          <span className="label-sm text-mint">Gift card</span>
        </div>
        <div>
          <p className="num text-[0.6875rem] text-clinic/60">
            Any amount · never expires
          </p>
          <p className="mt-2 text-2xl text-clinic sm:text-[1.75rem]">
            Their choice of layer
          </p>
        </div>
      </div>
    </div>
  );
}
