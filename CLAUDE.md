@AGENTS.md

# FENITI — Medical Spa website

A marketing + booking site for **FENITI**, a real medical spa (intended to go live — reliability matters, not a throwaway demo).

## Stack
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (CSS-based theming in `src/app/globals.css`).
- Fonts via `next/font`: Playfair Display (headings) + Inter (body).
- Booking is handled by **Fresha** (external) — no custom scheduling engine.

## Design system
Warm + modern, clinical-luxury. Palette tokens live in `@theme` in `src/app/globals.css`:
cream / sand / linen (backgrounds), ink / espresso (text), gold + gold-dark (primary), blush / rose (accents). Use these Tailwind color names (`bg-cream`, `text-gold-dark`, …).

## Where content lives (edit these, not the components)
- `src/lib/site.ts` — name, **Fresha `bookingUrl` / `giftCardUrl`**, contact, address, hours, socials, `url` (domain for SEO), gift-card amounts.
- `src/lib/services.ts` — treatment categories (injectables, laser, facials, body, wellness), names, durations, prices (`popular` flag drives homepage feature + badge), and each service's own **Fresha `bookingUrl`** (from Fresha's Link builder) so its "Book" button opens Fresha with that service pre-selected; blank falls back to `site.bookingUrl` via `bookingUrlFor()`.
- `src/lib/memberships.ts` — membership tiers/perks.
- Team names/roles: `src/app/about/page.tsx` (`team`, with `photo` paths into `public/images/`). Testimonials: `src/app/page.tsx`.

## Pages
Home (`/`), Services, Membership, Gift Cards, About, Contact. Plus `sitemap.ts` + `robots.ts`. No `/book` page — CTAs funnel to Fresha.

## Key components
- `BookButton.tsx` — the primary CTA; links to `site.bookingUrl`. **Degrades gracefully when the URL is empty** (renders but inert, "coming soon" tooltip). Client component.
- `ActionLink.tsx` — same graceful-empty behavior for arbitrary external links (used by gift-card buttons).
- `Reveal.tsx` — IntersectionObserver scroll-reveal wrapper (fade + slide up). Falls back to visible if unsupported.
- Homepage animations: `.hero-enter` (staggered load-in), `.animate-float` (drifting glows), `.reveal` — all defined in `globals.css` with a `prefers-reduced-motion` fallback.

## Photos
Real photos are in place under `public/images/`: `hero.png` (homepage), `about-interior.png` (About page story shot), and four team headshots (`team-founder.png`, `team-nurse-injector.png`, `team-esthetician.png`, `team-care-coordinator.png`) wired up in `src/app/about/page.tsx`. All AI-generated placeholders — swap for real photography before launch.

## Current state (as of last session)
- Rebranded from an earlier "Aphrodite / Beauty Salon" placeholder concept to **FENITI, a medical spa**. Content is still **test/placeholder** (services, prices, memberships, team names, testimonials) that the owner is fine with for demo.
- `bookingUrl` and `giftCardUrl` are intentionally **empty** — the owner created a Fresha *business* account but hasn't enabled online booking (it required entering billing details). Buttons stay inert until real links are pasted in. There is no Fresha developer sandbox; the free business account is the only source of a booking link.

## Pending before true launch
Real Fresha links, real treatments/prices/memberships, real photos (replace the AI-generated placeholders in `public/images/`), real team + testimonials. Domain is still a placeholder (`fenitimedspa.com`) — update `site.url` once the real domain is set.

## Commands
```
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build (must pass before pushing)
npm run lint
```

## Deploy
GitHub repo: https://github.com/runtimecore/salon.git → deploys on **Vercel** (auto-detects Next.js). Update `site.url` when the custom domain is set.
