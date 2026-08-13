"use client";

import { useSyncExternalStore } from "react";
import { ShaderBackground } from "@/components/ui/voronoi-bubbles";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(REDUCED_MOTION).matches;

// Treat the server (and the hydration pass) as reduced-motion so the canvas is
// only ever mounted by the client, once it can actually read the preference.
// useSyncExternalStore re-reads immediately after hydration, so the shader
// arrives a beat later for everyone else — no markup mismatch either way.
const getServerSnapshot = () => true;

/**
 * The site-wide background: a painted ground that ships with the HTML, and a
 * WebGL canvas that resolves on top of it once the page is interactive.
 *
 * The two-layer split is the whole point. A canvas can't exist until the JS
 * bundle has loaded and hydrated, so anything relying on it alone spends the
 * first moment of every page load showing a completely different colour and
 * then lurching. `.shader-ground` is painted at the shader's own measured mean
 * colour, server-side, so there is nothing to lurch *from*: the canvas fades in
 * over a ground that already matches it, and all that changes is texture.
 *
 * It lives in the root layout rather than in a page, so the shader keeps its
 * own clock across client-side navigation instead of restarting on each route.
 *
 * Page surfaces (`bg-surface*` and `.surface-bleed` in globals.css) are
 * translucent — that's what lets this read through — so making one of them
 * opaque again is what to reach for if a section ever needs to sit flat.
 */
export default function SiteBackground() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Always present: first paint, reduced motion, and no-WebGL all land here. */}
      <div className="shader-ground absolute inset-0" />

      {!prefersReducedMotion && (
        <div className="shader-in absolute inset-0">
          {/* Scaled up so the blur has material to pull from at the edges
              rather than fading into the ground behind it. */}
          <ShaderBackground className="h-full w-full scale-110 blur-[3px]" />
        </div>
      )}

      {/* One scrim over both layers instead of a backdrop-filter on every
          section: same softening, a fraction of the compositing cost. */}
      <div className="absolute inset-0 bg-clinic/35" />
    </div>
  );
}
