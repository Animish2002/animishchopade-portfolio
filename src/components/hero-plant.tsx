"use client";

import { useEffect, useId, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

// Chunky cartoon leaf, base at (0,0), tip pointing right.
const LEAF = "M0 0 C 8 -24, 52 -32, 80 -6 C 58 18, 16 20, 0 0 Z";
const SHINE = "M12 -5 C 28 -14, 50 -16, 66 -9";
const INK = "var(--ink)";

type LeafSpec = { x: number; y: number; left?: boolean; size: number; at: number };

// The stem is three segments; each bends around its own base so the plant
// moves like a whip in the wind rather than a stiff stick.
const segments = [
  {
    stem: "M120 258 Q117 224 120 190",
    origin: "120px 258px",
    sway: 2.5,
    leaves: [
      { x: 119, y: 226, size: 1.15, at: 0.55 },
      { x: 119, y: 208, left: true, size: 1.1, at: 0.7 },
    ],
  },
  {
    stem: "M120 190 Q124 157 120 124",
    origin: "120px 190px",
    sway: 4,
    leaves: [
      { x: 121, y: 166, left: true, size: 0.95, at: 0.95 },
      { x: 121, y: 146, size: 0.9, at: 1.1 },
    ],
  },
  {
    stem: "M120 124 Q116 97 120 72",
    origin: "120px 124px",
    sway: 6,
    leaves: [
      { x: 118, y: 104, size: 0.7, at: 1.35 },
      { x: 118, y: 90, left: true, size: 0.62, at: 1.5 },
    ],
  },
] satisfies { stem: string; origin: string; sway: number; leaves: LeafSpec[] }[];

function Leaf({ leaf, gradient, delay }: { leaf: LeafSpec; gradient: string; delay: number }) {
  const angle = leaf.left ? "scale(-1 1) rotate(-32)" : "rotate(-32)";
  return (
    <g transform={`translate(${leaf.x} ${leaf.y}) ${angle} scale(${leaf.size})`}>
      <motion.g
        style={{ originX: 0, originY: 0.6 }}
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + leaf.at, type: "spring", stiffness: 160, damping: 9 }}
      >
        <g className="plant-flutter" style={{ animationDelay: `${-leaf.at * 1.7}s` }}>
          <path d={LEAF} fill={`url(#${gradient})`} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d={SHINE} stroke="var(--leaf-light)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      </motion.g>
    </g>
  );
}

/** Nests each stem segment inside the one below it, so sways compound upward. */
function Segment({
  index,
  gradient,
  delay,
  children,
}: {
  index: number;
  gradient: string;
  delay: number;
  children?: React.ReactNode;
}) {
  const seg = segments[index];
  return (
    <g
      className="plant-bend"
      style={{
        transformOrigin: seg.origin,
        ["--sway" as string]: `${seg.sway}deg`,
        animationDelay: `${-index * 0.35}s`,
      }}
    >
      <motion.path
        d={seg.stem}
        stroke={INK}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.35 + index * 0.4, duration: 0.45, ease: "easeOut" }}
      />
      <motion.path
        d={seg.stem}
        stroke="var(--stem)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.35 + index * 0.4, duration: 0.45, ease: "easeOut" }}
      />
      {seg.leaves.map((leaf, i) => (
        <Leaf key={i} leaf={leaf} gradient={gradient} delay={delay} />
      ))}
      {children}
    </g>
  );
}

function Flower({ delay }: { delay: number }) {
  return (
    <g transform="translate(120 66)">
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 1.75, type: "spring", stiffness: 180, damping: 8 }}
      >
        <g className="plant-spin">
          {Array.from({ length: 6 }, (_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-13"
              rx="8"
              ry="12"
              transform={`rotate(${i * 60})`}
              fill="var(--petal)"
              stroke={INK}
              strokeWidth="2.5"
            />
          ))}
        </g>
        <circle r="8" fill="var(--pollen)" stroke={INK} strokeWidth="2.5" />
        <circle cx="-2.5" cy="-2.5" r="2.2" fill="white" opacity="0.7" />
      </motion.g>
      {/* pollen drifting up from the flower */}
      {[
        { x: -14, d: 0 },
        { x: 10, d: 1.3 },
        { x: -3, d: 2.4 },
        { x: 18, d: 3.4 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          r="2.2"
          fill="var(--pollen)"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: [0, p.x * 0.6, p.x], y: [0, -22, -48] }}
          transition={{ delay: delay + 2.4 + p.d, duration: 3, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
        />
      ))}
    </g>
  );
}

function FallingLeaf({ gradient, delay }: { gradient: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [126, 150, 118, 156],
        y: [150, 200, 250, 310],
        rotate: [0, 70, 150, 230],
      }}
      transition={{ delay: delay + 4, duration: 5.5, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
    >
      <g transform="scale(0.45)">
        <path d={LEAF} fill={`url(#${gradient})`} stroke={INK} strokeWidth="4" />
      </g>
    </motion.g>
  );
}

function Pot({ delay }: { delay: number }) {
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      initial={{ y: 30, scaleY: 0.6, opacity: 0 }}
      animate={{ y: 0, scaleY: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 11 }}
    >
      <ellipse cx="120" cy="338" rx="58" ry="5" fill="var(--ink)" opacity="0.25" />
      <path
        d="M66 268 H174 L162 326 Q160 334 152 334 H88 Q80 334 78 326 Z"
        fill="var(--pot)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M84 276 L92 322" stroke="var(--pot-light)" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <rect x="58" y="252" width="124" height="22" rx="9" fill="var(--pot-light)" stroke={INK} strokeWidth="3" />
      <ellipse cx="120" cy="256" rx="54" ry="5" fill="var(--soil)" />
      {/* face */}
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4.2, times: [0, 0.9, 0.95, 1], repeat: Infinity, delay: delay + 1 }}
      >
        <circle cx="104" cy="294" r="4" fill={INK} />
        <circle cx="136" cy="294" r="4" fill={INK} />
      </motion.g>
      <circle cx="96" cy="305" r="5" fill="var(--blush)" opacity="0.55" />
      <circle cx="144" cy="305" r="5" fill="var(--blush)" opacity="0.55" />
      <path d="M112 304 Q120 312 128 304" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
    </motion.g>
  );
}

/**
 * A cartoon potted plant for the hero. It pops up, grows, blooms, then keeps
 * swaying in the breeze, leans toward the cursor, and wiggles when clicked.
 */
export function HeroPlant({ className, delay = 0 }: { className?: string; delay?: number }) {
  const gradient = useId();
  const ref = useRef<SVGSVGElement>(null);

  const pointer = useMotionValue(0);
  const wiggle = useMotionValue(0);
  const lean = useSpring(useTransform(pointer, [-1, 1], [-9, 9]), { stiffness: 60, damping: 12 });
  const tilt = useTransform(() => lean.get() + wiggle.get());

  useMotionValueEvent(tilt, "change", (v) => ref.current?.style.setProperty("--lean", `${v}deg`));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const dx = (e.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
      pointer.set(Math.max(-1, Math.min(1, dx)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer]);

  const boing = () =>
    animate(wiggle, [0, -14, 11, -7, 4, 0], { duration: 0.9, ease: "easeOut" });

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 345"
      aria-hidden
      onClick={boing}
      className={cn("cursor-pointer overflow-visible", className)}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--leaf-dark)" />
          <stop offset="0.55" stopColor="var(--leaf)" />
          <stop offset="1" stopColor="var(--leaf-light)" />
        </linearGradient>
      </defs>

      <g className="plant-lean">
        <Segment index={0} gradient={gradient} delay={delay}>
          <Segment index={1} gradient={gradient} delay={delay}>
            <Segment index={2} gradient={gradient} delay={delay}>
              <Flower delay={delay} />
            </Segment>
          </Segment>
        </Segment>
      </g>
      <FallingLeaf gradient={gradient} delay={delay} />
      <Pot delay={delay} />
    </svg>
  );
}
