import { stratumById, type StratumId } from "@/lib/services";

/**
 * How a tissue stratum is *shown*, in one place — the data itself lives in
 * lib/services.ts. Keyed by id rather than by index so pulling a whole layer
 * off the menu doesn't slide every colour up one.
 */
export const stratumColor: Record<StratumId, string> = {
  surface: "var(--color-strat-1)",
  epidermis: "var(--color-strat-2)",
  dermis: "var(--color-strat-3)",
  subcutis: "var(--color-strat-4)",
  muscle: "var(--color-strat-5)",
  systemic: "var(--color-strat-6)",
};

/**
 * The depth tag that sits on a treatment photo: a swatch of tissue colour,
 * the layer, and how deep it is. Same information as a band of the depth
 * chart, compressed to one line.
 */
export default function StratumTag({
  layer,
  tone = "dark",
}: {
  layer: StratumId;
  tone?: "dark" | "light";
}) {
  const stratum = stratumById(layer);

  return (
    <span
      className={`flex items-center gap-2 rounded-[2px] px-2.5 py-1.5 ${
        tone === "dark" ? "bg-ink/90 text-clinic" : "bg-clinic text-ink"
      }`}
    >
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-[1px]"
        style={{ background: stratumColor[layer] }}
      />
      <span className="label-sm">
        {stratum.name} · {stratum.depth}
      </span>
    </span>
  );
}
