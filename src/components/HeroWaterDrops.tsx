"use client";

import { useEffect, useRef } from "react";

/* Warm equivalents of the palette tokens in globals.css `@theme`. The canvas
   can't read Tailwind colour utilities, so the few it needs are inlined here:
   gold #bc9a5f, gold-dark #a9863f, blush #e8cbc2, rose #c98b7e. Alphas are cut
   for a light ground — on cream a near-white drop disappears, so every shape
   leans on its gold edge to stay legible. */
const GOLD = "188, 154, 95";
const GOLD_DARK = "169, 134, 63";
const BLUSH = "232, 203, 194";
const ROSE = "201, 139, 126";

/* Where the implied water surface sits, and how far below it drops may land.
   At `lg` the copy is beside the photo, so both are fractions of hero height —
   the surface lands just under the stats row.

   Stacked, the photo moves below the copy and the surface has to stay above it,
   or drops fall out of sight behind an opaque image. Its top edge isn't at a
   fixed fraction — the copy block gets proportionally shorter as the viewport
   widens (~55% of the hero at 390px, ~35% at 820px) — so the stacked geometry
   is measured off the photo rather than guessed. */
const WATER_LINE_WIDE = 0.95;
const LANDING_SPREAD_WIDE = 0.3;
/** Clearance above the photo for the surface, and for the lowest landing. */
const SURFACE_ABOVE_PHOTO = 110;
const LANDING_ABOVE_PHOTO = 60;
/* Drops only fall over the copy column once the hero splits into two. The
   hero is a centred max-w-6xl two-column grid, which puts the photo's left
   edge at ~51-52% of the viewport anywhere in the `lg` range, so a spawn band
   ending at 0.46 keeps every drop over the words. Stacked, the copy is the
   full width, so there's nothing to narrow. */
const COPY_COLUMN_WIDTH = 0.46;
const LG = "(min-width: 1024px)";

type Drop = { x: number; y: number; vy: number; size: number; targetY: number };
type Ripple = { x: number; y: number; r: number; maxR: number; alpha: number };
type Splash = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

/**
 * Ambient hero background: slow teardrops falling onto an implied water line,
 * each landing in a pair of expanding ripples and a small splash. Extra ripples
 * follow the pointer across the lower half of the hero.
 *
 * Sits behind the hero copy and is `pointer-events-none`, so the headline and
 * CTAs stay clickable — the pointer listener rides on the parent section, which
 * still sees the events. Paints a single resting frame and never animates for
 * `prefers-reduced-motion` users.
 */
export default function HeroWaterDrops() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const hero = canvas.parentElement;

    /* Read live off the media query rather than caching into state — a
       MediaQueryList always reports the current match, so the geometry follows
       a window resize with no listener to register or tear down. */
    const wide = window.matchMedia(LG);
    const spawnWidth = () => (wide.matches ? COPY_COLUMN_WIDTH : 1);

    /** Top of the stacked photo, in canvas coordinates; H if it isn't below. */
    const photoTop = () => {
      const photo = hero?.querySelector("[data-hero-photo]");
      if (!photo) return H;
      return (
        photo.getBoundingClientRect().top - canvas.getBoundingClientRect().top
      );
    };

    /** The water surface, and the lowest point a drop may land. */
    const surface = () =>
      wide.matches
        ? H * WATER_LINE_WIDE
        : Math.max(H * 0.25, photoTop() - SURFACE_ABOVE_PHOTO);
    const landingFloor = () =>
      wide.matches
        ? surface() + H * LANDING_SPREAD_WIDE
        : Math.max(surface(), photoTop() - LANDING_ABOVE_PHOTO);

    /* Warm sheen pooling around the water line — grounds the ripples so they
       don't read as rings floating on nothing. It has to start and end at zero
       alpha: the demo's flat-topped gradient was invisible on navy, but on
       cream any hard edge shows up as a seam across the hero. */
    const drawSheen = () => {
      const top = surface() - 90;
      const sheen = ctx.createLinearGradient(0, top, 0, H);
      sheen.addColorStop(0, `rgba(${GOLD}, 0)`);
      sheen.addColorStop(0.4, `rgba(${GOLD}, 0.075)`);
      sheen.addColorStop(1, `rgba(${GOLD}, 0.01)`);
      ctx.fillStyle = sheen;
      ctx.fillRect(0, top, W, H - top);
    };

    // Nothing moves for users who asked for less motion: one resting frame of
    // surface + two faint rings, then we're done — no loop, no timers.
    // Resizing has to repaint it, because setting canvas.width clears the
    // bitmap. The animated path doesn't care (the next frame redraws it), but
    // here the ResizeObserver's own initial callback would blank the canvas.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const paintResting = () => {
        resize();
        drawSheen();
        ctx.strokeStyle = `rgba(${GOLD}, 0.28)`;
        ctx.lineWidth = 1.4;
        const y = (surface() + landingFloor()) / 2;
        for (const r of [70, 130]) {
          ctx.beginPath();
          ctx.ellipse(W * 0.3, y, r, r * 0.28, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      };
      paintResting();

      const restingObserver = new ResizeObserver(paintResting);
      restingObserver.observe(canvas);
      return () => restingObserver.disconnect();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const drops: Drop[] = [];
    const ripples: Ripple[] = [];
    const splashes: Splash[] = [];

    const spawnDrop = () => {
      const size = 3 + Math.random() * 4;
      drops.push({
        x: W * spawnWidth() * (0.08 + Math.random() * 0.84),
        y: -size * 3,
        vy: 3 + Math.random() * 10, // speed 1
        size,
        targetY: surface() + Math.random() * (landingFloor() - surface()),
      });
    };

    // One drop every 1.2–2.5s, at most three in the air at once.
    let spawnTimer: ReturnType<typeof setTimeout>;
    // const scheduleDrop = () => {
    //   spawnTimer = setTimeout(
    //     () => {
    //       if (!document.hidden && drops.length < 3) spawnDrop();
    //       scheduleDrop();
    //     },
    //     1200 + Math.random() * 1300,
    //   );
    // };
    // v2
    const scheduleDrop = () => {
      const nextDelay = 300 + Math.random() * 3000; // very mixed
      spawnTimer = setTimeout(() => {
        if (!document.hidden && drops.length < 3) spawnDrop();
        scheduleDrop();
      }, nextDelay);
    };
    spawnDrop();
    scheduleDrop();

    const spawnRipple = (x: number, y: number, big = false) => {
      const scale = big ? 2.6 : 1;
      ripples.push({
        x,
        y,
        r: 2,
        maxR: (50 + Math.random() * 60) * scale,
        alpha: big ? 0.65 : 0.4,
      });
      if (!big) return;

      // A second ring starting at a negative radius trails the first, which
      // reads as a heavier impact than a single expanding circle.
      ripples.push({
        x,
        y,
        r: -14,
        maxR: (40 + Math.random() * 40) * scale,
        alpha: 0.5,
      });

      const n = 0; // splash droplets turned off 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const speed = 2.5 + Math.random() * 3.5;
        splashes.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.5 + Math.random() * 2.5,
          alpha: 0.9,
        });
      }
    };

    // Occasional ambient ripples so the surface is never completely still.
    const ambient = setInterval(() => {
      if (document.hidden) return;
      spawnRipple(
        Math.random() * W * spawnWidth(),
        surface() + Math.random() * (landingFloor() - surface()),
      );
    }, 1400);

    // Ripples trail the pointer, but only across the water — above the surface
    // or past the landing floor there's no surface for them to sit on.
    // const onPointerMove = (e: PointerEvent) => {
    //   const rect = canvas.getBoundingClientRect();
    //   const x = e.clientX - rect.left;
    //   const y = e.clientY - rect.top;

    //   const insideHero =
    //     x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

    //   if (!insideHero) return;

    //   const isUpperWater = y > surface() - 30 && y < landingFloor() + 50;
    //   const isLowerHero = false; // y > H * 0.6 && y < H;

    //   const shouldRipple = isUpperWater || isLowerHero || Math.random() < 0.2;

    //   if (shouldRipple) {
    //     spawnRipple(x, Math.min(Math.max(y, 0), H));
    //   }
    // };
    // hero?.addEventListener("pointermove", onPointerMove);

    let raf = 0;
    let last = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((t - last) / 16.67, 3);
      last = t;

      ctx.clearRect(0, 0, W, H);
      drawSheen();

      // Falling drops: glossy teardrop, circle body with a tapering tail.
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.vy * dt;
        d.vy += 0.95 * dt; // speed 2

        const s = d.size;
        const grad = ctx.createRadialGradient(
          d.x - s * 0.3,
          d.y - s * 0.3,
          s * 0.1,
          d.x,
          d.y,
          s,
        );
        grad.addColorStop(0, "rgba(255, 252, 247, 0.95)");
        grad.addColorStop(0.5, `rgba(${BLUSH}, 0.8)`);
        grad.addColorStop(1, `rgba(${GOLD_DARK}, 0.55)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - s * 2.2); // tail tip
        ctx.quadraticCurveTo(
          d.x + s * 0.9,
          d.y - s * 0.6,
          d.x + s * 0.85,
          d.y + s * 0.1,
        );
        ctx.arc(d.x, d.y + s * 0.1, s * 0.85, 0, Math.PI, false);
        ctx.quadraticCurveTo(d.x - s * 0.9, d.y - s * 0.6, d.x, d.y - s * 2.2);
        ctx.fill();

        // Specular glint — the one white highlight that sells it as water.
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.ellipse(
          d.x - s * 0.32,
          d.y - s * 0.15,
          s * 0.18,
          s * 0.3,
          -0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        if (d.y >= d.targetY) {
          spawnRipple(d.x, Math.min(d.targetY, H - 10), true);
          drops.splice(i, 1);
        }
      }

      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.18 * dt;
        p.alpha -= 0.02 * dt;
        if (p.alpha <= 0) {
          splashes.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(${ROSE}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ripples are flattened to 0.28 of their radius, which reads as a
      // surface seen at a low angle rather than circles drawn on glass.
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += (0.8 + Math.max(rp.r, 0) * 0.02) * dt;
        rp.alpha -= 0.008 * dt;
        if (rp.alpha <= 0 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }
        if (rp.r <= 0) continue; // trailing ring hasn't surfaced yet

        ctx.strokeStyle = `rgba(${GOLD_DARK}, ${rp.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();

        if (rp.r > 6) {
          ctx.strokeStyle = `rgba(${ROSE}, ${rp.alpha * 0.45})`;
          ctx.beginPath();
          ctx.ellipse(
            rp.x,
            rp.y,
            rp.r * 0.6,
            rp.r * 0.6 * 0.28,
            0,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
      }
    };
    raf = requestAnimationFrame(frame);

    // Everything above is long-lived, so all of it has to come back down:
    // React 19 runs effects twice in dev, and a surviving loop would double the
    // drop density on every remount.
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(spawnTimer);
      clearInterval(ambient);
      observer.disconnect();
      // hero?.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="water-canvas pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
