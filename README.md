# FENITI — Medical Spa Website

A modern, warm marketing + booking website for **FENITI Medical Spa**, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Bookings are handled by **Fresha**.

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

## Where to plug in the spa's real details

Almost everything you'll want to edit lives in a few files:

| What | File |
| --- | --- |
| **Fresha booking link**, phone, email, address, hours, socials | `src/lib/site.ts` |
| Treatment categories, names, prices, durations | `src/lib/services.ts` |
| Membership tiers and perks | `src/lib/memberships.ts` |
| Provider names/roles | `src/app/about/page.tsx` (`team`) |
| Testimonials | `src/app/page.tsx` (`testimonials`) |

> **Most important:** set `bookingUrl` in `src/lib/site.ts` to your live Fresha
> link. Every "Book Now" button across the site uses it.

## Photos

Real photos live in `public/images/` (hero, spa interior, and team headshots)
and are wired up via Next.js `<Image>` in the homepage and About page.

## Pages

- `/` — Home (hero, services preview, membership teaser, testimonials, CTAs)
- `/services` — Full treatment menu with pricing
- `/membership` — Membership tiers + FAQ
- `/about` — Story and team
- `/contact` — Address, hours, phone, embedded map

## Deploying

Push to a Git repo and import it on [Vercel](https://vercel.com) — it detects
Next.js automatically. Set your custom domain and update `site.url` in
`src/lib/site.ts` for correct SEO metadata and sitemap URLs.
