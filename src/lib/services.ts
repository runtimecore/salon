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
};

export type ServiceCategory = {
  slug: string;
  title: string;
  blurb: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "hair",
    title: "Hair",
    blurb: "Cuts, color, and styling tailored to you.",
    services: [
      {
        name: "Women's Cut & Style",
        description: "Consultation, precision cut, and a finished blow-dry.",
        duration: "60 min",
        price: "$65",
        popular: true,
      },
      {
        name: "Men's Cut",
        description: "Tailored cut and style for a sharp, easy finish.",
        duration: "40 min",
        price: "$40",
      },
      {
        name: "Full Color",
        description: "Single-process color, roots to ends, with a gloss finish.",
        duration: "120 min",
        price: "from $95",
      },
      {
        name: "Balayage & Highlights",
        description: "Hand-painted, sun-kissed dimension for a natural grow-out.",
        duration: "180 min",
        price: "from $160",
        popular: true,
      },
      {
        name: "Blowout & Styling",
        description: "Smooth, voluminous, event-ready styling.",
        duration: "45 min",
        price: "$50",
      },
    ],
  },
  {
    slug: "nails",
    title: "Nails",
    blurb: "Manicures and pedicures with lasting shine.",
    services: [
      {
        name: "Classic Manicure",
        description: "Shape, cuticle care, and polish for tidy, elegant hands.",
        duration: "30 min",
        price: "$30",
      },
      {
        name: "Gel Manicure",
        description: "Chip-resistant gel color with a high-gloss, lasting finish.",
        duration: "45 min",
        price: "$45",
        popular: true,
      },
      {
        name: "Spa Pedicure",
        description: "Soak, exfoliation, massage, and polish for renewed feet.",
        duration: "50 min",
        price: "$55",
      },
    ],
  },
  {
    slug: "skin",
    title: "Facials & Skin",
    blurb: "Glow-restoring treatments for every skin type.",
    services: [
      {
        name: "Signature Facial",
        description: "Cleanse, exfoliate, extract, and hydrate — customized to you.",
        duration: "60 min",
        price: "$85",
        popular: true,
      },
      {
        name: "Express Glow Facial",
        description: "A quick refresh for radiant skin on a busy schedule.",
        duration: "30 min",
        price: "$55",
      },
      {
        name: "Anti-Aging Treatment",
        description: "Firming, brightening care that targets fine lines.",
        duration: "75 min",
        price: "$120",
      },
    ],
  },
  {
    slug: "waxing",
    title: "Waxing",
    blurb: "Smooth results with gentle, premium wax.",
    services: [
      {
        name: "Eyebrow Shaping",
        description: "Precision waxing and shaping to frame your face.",
        duration: "15 min",
        price: "$18",
      },
      {
        name: "Lip or Chin",
        description: "Quick, gentle waxing for smooth, clean skin.",
        duration: "10 min",
        price: "$12",
      },
      {
        name: "Full Leg",
        description: "Long-lasting smoothness from thigh to ankle.",
        duration: "45 min",
        price: "$65",
      },
    ],
  },
  {
    slug: "makeup",
    title: "Makeup",
    blurb: "Flawless looks for every occasion.",
    services: [
      {
        name: "Special Occasion Makeup",
        description: "A polished, long-wearing look for your big moment.",
        duration: "60 min",
        price: "$75",
      },
      {
        name: "Bridal Makeup",
        description: "Consultation, trial, and wedding-day application.",
        duration: "90 min",
        price: "from $150",
        popular: true,
      },
    ],
  },
];

// A short, curated list for the homepage preview.
export const featuredServices: Service[] = serviceCategories
  .flatMap((c) => c.services)
  .filter((s) => s.popular);
