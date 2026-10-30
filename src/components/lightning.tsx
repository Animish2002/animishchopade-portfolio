"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Pt = { x: number; y: number };
type Channel = { pts: Pt[]; width: number; alpha: number; taper: boolean };
type Pulse = { at: number; peak: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Midpoint displacement: jagged at every scale, like a real leader channel. */
function channel(a: Pt, b: Pt, roughness: number, depth: number): Pt[] {
  let pts = [a, b];
  let offset = Math.hypot(b.x - a.x, b.y - a.y) * roughness;
  for (let d = 0; d < depth; d++) {
    const next: Pt[] = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
      const o = rand(-offset, offset);
      next.push({ x: (p.x + q.x) / 2 - ((q.y - p.y) / len) * o, y: (p.y + q.y) / 2 + ((q.x - p.x) / len) * o }, q);
    }
    pts = next;
    offset /= 2;
  }
  return pts;
}

/** Main stroke plus forks that peel off and fade, some forking again. */
function makeBolt(w: number, h: number): Channel[] {
  const start = { x: rand(w * 0.25, w * 0.95), y: -20 };
  const end = { x: start.x + rand(-w * 0.2, w * 0.2), y: rand(h * 0.6, h * 1.05) };
  const main = channel(start, end, 0.16, 7);
  const out: Channel[] = [{ pts: main, width: 1, alpha: 1, taper: false }];
  const heading = Math.atan2(end.y - start.y, end.x - start.x);

  const fork = (from: Pt, length: number, width: number, alpha: number, depth: number) => {
    const angle = heading + rand(0.3, 0.85) * (Math.random() < 0.5 ? -1 : 1);
    const to = { x: from.x + Math.cos(angle) * length, y: from.y + Math.sin(angle) * length };
    const pts = channel(from, to, 0.22, 5);
    out.push({ pts, width, alpha, taper: true });
    if (depth > 0 && Math.random() < 0.5) {
      const i = Math.floor(rand(0.2, 0.6) * pts.length);
      fork(pts[i], length * 0.45, width * 0.6, alpha * 0.7, depth - 1);
    }
  };

  for (let i = 6; i < main.length - 12; i++) {
    if (Math.random() < 0.05) fork(main[i], (end.y - main[i].y) * rand(0.25, 0.55), 0.5, 0.6, 1);
  }
  return out;
}

/** A return-stroke flicker: a bright first pulse, then a few weaker restrikes. */
function makePulses(): Pulse[] {
  const pulses: Pulse[] = [{ at: 0, peak: 1 }];
  let t = 0;
  const restrikes = Math.floor(rand(1, 4));
  for (let i = 0; i < restrikes; i++) {
    t += rand(55, 140);
    pulses.push({ at: t, peak: rand(0.45, 0.95) });
  }
  return pulses;
}

const intensity = (pulses: Pulse[], t: number, tau: number) =>
  pulses.reduce((m, p) => (t < p.at ? m : Math.max(m, p.peak * Math.exp(-(t - p.at) / tau))), 0);

/**
 * Occasional lightning over the hero: a procedurally generated bolt with
 * forks and restrike flicker, plus a sky flash. Distant strikes only light
 * up the clouds. Draws nothing between strikes; off when not visible or
 * when the user prefers reduced motion.
 */
export function Lightning({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const visible = useInView(canvasRef, { margin: "100px" });
  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const flash = flashRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !flash || !ctx || reduced) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const strike = (distant: boolean) => {
      const css = getComputedStyle(canvas);
      const core = css.getPropertyValue("--bolt-core").trim() || "white";
      const glow = css.getPropertyValue("--bolt-glow").trim() || "white";
      const blend = (css.getPropertyValue("--bolt-blend").trim() || "lighter") as GlobalCompositeOperation;
      const flashMax = parseFloat(css.getPropertyValue("--flash-max")) || 0.2;

      const bolt = distant ? [] : makeBolt(w, h);
      const pulses = makePulses();
      const fx = distant ? rand(10, 90) : (bolt[0].pts[0].x / w) * 100;
      flash.style.setProperty("--fx", `${fx}%`);
      flash.style.setProperty("--fr", distant ? "90%" : "65%");
      const flashPeak = distant ? flashMax * 0.55 : flashMax;
      const t0 = performance.now();

      if (!distant) window.dispatchEvent(new CustomEvent("hero:lightning"));

      // The bolt is drawn once; each frame only fades the canvas on the GPU.
      ctx.clearRect(0, 0, w, h);
      if (bolt.length) {
        ctx.globalCompositeOperation = blend;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (const c of bolt) {
          const n = c.pts.length - 1;
          const passes = [
            { color: glow, lw: 14, a: 0.08, blur: 0 },
            { color: glow, lw: 4.5, a: 0.4, blur: 18 },
            { color: core, lw: 1.6, a: 1, blur: 0 },
          ];
          for (const p of passes) {
            ctx.strokeStyle = p.color;
            ctx.shadowColor = p.blur ? glow : "transparent";
            ctx.shadowBlur = p.blur;
            ctx.lineWidth = p.lw * c.width;
            if (!c.taper) {
              ctx.globalAlpha = Math.min(1, p.a * c.alpha);
              ctx.beginPath();
              ctx.moveTo(c.pts[0].x, c.pts[0].y);
              for (let i = 1; i <= n; i++) ctx.lineTo(c.pts[i].x, c.pts[i].y);
              ctx.stroke();
            } else {
              // forks thin out and fade toward their tips
              for (let i = 1; i <= n; i++) {
                const k = 1 - i / n;
                ctx.globalAlpha = Math.min(1, p.a * c.alpha * k);
                ctx.lineWidth = p.lw * c.width * (0.4 + 0.6 * k);
                ctx.beginPath();
                ctx.moveTo(c.pts[i - 1].x, c.pts[i - 1].y);
                ctx.lineTo(c.pts[i].x, c.pts[i].y);
                ctx.stroke();
              }
            }
          }
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      const frame = (now: number) => {
        const t = now - t0;
        const sky = intensity(pulses, t, 70);
        // the channel itself lingers a little longer than the sky flash
        const glowI = intensity(pulses, t, 110);
        flash.style.opacity = String(sky * flashPeak);
        canvas.style.opacity = String(glowI);

        const last = pulses[pulses.length - 1].at;
        if (t < last + 600) raf = requestAnimationFrame(frame);
        else {
          ctx.clearRect(0, 0, w, h);
          flash.style.opacity = "0";
          canvas.style.opacity = "0";
        }
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    const schedule = (ms: number) => {
      timer = setTimeout(() => {
        if (visibleRef.current && !document.hidden) {
          const distant = Math.random() < 0.3;
          strike(distant);
          // sometimes a second bolt follows close behind
          if (!distant && Math.random() < 0.25) setTimeout(() => strike(false), rand(700, 1400));
        }
        schedule(rand(7000, 15000));
      }, ms);
    };
    schedule(2600);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 size-full opacity-0 will-change-[opacity]", className)}
      />
      <div
        ref={flashRef}
        aria-hidden
        className="lightning-flash pointer-events-none absolute inset-0 z-20 opacity-0"
      />
    </>
  );
}
