/**
 * Central site configuration.
 * ── EDIT THESE VALUES with the salon's real details. ──
 * The most important one is `bookingUrl`: paste the salon's Fresha
 * booking link here and every "Book Now" button will use it.
 */
export const site = {
  name: "Aphrodite",
  tagline: "Beauty Salon",
  description:
    "Aphrodite is a modern beauty salon offering expert hair, nails, facials, waxing, and makeup. Book your appointment online and let our stylists bring out your best.",

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

  // Contact + location — TODO: replace with real details.
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "hello@aphroditesalon.com",
  addressLine1: "123 Rosewood Avenue",
  addressLine2: "Suite 5",
  city: "Los Angeles",
  region: "CA",
  postalCode: "90012",

  // Used for SEO metadata (your final domain).
  url: "https://www.aphroditesalon.com",

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

export const fullAddress = `${site.addressLine1}, ${site.addressLine2}, ${site.city}, ${site.region} ${site.postalCode}`;
