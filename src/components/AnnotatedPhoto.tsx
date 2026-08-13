import Image from "next/image";

/**
 * A plate is one annotation: a dot pinned to a point in the photograph, a
 * hairline leader, and a chip stating what is happening there.
 *
 * `x` / `y` are percentages of the photo, measured to the dot. Place them in
 * genuinely empty parts of the frame — a plate that lands on a face reads as
 * a mistake. `side` says which way the chip extends from the dot.
 */
export type Plate = {
  x: number;
  y: number;
  side: "left" | "right";
  /** Mono kicker, e.g. "LAYER". */
  label: string;
  /** The measurement itself, e.g. "Surface · 0 mm". */
  value: string;
  /** Stagger, in ms, within the hero's load sequence. */
  delay?: number;
};

type Props = {
  src: string;
  alt: string;
  plates?: Plate[];
  /** CSS aspect ratio for the frame, e.g. "4/5". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * The site's signature: clinical photography annotated the way a technical
 * plate is. Everything the annotation says is a real property of the
 * treatment being shown — depth, duration, wavelength — never a mood word.
 */
export default function AnnotatedPhoto({
  src,
  alt,
  plates = [],
  ratio = "4/5",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  className = "",
}: Props) {
  return (
    <figure className={`relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-[2px] bg-sage"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />

        {plates.map((plate) => (
          <div
            key={`${plate.label}-${plate.x}-${plate.y}`}
            className="enter-fade absolute flex items-center"
            style={{
              left: `${plate.x}%`,
              top: `${plate.y}%`,
              transform:
                plate.side === "left"
                  ? "translate(-100%, -50%)"
                  : "translateY(-50%)",
              animationDelay: `${plate.delay ?? 700}ms`,
            }}
          >
            {plate.side === "left" && <Chip {...plate} />}
            <span
              className={`leader leader-${plate.side === "left" ? "left" : "right"} h-px w-6 bg-ink/50 sm:w-10`}
              style={{ animationDelay: `${(plate.delay ?? 700) + 120}ms` }}
              aria-hidden
            />
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full border border-clinic bg-ink"
              aria-hidden
            />
            {plate.side === "right" && <Chip {...plate} />}
          </div>
        ))}
      </div>
    </figure>
  );
}

function Chip({ label, value }: Pick<Plate, "label" | "value">) {
  return (
    <span className="whitespace-nowrap rounded-[2px] bg-ink/92 px-2.5 py-1.5 backdrop-blur-sm">
      <span className="label-sm block text-mint">{label}</span>
      <span className="num mt-0.5 block text-[0.6875rem] text-clinic">
        {value}
      </span>
    </span>
  );
}
