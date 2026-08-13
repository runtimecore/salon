import { site } from "./site";

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
