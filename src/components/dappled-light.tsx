"use client";

import { useId, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { LEAF } from "@/components/plant";

type Pt = [number, number];

const at = (a: Pt, b: Pt, c: Pt, t: number): Pt => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t ** 2 * c[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t ** 2 * c[1],
];

const angleAt = (a: Pt, b: Pt, c: Pt, t: number) => {
  const dx = 2 * (1 - t) * (b[0] - a[0]) + 2 * t * (c[0] - b[0]);
  const dy = 2 * (1 - t) * (b[1] - a[1]) + 2 * t * (c[1] - b[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

// Rounded so server and client agree; their trig can differ in the last digits.
const round = (n: number) => Math.round(n * 100) / 100;

// Deterministic jitter so server and client render the same branch.
const jitter = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Lays leaves alternately along a curved stem, angled forward like a real twig. */
function makeBranch(from: Pt, bend: Pt, to: Pt, count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = 0.12 + (i / (count - 1)) * 0.86;
    const [x, y] = at(from, bend, to, t);
    const side = i % 2 === 0 ? 1 : -1;
    return {
      x: round(x),
      y: round(y),
      rotate: round(angleAt(from, bend, to, t) + side * (38 + jitter(seed + i) * 22)),
      scale: round(1.2 + jitter(seed + i * 3) * 0.7 + t * 0.3),
    };
  });
}

const branches = [
  { from: [960, -60] as Pt, bend: [720, 160] as Pt, to: [430, 560] as Pt, count: 13, seed: 1, delay: "0s" },
  { from: [990, 230] as Pt, bend: [850, 330] as Pt, to: [640, 660] as Pt, count: 9, seed: 9, delay: "-4s" },
].map((b) => ({ ...b, leaves: makeBranch(b.from, b.bend, b.to, b.count, b.seed) }));

/**
 * Sunlight through a window falling on the wall, with the soft shadows of
 * swaying leaves passing across it. Each branch is its own svg, blurred inside
 * the svg, so the blur is painted once and the sway only moves a GPU layer.
 * Pure CSS/SVG; animation pauses off-screen.
 */
export function DappledLight({ className }: { className?: string }) {
  const blur = useId();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ ["--dl-state" as string]: visible ? "running" : "paused" }}
    >
      <div className="dl-window absolute -right-[60%] top-[4%] aspect-[3/2] w-[150%] sm:-right-[30%] sm:w-[110%] md:-right-[10%] md:top-[8%] md:w-[70%]">
        {/* Light: window panes plus a halo of bounced light, very soft at the edges */}
        <div className="dl-light absolute inset-0">
          <div className="absolute inset-[6%] rounded-full bg-sun opacity-30" />
          <div className="absolute inset-[17%] grid grid-cols-2 grid-rows-2 gap-x-[5%] gap-y-[7%]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-md bg-sun" />
            ))}
          </div>
        </div>
        {/* Shadows: leaves between the window and the wall, only slightly out of focus */}
        {branches.map((b, bi) => (
          <svg
            key={bi}
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid slice"
            className="dl-sway absolute inset-0 size-full overflow-visible"
            style={{
              transformOrigin: `${round((b.from[0] / 900) * 100)}% ${round((b.from[1] / 600) * 100)}%`,
              animationDelay: b.delay,
            }}
          >
            <filter id={`${blur}-${bi}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <g filter={`url(#${blur}-${bi})`}>
              <path
                d={`M${b.from[0]} ${b.from[1]} Q${b.bend[0]} ${b.bend[1]} ${b.to[0]} ${b.to[1]}`}
                stroke="var(--sun-shade)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {b.leaves.map((l, li) => (
                <path
                  key={li}
                  d={LEAF}
                  fill="var(--sun-shade)"
                  transform={`translate(${l.x} ${l.y}) rotate(${l.rotate}) scale(${l.scale})`}
                />
              ))}
            </g>
          </svg>
        ))}
      </div>
    </div>
  );
}
