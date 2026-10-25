"use client";

import { useRef } from "react";
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
      x,
      y,
      rotate: angleAt(from, bend, to, t) + side * (38 + jitter(seed + i) * 22),
      scale: 1.2 + jitter(seed + i * 3) * 0.7 + t * 0.3,
      delay: -jitter(seed + i * 7) * 4,
    };
  });
}

const branches = [
  { from: [960, -60] as Pt, bend: [720, 160] as Pt, to: [430, 560] as Pt, count: 13, seed: 1, delay: "0s" },
  { from: [990, 230] as Pt, bend: [850, 330] as Pt, to: [640, 660] as Pt, count: 9, seed: 9, delay: "-4s" },
].map((b) => ({ ...b, leaves: makeBranch(b.from, b.bend, b.to, b.count, b.seed) }));

/**
 * Sunlight through a window falling on the wall, with the soft shadows of
 * swaying leaves passing across it. Pure CSS/SVG; animation pauses off-screen.
 */
export function DappledLight({ className }: { className?: string }) {
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
        <svg
          viewBox="0 0 900 600"
          preserveAspectRatio="xMidYMid slice"
          className="dl-shadow absolute inset-0 size-full"
        >
          {branches.map((b, bi) => (
            <g
              key={bi}
              className="dl-sway"
              style={{ transformOrigin: `${b.from[0]}px ${b.from[1]}px`, animationDelay: b.delay }}
            >
              <path
                d={`M${b.from[0]} ${b.from[1]} Q${b.bend[0]} ${b.bend[1]} ${b.to[0]} ${b.to[1]}`}
                stroke="var(--sun-shade)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {b.leaves.map((l, li) => (
                <g key={li} transform={`translate(${l.x} ${l.y}) rotate(${l.rotate}) scale(${l.scale})`}>
                  <path
                    d={LEAF}
                    className="dl-flutter"
                    fill="var(--sun-shade)"
                    style={{ animationDelay: `${l.delay}s` }}
                  />
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
