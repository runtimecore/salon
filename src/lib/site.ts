/**
 * Central site configuration.
 * ── EDIT THESE VALUES with the salon's real details. ──
 * The most important one is `bookingUrl`: paste the salon's Fresha
 * booking link here and every "Book Now" button will use it.
 */
export const site = {
  name: "FENITI",
  tagline: "Medical Spa",
  description:
    "FENITI is a modern medical spa offering expert injectables, laser treatments, facials, and wellness therapies. Book your appointment online and let our licensed providers help you look and feel your best.",

  // TODO: paste your live Fresha booking link here (e.g.
  // "https://www.fresha.com/a/aphrodite-salon-..."). While it's empty,
  // every "Book Now" button stays inert (no navigation) instead of breaking.
  // This is the general link. For "open Fresha with THIS service already
  // selected", fill in each service's own `bookingUrl` in lib/services.ts —
  // services fall back to this link whenever theirs is blank.
  bookingUrl: "",

  // Gift cards. Fresha lets businesses sell gift cards online — paste that
  // link here (often your booking page with a gift-card section, or a
  // dedicated voucher URL). Falls back to bookingUrl if left blank.
  giftCardUrl: "",
  // Preset amounts shown on the Gift Cards page. Edit freely.
  giftCardAmounts: [50, 75, 100, 150, 200],

  // Contact — TODO: replace phone and email with real details.
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "hello@fenitimedspa.com",

  // Location — this is the real address. The suite number is still to come;
  // an empty `addressLine2` is handled everywhere (see `fullAddress` below),
  // so filling it in later is a one-line change and nothing else moves.
  addressLine1: "13720 Victory Blvd",
  addressLine2: "",
  city: "Van Nuys",
  region: "CA",
  postalCode: "91401",

  // The clinic's Apple Maps place link — every "get directions" on the site
  // opens this. It's Apple's own record of the pin, so it lands on the exact
  // spot instead of wherever a search engine geocodes the address text, and
  // on an iPhone it hands straight off to the Maps app.
  mapUrl: "https://maps.apple/la/ubDsfFeVt8Dh9w",

  // The coordinates behind that pin, read from the Apple link. Used to centre
  // the map drawn on /contact so the marker can't drift to a geocoder's guess.
  lat: 34.186484,
  lng: -118.432045,

  // Used for SEO metadata (your final domain).
  url: "https://www.fenitimedspa.com",

  // Social links — leave "" to hide the icon.
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "",
  },

  // Opening hours, shown in the footer and contact page.
  hours: [
    { day: "Monday", time: "Closed" },
    { day: "Tuesday", time: "9:00 AM – 7:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 7:00 PM" },
    { day: "Thursday", time: "9:00 AM – 8:00 PM" },
    { day: "Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "10:00 AM – 4:00 PM" },
  ],
} as const;

/**
 * The address on one line, dropping any part that isn't filled in yet. With
 * `addressLine2` empty this reads "13720 Victory Blvd, Van Nuys, CA 91401"
 * instead of leaving a stray comma where the suite will go.
 */
export const fullAddress = [
  site.addressLine1,
  site.addressLine2,
  `${site.city}, ${site.region} ${site.postalCode}`,
]
  .filter(Boolean)
  .join(", ");

/**
 * Every "find us" link on the site — the footer address, "Get directions", and
 * the corner of the map — resolves here, so they can't drift onto three
 * different pins. It's the Apple Maps place link from `site.mapUrl`, not a
 * search: a search makes the map provider re-guess the location from the
 * address text, and this way there's nothing left to guess.
 */
export const mapsLink = site.mapUrl;

/**
 * The map actually *drawn* on /contact — and it is deliberately not Apple's.
 *
 * `maps.apple.com` answers with `X-Frame-Options: SAMEORIGIN`, so an Apple map
 * cannot be framed from another domain at all; an <iframe> pointed at `mapUrl`
 * renders an empty box, no matter how the URL is written. Google's keyless
 * `output=embed` is frameable but is widely blocked by privacy extensions and
 * shows a consent layer in some regions — an embed that silently fails for a
 * share of visitors is worse than no embed.
 *
 * OpenStreetMap's export embed needs no key, sets no framing header and loads
 * no consent gate, so it draws for everyone. It's centred on `site.lat/lng`
 * straight from the Apple pin, and the panel around it links out to Apple for
 * directions — so the map you look at is OSM, and the map you *navigate* with
 * is still the one the clinic published.
 */
const view = { lng: 0.006, lat: 0.004 }; // roughly 1 km across at this latitude
const bbox = [
  site.lng - view.lng,
  site.lat - view.lat,
  site.lng + view.lng,
  site.lat + view.lat,
].join(",");
export const mapsEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${site.lat},${site.lng}`;
