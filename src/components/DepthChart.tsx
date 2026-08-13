import Link from "next/link";
import Reveal from "./Reveal";
import { stratumColor } from "./StratumTag";
import { treatmentsByStratum } from "@/lib/services";

/**
 * The depth chart: the menu re-cut as a core sample. Each band is a layer of
 * tissue, the gutter carries its working depth, and the chips are the
 * treatments that act there.
 *
 * This is the one place on the site where warm colour is allowed, because
 * here it means something — it's tissue, shading deeper as you go down.
 */
export default function DepthChart() {
  const rows = treatmentsByStratum();

  return (
    <Reveal>
      <div className="border-t border-mist">
        {rows.map((row, i) => (
          <div
            key={row.id}
            className="grid grid-cols-[3.5rem_1fr] gap-x-3 border-b border-mist sm:grid-cols-[7rem_1fr] sm:gap-x-6"
          >
            {/* Depth gutter — the ruler running down the side of the sample */}
            <div className="flex items-start justify-end py-7 sm:py-10">
              <span className="num text-[0.6875rem] leading-tight text-muted">
                {row.depth}
              </span>
            </div>

            {/* Band */}
            <div className="relative py-7 pl-4 pr-1 sm:py-10 sm:pl-8">
              <span
                aria-hidden
                className="strat"
                style={{
                  background: `linear-gradient(90deg, ${stratumColor[row.id]} 0%, ${stratumColor[row.id]} 8%, transparent 46%)`,
                  transitionDelay: `${i * 90}ms`,
                }}
              />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[7px]"
                style={{ background: stratumColor[row.id] }}
              />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-12">
                <div className="md:w-[40%] md:shrink-0">
                  <h3 className="text-2xl sm:text-[1.7rem]">{row.name}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
                    {row.note}
                  </p>
                </div>

                <ul className="flex flex-wrap content-start gap-2 md:flex-1 md:pt-1.5">
                  {row.services.map((service) => (
                    <li key={service.name}>
                      <Link
                        href={`/services#${service.categorySlug}`}
                        className="inline-block rounded-[2px] border border-ink/15 bg-clinic/70 px-3 py-1.5 text-[0.8125rem] text-slate transition-colors hover:border-jade hover:bg-clinic hover:text-jade"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
