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
    name: "Renew",
    price: "$49",
    cadence: "/month",
    tagline: "The essentials for consistent skin care.",
    perks: [
      "One express treatment credit each month",
      "10% off all additional treatments",
      "10% off skincare products",
      "Birthday treat on us",
    ],
  },
  {
    name: "Radiance",
    price: "$99",
    cadence: "/month",
    tagline: "Our most-loved plan for the devoted.",
    perks: [
      "One signature treatment credit each month",
      "15% off all additional treatments",
      "Priority booking windows",
      "Complimentary add-on each visit",
      "15% off skincare products",
    ],
    featured: true,
  },
  {
    name: "FENITI Elite",
    price: "$179",
    cadence: "/month",
    tagline: "The full med spa experience, every month.",
    perks: [
      "Two premium treatment credits each month",
      "20% off all additional treatments",
      "First access to new treatments & events",
      "Dedicated provider matching",
      "20% off skincare products",
    ],
  },
];
