"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/components/motion";

const LEAF = "M0 0 C 18 -22, 52 -24, 74 -4 C 52 14, 20 16, 0 0 Z";
const VEIN = "M4 -1 C 26 -6, 48 -7, 66 -4";

// Where each leaf sprouts along the stem, its angle, and when it unfolds.
const leaves = [
  { x: 101, y: 236, r: -28, flip: false, at: 0.7, size: 0.9 },
  { x: 99, y: 205, r: 205, flip: true, at: 0.9, size: 1 },
  { x: 103, y: 162, r: -38, flip: false, at: 1.1, size: 1.1 },
  { x: 101, y: 124, r: 215, flip: true, at: 1.3, size: 0.95 },
  { x: 101, y: 86, r: -50, flip: false, at: 1.5, size: 0.75 },
  { x: 100, y: 62, r: 230, flip: true, at: 1.65, size: 0.6 },
];

/** Leaf gradient: deep green at the base fading to fresh green at the tip. */
function LeafGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="74" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="var(--leaf-dark)" />
        <stop offset="0.55" stopColor="var(--leaf)" />
        <stop offset="1" stopColor="var(--leaf-light)" />
      </linearGradient>
    </defs>
  );
}

function LeafShape({ id, edge = 1.2 }: { id: string; edge?: number }) {
  return (
    <>
      <path d={LEAF} fill={`url(#${id})`} stroke="var(--leaf-dark)" strokeWidth={edge} />
      <path d={VEIN} stroke="var(--leaf-light)" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" fill="none" />
    </>
  );
}

/**
 * A sprout that grows from the ground: the stem draws upward, then each leaf
 * unfolds from its base. Afterwards the whole plant sways gently.
 */
export function Sprout({
  className,
  delay = 0,
  inView = false,
}: {
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const id = useId();
  const trigger = inView
    ? { whileInView: "grow", viewport: { once: true, margin: "-15% 0px" } }
    : { animate: "grow" };

  return (
    <motion.svg
      viewBox="0 0 200 300"
      fill="none"
      aria-hidden
      className={cn("overflow-visible", className)}
      initial="seed"
      {...trigger}
    >
      <LeafGradient id={id} />
      {/* soil */}
      <motion.ellipse
        cx="100"
        cy="296"
        rx="44"
        ry="4"
        fill="var(--soil)"
        variants={{
          seed: { opacity: 0, scaleX: 0 },
          grow: { opacity: 0.5, scaleX: 1, transition: { delay, duration: 0.8, ease } },
        }}
      />
      <g className="animate-sway" style={{ transformOrigin: "100px 296px" }}>
        <motion.path
          d="M100 296 C 100 250, 96 220, 102 180 S 98 110, 100 48"
          stroke="var(--stem)"
          strokeWidth="3"
          strokeLinecap="round"
          variants={{
            seed: { pathLength: 0 },
            grow: { pathLength: 1, transition: { delay, duration: 1.6, ease } },
          }}
        />
        {leaves.map((l, i) => (
          <g
            key={i}
            transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.size} ${l.flip ? -l.size : l.size})`}
          >
            <motion.g
              style={{ transformOrigin: "0px 0px" }}
              variants={{
                seed: { scale: 0, rotate: -40 },
                grow: {
                  scale: 1,
                  rotate: 0,
                  transition: { delay: delay + l.at, type: "spring", stiffness: 120, damping: 12 },
                },
              }}
            >
              <LeafShape id={id} />
            </motion.g>
          </g>
        ))}
        {/* bud */}
        <motion.circle
          cx="100"
          cy="46"
          r="5"
          fill="var(--leaf-light)"
          variants={{
            seed: { scale: 0 },
            grow: { scale: 1, transition: { delay: delay + 1.8, type: "spring", stiffness: 200, damping: 10 } },
          }}
        />
      </g>
    </motion.svg>
  );
}

/** A small leaf that unfurls when it scrolls into view — used as a timeline node. */
export function Leaf({ className, flip = false }: { className?: string; flip?: boolean }) {
  const id = useId();
  return (
    <motion.svg
      viewBox="-4 -26 82 44"
      aria-hidden
      className={cn("overflow-visible", className)}
      initial={{ scale: 0, rotate: flip ? 60 : -60 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      style={{ originX: 0, originY: 0.6 }}
    >
      <LeafGradient id={id} />
      <g transform={flip ? "scale(1 -1)" : undefined}>
        <LeafShape id={id} edge={2} />
      </g>
    </motion.svg>
  );
}
