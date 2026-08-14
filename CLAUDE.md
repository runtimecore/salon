@AGENTS.md

# FENITI — Medical Spa website

A marketing + booking site for **FENITI**, a real medical spa (intended to go live — reliability matters, not a throwaway demo).

## Stack
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (CSS-based theming in `src/app/globals.css`).
- Fonts via `next/font`: Archivo (display, `wdth` axis requested explicitly) + Instrument Sans (body) + Martian Mono (data).
- Booking is handled by **Fresha** (external) — no custom scheduling engine.

## Design system
**Depth is the organising idea.** Every treatment on the menu works at a specific layer of tissue, and the site says which — that's the thesis the palette, type, and layout all serve. Tokens live in `@theme` in `src/app/globals.css`.

- **Colour** — cool and mineral: `clinic` (page ground) / `paper` / `sage` / `mist` (hairlines); `ink` / `slate` / `muted` for text; `petrol` (deep panels), `jade` + `jade-deep` (actions, links, rules), `mint` (jade's stand-in on dark grounds). All three text tones clear 4.5:1 on `clinic`.
- **`strat-1` … `strat-6` are the anatomy ramp** and are **diagram-only** — tissue colour, shading deeper as you go down. Warm colour appears nowhere else on the site. Reaching for a strat colour outside a depth diagram means reaching for `jade` instead.
- **Type — width carries hierarchy, not weight.** `.display` (Archivo at `wdth 110`) for headings, Instrument Sans for body, and `.label` / `.label-sm` / `.num` (Martian Mono) for *anything measured*: depths, doses, durations, prices, wavelengths, and the mono kickers that introduce sections. No serif anywhere.
- **Shape** — square corners (`rounded-[2px]`), hairline rules, no shadows, no blurred glows. Sections open with a mono kicker preceded by a short jade rule.
- Page shell is `mx-auto w-full max-w-[84rem] px-6 lg:px-12`.

### Section grounds are translucent
An animated WebGL background sits behind every page (`SiteBackground.tsx`), so **section backgrounds must use the `surface` tokens, never the solid ones**:

| Section is… | Use | Not |
| --- | --- | --- |
| full-width, base ground | `bg-surface` | `bg-clinic` |
| full-width, raised panel | `bg-surface-raised` | `bg-paper` |
| full-width, deep panel | `bg-surface-deep` | `bg-petrol` |
| full-width, darkest panel | `bg-surface-ink` | `bg-ink` |
| **width-constrained** (uses `shell`) | `surface-bleed` | any `bg-*` |

`surface-bleed` is a `::before` that spans `100vw` — a constrained element's own background would stop at the content column and leave raw shader running down the gutters. Body carries `overflow-x: clip` so that 100vw can't overhang the scrollbar (`clip`, not `hidden`, or the sticky header stops sticking).

Buttons, chips, tags, photo frames, and `GiftCardFace` stay on the **solid** tokens. A translucent control over a moving background reads as a rendering bug, and overlapping alphas compound.

## Where content lives (edit these, not the components)
- `src/lib/site.ts` — name, **Fresha `bookingUrl` / `giftCardUrl`**, contact, address, hours, socials, `url` (domain for SEO), gift-card amounts.
- `src/lib/services.ts` — the **`strata`** list (the six tissue layers, their depths, and the sentence explaining each) plus treatment categories (injectables, laser, facials, body, wellness), names, durations, prices (`popular` flag drives homepage feature), each service's `layer` + `spec` (the one measurement shown on its cards), and each service's own **Fresha `bookingUrl`** (from Fresha's Link builder) so its "Book" button opens Fresha with that service pre-selected; blank falls back to `site.bookingUrl` via `bookingUrlFor()`. `treatmentsByStratum()` re-cuts the menu by depth for the chart.
  - ⚠ **The depths and specs need the medical director's sign-off before launch** — they're typical published ranges on a live medical page, not invented, but they are claims.
  - Also holds the **`offer`** on a service (`label`, `price`, `saving`, optional `spots`, `terms`) — there is no separate offers catalogue, so a promotion can't drift out of sync with the treatment it discounts. `offeredServices()` collects them in menu order for /offers.
  - **Offers carry no dates and no countdown, by decision.** An offer runs for exactly as long as its `offer` block exists; ending one means deleting that block, and the price returns to list everywhere. Nothing is time-filtered, so nothing can go stale on its own — and keep months/seasons out of `label` and `terms` for the same reason.
  - ⚠ `spots` is a scarcity claim. Fill it in only if there's a real cap you'll honour — invented scarcity is the one thing on that page that can cost the clinic more than the discount.
- `src/lib/memberships.ts` — membership tiers/perks.
- Team names/roles: `src/app/about/page.tsx` (`team`, with `photo` paths into `public/images/`). Testimonials: `src/app/page.tsx`.

## Pages
Home (`/`), Services, **Special Offers (`/offers`)**, Membership, Gift Cards, About, Contact. Plus `sitemap.ts` + `robots.ts`. No `/book` page — CTAs funnel to Fresha. Every route is fully static — nothing on the site depends on render-time state.

## Key components
- `SiteBackground.tsx` — the site-wide background, mounted once in the root layout so the shader keeps its clock across client-side navigation instead of restarting per route. Holds the scrim and blur that keep text readable over it.
  - **Two layers, and the split matters.** `.shader-ground` (globals.css) is a static gradient that ships with the HTML; the WebGL canvas fades in over it once hydrated. The ground is painted at `#57bdcc` — the *measured mean of the shader's own output* — so the canvas arriving changes texture but not colour. Without it the page painted flat cream and then lurched to cyan the moment hydration finished. **If `UNIFORMS.colors` ever change, re-measure that mean and update `.shader-ground` with it**, or the lurch comes back.
  - The ground is also the whole background for reduced-motion users and browsers without WebGL — they get a static version of the same design rather than a different-looking site.
- `ui/voronoi-bubbles.tsx` — **vendored**, generated by the 21st.dev Shader Builder (Apache-2.0, adapted from Paper Shaders). Zero dependencies. Tune the look via its `UNIFORMS` object — `colors`/`colorCount` for palette, `timeScale` for speed, `intensity`/`scale` for cell size. Two local edits were needed for `strict` TypeScript (non-null re-binds of `canvas` and `gl`); both are commented, and both need re-applying if the shader is regenerated.
- `DepthChart.tsx` — **the signature.** The menu re-cut as a core sample: a band per stratum, tissue colour on the left rail washing out under the text, depth in the gutter, treatments as chips.
- `AnnotatedPhoto.tsx` — the other signature: clinical photography annotated like a technical plate (dot → hairline leader → mono chip). Plate `x`/`y` are percentages **to the dot**; place them in empty parts of the frame, and everything a plate says must be a real property of the treatment shown.
- `StratumTag.tsx` — owns `stratumColor` (id → ramp colour, keyed by id so dropping a layer doesn't reshuffle) and the depth tag that sits on treatment photos.
- `BookButton.tsx` — the primary CTA; links to `site.bookingUrl`. **Degrades gracefully when the URL is empty** (renders identically but inert, "coming soon" tooltip). Client component. `light` and `ghost` are the filled/outline pair for dark grounds.
- `ActionLink.tsx` — same graceful-empty behavior for arbitrary external links (used by gift-card buttons).
- `ServiceCard.tsx` is a ledger **row** for the /services menu; `SignatureServiceCard.tsx` is the photo card for the homepage. Deliberately different components. A row with a live offer strikes through its list price and links to /offers.
- `OfferCard.tsx` — /offers. Carries the menu's tissue rail and mono meta line so an offer reads as the *same treatment* at a lower price, not a separate product. The first offer in catalogue order gets the deep panel (`featured`) — an editorial choice made by ordering `services.ts`, not computed.
  - **Nothing on a card is a clock** — no countdown, no closing date, and not even the treatment's duration (which stays on the menu row, where it belongs). What pull there is comes from the size of the saving and, where there's a genuine cap, the "12 of 40 left" rule. Both stay true however long the page sits open, which is the point: no red, no badges, no borrowed deadline.
- `Reveal.tsx` — IntersectionObserver scroll-reveal wrapper. Falls back to visible if unsupported.
- Animations in `globals.css`: `.enter` / `.enter-photo` / `.enter-tick` / `.enter-fade` (hero load sequence, stagger with inline `animation-delay`), `.leader` + `.strat` (diagrams drawing themselves), `.reveal` (scroll). All have a `prefers-reduced-motion` fallback — note that diagrams stay *drawn* under reduced motion, since they're information rather than decoration.

## Photos
Real photos are in place under `public/images/`: `hero.png` (homepage), `about-interior.png` (About page story shot), and four team headshots (`team-founder.png`, `team-nurse-injector.png`, `team-esthetician.png`, `team-care-coordinator.png`) wired up in `src/app/about/page.tsx`. All AI-generated placeholders — swap for real photography before launch.

## Current state (as of last session)
- **Redesigned end to end (2026-08-12).** The previous look — cream/gold, Playfair Display, arched photo alcoves, floating blurred glows, pill buttons — is gone. Replaced by the depth system described above. No page kept its old layout, and the copy was rewritten with it.
- Rebranded from an earlier "Aphrodite / Beauty Salon" placeholder concept to **FENITI, a medical spa**. Content is still **test/placeholder** (services, prices, memberships, team names, testimonials) that the owner is fine with for demo.
- **Special Offers added (2026-08-13).** New `/offers` page + nav item, driven by an `offer` field on services rather than a separate list. Four placeholder offers are in `services.ts` (Botox, HydraFacial, IPL, large-area laser). Built first with countdowns and closing dates; **the owner asked for all of it out** — offers are now dateless and permanent-until-deleted. Don't reintroduce a timer.
- `bookingUrl` and `giftCardUrl` are intentionally **empty** — the owner created a Fresha *business* account but hasn't enabled online booking (it required entering billing details). Buttons stay inert until real links are pasted in. There is no Fresha developer sandbox; the free business account is the only source of a booking link.

## Pending before true launch
Real Fresha links, real treatments/prices/memberships, **real offers** (the current four are placeholders), real photos (replace the AI-generated placeholders in `public/images/`), real team + testimonials. Domain is still a placeholder (`fenitimedspa.com`) — update `site.url` once the real domain is set.

## Commands
```
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build (must pass before pushing)
npm run lint
```

## Deploy
GitHub repo: https://github.com/runtimecore/salon.git → deploys on **Vercel** (auto-detects Next.js). Update `site.url` when the custom domain is set.
