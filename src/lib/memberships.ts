/**
 * Membership tiers.
 * ── EDIT: adjust names, prices, and perks to match your real program. ──
 * These are presented as marketing/pricing cards. Sign-up currently routes
 * to booking/contact — see the Membership page notes for how to add real
 * recurring billing later (e.g. Square Memberships or a Stripe link).
 */
export type Membership = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  perks: string[];
  featured?: boolean;
};

export const memberships: Membership[] = [
  {
    name: "Radiance",
    price: "$49",
    cadence: "/month",
    tagline: "The essentials for a regular glow-up.",
    perks: [
      "One express service credit each month",
      "10% off all additional services",
      "10% off retail products",
      "Birthday treat on us",
    ],
  },
  {
    name: "Goddess",
    price: "$99",
    cadence: "/month",
    tagline: "Our most-loved plan for the devoted.",
    perks: [
      "One signature service credit each month",
      "15% off all additional services",
      "Priority booking windows",
      "Complimentary add-on each visit",
      "15% off retail products",
    ],
    featured: true,
  },
  {
    name: "Aphrodite Elite",
    price: "$179",
    cadence: "/month",
    tagline: "The full luxury experience, every month.",
    perks: [
      "Two premium service credits each month",
      "20% off all additional services",
      "First access to new treatments & events",
      "Dedicated stylist matching",
      "20% off retail products",
    ],
  },
];
