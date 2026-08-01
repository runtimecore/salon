# Aphrodite — Beauty Salon Website

A modern, warm marketing + booking website for **Aphrodite Beauty Salon**, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Bookings are handled by **Fresha**.

## Getting started

```bash
npm run dev
```

Open http://localhost:3000.

Other commands:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint
```

## Where to plug in the salon's real details

Almost everything you'll want to edit lives in a few files:

| What | File |
| --- | --- |
| **Fresha booking link**, phone, email, address, hours, socials | `src/lib/site.ts` |
| Service categories, names, prices, durations | `src/lib/services.ts` |
| Membership tiers and perks | `src/lib/memberships.ts` |
| Stylist names/roles | `src/app/about/page.tsx` (`team`) |
| Testimonials | `src/app/page.tsx` (`testimonials`) |

> **Most important:** set `bookingUrl` in `src/lib/site.ts` to your live Fresha
> link. Every "Book Now" button across the site uses it.

## Adding real photos

The homepage hero, About page, and team cards currently use warm gradient
placeholders. Drop image files into `public/` (e.g. `public/hero.jpg`) and
replace the placeholder `<div>`s with Next.js `<Image>` components.

## Pages

- `/` — Home (hero, services preview, membership teaser, testimonials, CTAs)
- `/services` — Full service menu with pricing
- `/membership` — Membership tiers + FAQ
- `/about` — Story and team
- `/contact` — Address, hours, phone, embedded map

## Deploying

Push to a Git repo and import it on [Vercel](https://vercel.com) — it detects
Next.js automatically. Set your custom domain and update `site.url` in
`src/lib/site.ts` for correct SEO metadata and sitemap URLs.
