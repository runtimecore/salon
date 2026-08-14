import { site } from "./site";

/**
 * Service catalog.
 * ── EDIT: swap in the salon's real services, prices, and durations. ──
 * Prices are display strings so you can use "from $X" where it helps.
 */
/**
 * A limited-time discount on a service.
 *
 * ── EDIT: add an `offer` to any service below and it shows up on
 * /special-offers by itself, and that service's card starts showing the
 * sale price. Delete the block to end the promotion. ──
 */
export type ServiceOffer = {
  /**
   * The promo price, e.g. "$139". The service's regular `price` is shown
   * struck through next to it, so keep the two in the same format
   * ("$175" → "$139", "from $250" → "from $199").
   */
  price: string;
  /** Short badge text: "Save $36", "20% off". Keep it to ~12 characters. */
  label: string;
  /**
   * Last day the offer runs, as "YYYY-MM-DD". It stays live until the end of
   * that day and then drops off the site on its own — the offers and services
   * pages re-render hourly, so no redeploy is needed. A malformed date is
   * treated as expired (the offer simply won't show).
   */
  endsOn: string;
  /** Optional fine print under the price, e.g. "New clients only." */
  terms?: string;
};

export type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
  popular?: boolean;
  /** Limited-time discount. See `ServiceOffer` — omit when nothing is on sale. */
  offer?: ServiceOffer;
  /**
   * Photo for the homepage "signature services" section, as a path into
   * `public/images` (e.g. "/images/service-botox.png"). Shoot or crop these
   * **portrait, 4:5** — they're masked into an arch, so keep the subject
   * centred and leave headroom at the top. Omit it and the card still renders
   * (a warm linen panel stands in), so a service without a photo never breaks
   * the grid.
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
};

/**
 * The link a "Book" button for this service should open: its own Fresha link
 * when set, otherwise the salon's general booking link. Returns "" when
 * neither is configured — buttons then render inert instead of breaking.
 */
export function bookingUrlFor(service: Service): string {
  return service.bookingUrl || site.bookingUrl;
}

/* ── Special offers ───────────────────────────────────────────────────────
   Offers are just services carrying an `offer` block, so there is one place
   to edit a treatment — its price, its Fresha link, and its discount all sit
   together in the catalog below. Everything here derives from that. */

/**
 * The instant an offer stops being valid: the last millisecond of `endsOn`.
 * Returns NaN for a malformed date, which makes `isOfferLive` false — a typo
 * hides the offer rather than showing a countdown to nowhere.
 *
 * Parsed as local time, so "ends Aug 31" means midnight where the reader is
 * (near enough where the spa is) rather than midnight UTC.
 */
export function offerEndsAt(offer: ServiceOffer): number {
  const [year, month, day] = offer.endsOn.split("-").map(Number);
  if (!year || !month || !day) return NaN;
  return new Date(year, month - 1, day, 23, 59, 59, 999).getTime();
}

export function isOfferLive(offer: ServiceOffer, now: number = Date.now()): boolean {
  return offerEndsAt(offer) > now;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * "Aug 31" — the deadline as a plain string. Formatted by hand rather than
 * with `toLocaleDateString` so the server and the browser can never disagree
 * about locale or timezone and trip a hydration mismatch.
 */
export function formatOfferEnd(offer: ServiceOffer): string {
  const [, month, day] = offer.endsOn.split("-").map(Number);
  const name = MONTHS[month - 1];
  return name ? `${name} ${day}` : offer.endsOn;
}

/** A service known to be on offer, tagged with the category it came from. */
export type OfferedService = Service & {
  offer: ServiceOffer;
  category: string;
  categorySlug: string;
};

/**
 * Every live offer, soonest deadline first — so the page leads with whatever
 * the client would miss out on next. Expired offers are dropped, and the pages
 * that call this revalidate hourly so that stays true without a deploy.
 */
export function liveOffers(now: number = Date.now()): OfferedService[] {
  return serviceCategories
    .flatMap((c) =>
      c.services.map((s) => ({ ...s, category: c.short, categorySlug: c.slug })),
    )
    .filter((s): s is OfferedService => !!s.offer && isOfferLive(s.offer, now))
    .sort((a, b) => offerEndsAt(a.offer) - offerEndsAt(b.offer));
}

/** The offer on this service if it's still running, otherwise undefined. */
export function liveOfferFor(
  service: Service,
  now: number = Date.now(),
): ServiceOffer | undefined {
  return service.offer && isOfferLive(service.offer, now) ? service.offer : undefined;
}

export type ServiceCategory = {
  slug: string;
  title: string;
  /** One-word version of `title`, used as the eyebrow on homepage cards. */
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
        image: "/images/service-botox.png",
        imageAlt: "A provider marking injection points on a client's forehead",
        bookingUrl: "",
      },
      {
        name: "Lip Filler",
        description: "Hyaluronic acid filler for natural, balanced volume.",
        duration: "30 min",
        price: "from $650",
        popular: true,
        // NOTE: the `endsOn` dates on this and the offers below are demo
        // values. Push them forward (or delete the `offer` blocks) before
        // launch — once a date passes, that offer disappears from the site.
        offer: {
          price: "from $550",
          label: "Save $100",
          endsOn: "2026-08-31",
          terms: "One syringe per guest.",
        },
        image: "/images/service-lip-filler.png",
        imageAlt: "A client's lips and jawline assessed before filler",
        bookingUrl: "",
      },
      {
        name: "Cheek & Midface Filler",
        description: "Restores contour and lift with dermal filler.",
        duration: "45 min",
        price: "from $750",
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
        bookingUrl: "",
      },
      {
        name: "Laser Hair Removal (Large Area)",
        description: "Long-lasting smoothness for legs, back, or full arms.",
        duration: "45 min",
        price: "from $200",
        bookingUrl: "",
      },
      {
        name: "Photofacial (IPL)",
        description: "Targets sun damage, redness, and uneven tone.",
        duration: "30 min",
        price: "from $250",
        popular: true,
        offer: {
          price: "from $199",
          label: "20% off",
          endsOn: "2026-08-23",
        },
        image: "/images/service-photofacial.png",
        imageAlt:
          "A client in protective eyewear receiving an IPL photofacial",
        bookingUrl: "",
      },
      {
        name: "Microneedling with RF",
        description: "Radiofrequency microneedling to firm and resurface skin.",
        duration: "60 min",
        price: "from $350",
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
        offer: {
          price: "$139",
          label: "Save $36",
          endsOn: "2026-08-31",
          terms: "New clients only.",
        },
        image: "/images/service-hydrafacial.png",
        imageAlt: "A HydraFacial wand passing over a client's cheek",
        bookingUrl: "",
      },
      {
        name: "Signature Med Spa Facial",
        description: "Consultation-driven facial customized to your skin goals.",
        duration: "60 min",
        price: "$135",
        bookingUrl: "",
      },
      {
        name: "Chemical Peel",
        description: "Resurfacing peel to brighten tone and texture.",
        duration: "30 min",
        price: "from $150",
        bookingUrl: "",
      },
      {
        name: "Dermaplaning",
        description: "Gentle exfoliation for instantly smoother, brighter skin.",
        duration: "30 min",
        price: "$95",
        offer: {
          price: "$75",
          label: "Save $20",
          endsOn: "2026-08-18",
        },
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
        offer: {
          price: "from $480",
          label: "20% off",
          endsOn: "2026-09-15",
          terms: "Per treated area. Consultation required.",
        },
        image: "/images/service-coolsculpting.png",
        imageAlt: "A CoolSculpting applicator in place during treatment",
        bookingUrl: "",
      },
      {
        name: "Body Sculpting & Toning",
        description: "Targeted treatment to firm and contour problem areas.",
        duration: "45 min",
        price: "from $250",
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
        offer: {
          price: "from $119",
          label: "Save $31",
          endsOn: "2026-08-31",
        },
        image: "/images/service-iv-drip.png",
        imageAlt: "A client resting in a lounge chair during an IV vitamin drip",
        bookingUrl: "",
      },
      {
        name: "B12 Energy Shot",
        description: "A quick boost for energy and focus.",
        duration: "10 min",
        price: "$25",
        bookingUrl: "",
      },
      {
        name: "Immunity Boost IV",
        description: "Vitamin C, zinc, and antioxidants to support immunity.",
        duration: "45 min",
        price: "from $175",
        bookingUrl: "",
      },
    ],
  },
];

/** A featured service remembers which category it came from, so the homepage
 *  card can label it ("Injectables", "Laser", …) instead of inventing a tag. */
export type FeaturedService = Service & { category: string; categorySlug: string };

// A short, curated list for the homepage preview.
export const featuredServices: FeaturedService[] = serviceCategories.flatMap((c) =>
  c.services
    .filter((s) => s.popular)
    .map((s) => ({ ...s, category: c.short, categorySlug: c.slug })),
);
