import { site } from "./site";

/**
 * ── Tissue strata ─────────────────────────────────────────────────────
 * The organising idea of the whole site: every treatment on the menu does
 * its work at a particular depth, and we say which. The depth chart, the
 * hero legend, and every service card read from this list, so the order
 * here is the order shown everywhere (shallowest first).
 *
 * ⚠ BEFORE LAUNCH: have the medical director confirm every `depth` below
 * and every `spec` on the services. These are typical published ranges,
 * not claims about a specific patient — but they are on a live medical
 * page, so they need a clinician's sign-off.
 */
export type StratumId =
  | "surface"
  | "epidermis"
  | "dermis"
  | "subcutis"
  | "muscle"
  | "systemic";

export type Stratum = {
  id: StratumId;
  /** Shown as the band heading, e.g. "Dermis". */
  name: string;
  /** Typical working depth, set in mono beside the band. */
  depth: string;
  /** One sentence on what lives at this depth and why we go there. */
  note: string;
};

export const strata: Stratum[] = [
  {
    id: "surface",
    name: "Surface",
    depth: "0 mm",
    note: "Dead cells, oil, and congestion sitting on top of the skin. Cleared, not injured — you leave looking better the same hour.",
  },
  {
    id: "epidermis",
    name: "Epidermis",
    depth: "0.1 mm",
    note: "Where pigment gathers. Light and acids work here to break up sun damage and even out tone over a few weeks.",
  },
  {
    id: "dermis",
    name: "Dermis",
    depth: "1–2 mm",
    note: "Collagen, elastin, and follicles. Controlled injury here is what firms skin and thins hair for good.",
  },
  {
    id: "subcutis",
    name: "Subcutis",
    depth: "4–10 mm",
    note: "The fat layer that gives a face its shape and a body its contour. We add volume here, or take it away.",
  },
  {
    id: "muscle",
    name: "Muscle",
    depth: "3–6 mm",
    note: "The small muscles that fold skin into lines every time you frown. Rested, not frozen — expression stays.",
  },
  {
    id: "systemic",
    name: "Bloodstream",
    depth: "whole body",
    note: "Straight into circulation, bypassing the gut. For hydration, energy, and immune support rather than skin.",
  },
];

export const stratumById = (id: StratumId): Stratum =>
  strata.find((s) => s.id === id) ?? strata[0];

/**
 * ── Special offers ────────────────────────────────────────────────────
 * A discount hanging off a treatment that's already on the menu. There is
 * no separate "offers" catalogue: an offer is a price attached to a service,
 * so the promotion can never drift out of sync with the treatment it
 * discounts.
 *
 * **No dates, deliberately.** An offer carries no closing date and no
 * countdown — it runs for exactly as long as this field is here. Ending a
 * promotion means deleting the `offer` block (or commenting it out), and the
 * treatment goes straight back to its list price everywhere. Nothing on the
 * page can go stale on its own, because nothing on the page is a deadline.
 *
 * ⚠ Every field here is a claim a customer relies on. Write the real price
 * and — if you use `spots` — a real cap you intend to honour. Manufactured
 * scarcity is the one thing on this page that can cost the clinic more than
 * the discount.
 */
export type Offer = {
  /** Why the price is down, e.g. "Glow reset". The kicker on the card. Keep
   *  months and seasons out of it — the page carries no dates, and a label
   *  reading "August reset" in November undoes that. */
  label: string;
  /** The offer price, written like `price` ("$140", "from $195", "$10/unit"). */
  price: string;
  /** What's saved, in the clearest form for this offer: "Save $35", "20% off". */
  saving: string;
  /**
   * A genuine cap on how many are available, if there is one. Leave it out
   * for open-ended offers rather than inventing a number — see the warning
   * above. Update `left` as they go.
   */
  spots?: { left: number; total: number };
  /** One line of condition, shown small under the button. */
  terms?: string;
};

/**
 * Service catalog.
 * ── EDIT: swap in the salon's real services, prices, and durations. ──
 * Prices are display strings so you can use "from $X" where it helps.
 */
export type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
  popular?: boolean;
  /**
   * Which tissue stratum this treatment works in. Drives the depth chart,
   * the layer tag on every card, and the ordering on /services. A service
   * without one still renders — it just carries no depth tag.
   */
  layer?: StratumId;
  /**
   * The single most characteristic measurement of this treatment —
   * a wavelength, a needle depth, a temperature. Shown on the annotation
   * chip over the photo and beside the name on the menu. Keep it to one
   * short value; the depth is already carried by `layer`.
   */
  spec?: string;
  /**
   * Photo for the homepage "signature services" section, as a path into
   * `public/images` (e.g. "/images/service-botox.png"). Shoot or crop these
   * **portrait, 4:5**, and leave the bottom-left corner uncluttered — the
   * depth tag sits there. Omit it and the card still renders (a sage panel
   * stands in), so a service without a photo never breaks the grid.
   */
  image?: string;
  /** Alt text for `image`. Describe the treatment, not the mood. */
  imageAlt?: string;
  /**
   * Optional per-service Fresha link, so clicking "Book" on this service opens
   * Fresha with that service already selected.
   *
   * How to get it (Fresha does NOT support building these by hand — the URL is
   * opaque, so it has to be copied from the dashboard):
   *   1. Fresha dashboard → Online booking → Link builder
   *   2. Create link → "Link to services" → tick just this one service
   *   3. Create link → copy → paste it below.
   *
   * Leave empty and the button falls back to the general `site.bookingUrl`.
   */
  bookingUrl?: string;
  /**
   * A discount on this treatment. Drives the whole /offers page and the
   * struck-through price on the menu. Delete it and the treatment simply
   * sells at list price again.
   */
  offer?: Offer;
};

/**
 * The link a "Book" button for this service should open: its own Fresha link
 * when set, otherwise the salon's general booking link. Returns "" when
 * neither is configured — buttons then render inert instead of breaking.
 */
export function bookingUrlFor(service: Service): string {
  return service.bookingUrl || site.bookingUrl;
}

export type ServiceCategory = {
  slug: string;
  title: string;
  /** One-word version of `title`, used as the kicker on homepage cards. */
  short: string;
  blurb: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "injectables",
    title: "Injectables",
    short: "Injectables",
    blurb: "Botox and dermal filler for natural, refreshed results.",
    services: [
      {
        name: "Botox / Neurotoxin",
        description: "Smooths forehead lines, crow's feet, and frown lines.",
        duration: "15 min",
        price: "from $12/unit",
        popular: true,
        layer: "muscle",
        spec: "priced per unit",
        image: "/images/service-botox.png",
        imageAlt: "A provider marking injection points on a client's forehead",
        bookingUrl: "",
        offer: {
          label: "Unit price held",
          price: "$10/unit",
          saving: "Save $2/unit",
          terms:
            "Applies to the units used in a single visit. Minimum 20 units.",
        },
      },
      {
        name: "Lip Filler",
        description: "Hyaluronic acid filler for natural, balanced volume.",
        duration: "30 min",
        price: "from $650",
        popular: true,
        layer: "dermis",
        spec: "reversible",
        image: "/images/service-lip-filler.png",
        imageAlt: "A client's lips and jawline assessed before filler",
        bookingUrl: "",
      },
      {
        name: "Cheek & Midface Filler",
        description: "Restores contour and lift with dermal filler.",
        duration: "45 min",
        price: "from $750",
        layer: "subcutis",
        spec: "1 syringe",
        bookingUrl: "",
      },
    ],
  },
  {
    slug: "laser",
    title: "Laser & Skin Resurfacing",
    short: "Laser",
    blurb: "Advanced laser treatments for smoother, clearer skin.",
    services: [
      {
        name: "Laser Hair Removal (Small Area)",
        description: "Fast, precise reduction for areas like lip or underarms.",
        duration: "15 min",
        price: "from $75",
        layer: "dermis",
        spec: "755–1064 nm",
        bookingUrl: "",
      },
      {
        name: "Laser Hair Removal (Large Area)",
        description: "Long-lasting smoothness for legs, back, or full arms.",
        duration: "45 min",
        price: "from $200",
        layer: "dermis",
        spec: "755–1064 nm",
        bookingUrl: "",
        offer: {
          label: "Course of six",
          price: "from $150",
          saving: "Save $300 over the course",
          terms:
            "Per-session price when all six are booked together. Hair grows in cycles; six is what it takes.",
        },
      },
      {
        name: "Photofacial (IPL)",
        description: "Targets sun damage, redness, and uneven tone.",
        duration: "30 min",
        price: "from $250",
        popular: true,
        layer: "epidermis",
        spec: "500–1200 nm",
        image: "/images/service-photofacial.png",
        imageAlt:
          "A client in protective eyewear receiving an IPL photofacial",
        bookingUrl: "",
        offer: {
          label: "Pigment clinic",
          price: "from $195",
          saving: "22% off",
          terms:
            "Best booked once UV exposure drops — your provider will say if now isn't the moment.",
        },
      },
      {
        name: "Microneedling with RF",
        description: "Radiofrequency microneedling to firm and resurface skin.",
        duration: "60 min",
        price: "from $350",
        layer: "dermis",
        spec: "0.5–3.5 mm",
        bookingUrl: "",
      },
    ],
  },
  {
    slug: "facials",
    title: "Facials & Skin Treatments",
    short: "Facials",
    blurb: "Customized treatments for a healthy, radiant glow.",
    services: [
      {
        name: "HydraFacial",
        description: "Cleanse, extract, and hydrate with medical-grade infusion.",
        duration: "45 min",
        price: "$175",
        popular: true,
        layer: "surface",
        spec: "no downtime",
        image: "/images/service-hydrafacial.png",
        imageAlt: "A HydraFacial wand passing over a client's cheek",
        bookingUrl: "",
        offer: {
          label: "Glow reset",
          price: "$140",
          saving: "Save $35",
          spots: { left: 12, total: 40 },
          terms: "One per client. Capped at what the treatment room can hold.",
        },
      },
      {
        name: "Signature Med Spa Facial",
        description: "Consultation-driven facial customized to your skin goals.",
        duration: "60 min",
        price: "$135",
        layer: "surface",
        spec: "no downtime",
        bookingUrl: "",
      },
      {
        name: "Chemical Peel",
        description: "Resurfacing peel to brighten tone and texture.",
        duration: "30 min",
        price: "from $150",
        layer: "epidermis",
        spec: "3–5 days peeling",
        bookingUrl: "",
      },
      {
        name: "Dermaplaning",
        description: "Gentle exfoliation for instantly smoother, brighter skin.",
        duration: "30 min",
        price: "$95",
        layer: "surface",
        spec: "sterile blade",
        bookingUrl: "",
      },
    ],
  },
  {
    slug: "body",
    title: "Body Contouring",
    short: "Body",
    blurb: "Non-invasive treatments to sculpt and tone.",
    services: [
      {
        name: "CoolSculpting (Per Area)",
        description: "Non-invasive fat reduction with no downtime.",
        duration: "60 min",
        price: "from $600",
        popular: true,
        layer: "subcutis",
        spec: "controlled cooling",
        image: "/images/service-coolsculpting.png",
        imageAlt: "A CoolSculpting applicator in place during treatment",
        bookingUrl: "",
      },
      {
        name: "Body Sculpting & Toning",
        description: "Targeted treatment to firm and contour problem areas.",
        duration: "45 min",
        price: "from $250",
        layer: "subcutis",
        spec: "6-session course",
        bookingUrl: "",
      },
    ],
  },
  {
    slug: "wellness",
    title: "Wellness & IV Therapy",
    short: "Wellness",
    blurb: "Vitamin therapy to boost energy, immunity, and glow.",
    services: [
      {
        name: "IV Vitamin Drip",
        description: "Customized blend to hydrate, energize, and replenish.",
        duration: "45 min",
        price: "from $150",
        popular: true,
        layer: "systemic",
        spec: "500 mL",
        image: "/images/service-iv-drip.png",
        imageAlt: "A client resting in a lounge chair during an IV vitamin drip",
        bookingUrl: "",
      },
      {
        name: "B12 Energy Shot",
        description: "A quick boost for energy and focus.",
        duration: "10 min",
        price: "$25",
        layer: "systemic",
        spec: "intramuscular",
        bookingUrl: "",
      },
      {
        name: "Immunity Boost IV",
        description: "Vitamin C, zinc, and antioxidants to support immunity.",
        duration: "45 min",
        price: "from $175",
        layer: "systemic",
        spec: "500 mL",
        bookingUrl: "",
      },
    ],
  },
];

/** A featured service remembers which category it came from, so the homepage
 *  card can label it ("Injectables", "Laser", …) instead of inventing a tag. */
export type FeaturedService = Service & { category: string; categorySlug: string };

/** Every service, tagged with the category it belongs to. */
export const allServices: FeaturedService[] = serviceCategories.flatMap((c) =>
  c.services.map((s) => ({ ...s, category: c.short, categorySlug: c.slug })),
);

// A short, curated list for the homepage preview.
export const featuredServices: FeaturedService[] = allServices.filter(
  (s) => s.popular,
);

/** A treatment that is definitely discounted right now — `offer` is non-null,
 *  so cards built from this type don't have to guard every field. */
export type OfferedService = FeaturedService & { offer: Offer };

/**
 * Every discounted treatment — the /offers page in one call. They come out in
 * menu order (shallowest category first, as authored above), and the first one
 * gets the deep panel at the top of the page: to change what leads, move its
 * service up the catalogue.
 *
 * There is no date filtering here on purpose. An offer is listed for as long
 * as it exists in the catalogue and not a moment longer — see the note on the
 * `Offer` type.
 */
export function offeredServices(): OfferedService[] {
  return allServices.filter((s): s is OfferedService => !!s.offer);
}

/**
 * The menu re-sorted by depth instead of by category — the shape the depth
 * chart needs. Strata with nothing in them are dropped, so removing the last
 * IV drip from the menu removes the "Bloodstream" band rather than leaving a
 * labelled empty row.
 */
export function treatmentsByStratum(): (Stratum & {
  services: FeaturedService[];
})[] {
  return strata
    .map((stratum) => ({
      ...stratum,
      services: allServices.filter((s) => s.layer === stratum.id),
    }))
    .filter((row) => row.services.length > 0);
}
