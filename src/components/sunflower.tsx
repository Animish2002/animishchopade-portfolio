"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const INK = "var(--ink)";
const W = 240;
const H = 345;
const HEAD: [number, number] = [120, 122];
const GROUND = 318;
const PETALS = 14;

// Broad cartoon leaf, base at (0,0), tip pointing right.
const LEAF = "M0 0 C 12 -30, 60 -38, 88 -10 C 66 14, 20 18, 0 0 Z";
const RIB = "M6 -2 C 30 -12, 56 -15, 80 -10";

const pctX = (x: number) => `${(x / W) * 100}%`;
const pctY = (y: number) => `${(y / H) * 100}%`;

/**
 * One stacked layer of the flower. Animating a group inside an svg re-lays out
 * everything under it each frame, so every moving part is its own svg and only
 * ever moves as a whole, which the GPU does without touching the main thread.
 */
function Layer({ className, children, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full overflow-visible", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

function Leaf({
  x,
  y,
  transform,
  gradient,
  delay,
}: {
  x: number;
  y: number;
  transform: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ originX: x / W, originY: y / H }}
      initial={{ scale: 0, rotate: 25 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, type: "spring", stiffness: 160, damping: 9 }}
    >
      <Layer className="sf-flutter" style={{ transformOrigin: `${pctX(x)} ${pctY(y)}`, animationDelay: `${-delay}s` }}>
        <g transform={`translate(${x} ${y}) ${transform}`}>
          <path d={LEAF} fill={`url(#${gradient})`} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d={RIB} stroke="var(--leaf-dark)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
        </g>
      </Layer>
    </motion.div>
  );
}

function Head({ delay, beat, face, glow }: { delay: number; beat: number; face: string; glow: string }) {
  const at = `translate(${HEAD[0]} ${HEAD[1]})`;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ originX: HEAD[0] / W, originY: HEAD[1] / H }}
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: delay + 1.1, type: "spring", stiffness: 170, damping: 9 }}
    >
      <div className="sf-head absolute inset-0">
        {/* glows right before it makes a sun, like in the game */}
        <motion.div
          key={beat}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: beat ? [0, 0.65, 0] : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <Layer>
            <circle cx={HEAD[0]} cy={HEAD[1]} r="92" fill={`url(#${glow})`} />
          </Layer>
        </motion.div>
        <Layer>
          <g transform={at}>
            {Array.from({ length: PETALS }, (_, i) => (
              <ellipse
                key={`b${i}`}
                cy="-50"
                rx="11"
                ry="22"
                transform={`rotate(${(i + 0.5) * (360 / PETALS)})`}
                fill="var(--petal-dark)"
                stroke={INK}
                strokeWidth="2.5"
              />
            ))}
            {Array.from({ length: PETALS }, (_, i) => (
              <ellipse
                key={`f${i}`}
                cy="-46"
                rx="10"
                ry="20"
                transform={`rotate(${i * (360 / PETALS)})`}
                fill="var(--petal)"
                stroke={INK}
                strokeWidth="2.5"
              />
            ))}
            <circle r="38" fill={`url(#${face})`} stroke={INK} strokeWidth="3" />
            <circle r="31" fill="none" stroke="var(--face-dark)" strokeWidth="2.5" opacity="0.45" />
            <ellipse cx="-23" cy="8" rx="5.5" ry="3.5" fill="var(--blush)" opacity="0.5" />
            <ellipse cx="23" cy="8" rx="5.5" ry="3.5" fill="var(--blush)" opacity="0.5" />
            <path d="M-14 7 Q0 25 14 7 Q0 15 -14 7 Z" fill={INK} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          </g>
        </Layer>
        {/* eyes */}
        <Layer className="sf-blink" style={{ animationDelay: `${delay + 2}s` }}>
          <g transform={at}>
            <ellipse cx="-12" cy="-7" rx="4.6" ry="7.5" fill={INK} />
            <ellipse cx="12" cy="-7" rx="4.6" ry="7.5" fill={INK} />
            <circle cx="-13.5" cy="-10" r="1.8" fill="white" />
            <circle cx="10.5" cy="-10" r="1.8" fill="white" />
          </g>
        </Layer>
      </div>
    </motion.div>
  );
}

type Sun = { id: number; dx: number; collected: boolean };

/** The sun the flower produces: pops out, drops beside it, and can be clicked to collect. */
function SunToken({ sun, glow, onCollect }: { sun: Sun; glow: string; onCollect: () => void }) {
  const fall = useMemo(
    () => ({
      x: ["0%", pctX(sun.dx * 0.55), pctX(sun.dx)],
      y: ["0%", pctY(-55), pctY(GROUND - 22 - HEAD[1])],
      scale: [0, 1, 1],
      opacity: 1,
    }),
    [sun.dx],
  );
  const at = `translate(${HEAD[0]} ${HEAD[1]})`;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ originX: HEAD[0] / W, originY: HEAD[1] / H }}
      initial={{ x: "0%", y: "0%", scale: 0, opacity: 1 }}
      animate={
        sun.collected
          ? { y: pctY(-160 - HEAD[1]), x: pctX(-60), scale: 0.5, opacity: 0 }
          : fall
      }
      exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.5 } }}
      transition={
        sun.collected
          ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
          : { duration: 1.3, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"] }
      }
      onClick={(e) => {
        e.stopPropagation();
        onCollect();
      }}
    >
      <div className="sf-float absolute inset-0">
        <Layer>
          <circle cx={HEAD[0]} cy={HEAD[1]} r="30" fill={`url(#${glow})`} />
        </Layer>
        <Layer className="sf-spin">
          <g transform={at}>
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d="M-4 -15 L0 -24 L4 -15 Z" transform={`rotate(${i * 45})`} fill="var(--pollen)" />
            ))}
          </g>
        </Layer>
        <Layer>
          <g transform={at}>
            <circle r="14" fill="var(--pollen)" />
            <circle r="9" fill="var(--sun-core)" />
            <circle cx="-4" cy="-4" r="3" fill="white" opacity="0.75" />
            <circle r="30" fill="transparent" className="pointer-events-auto cursor-pointer" />
            {sun.collected && (
              <motion.text
                y="-34"
                textAnchor="middle"
                className="font-mono text-[15px] font-semibold"
                fill="var(--foreground)"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: [0, 1, 0], y: -50 }}
                transition={{ duration: 0.8 }}
              >
                +25
              </motion.text>
            )}
          </g>
        </Layer>
      </div>
    </motion.div>
  );
}

/**
 * A Plants vs. Zombies style sunflower for the hero. It sprouts, bobs to its
 * own beat, leans toward the cursor, flinches at lightning, wiggles when
 * clicked, and every so often produces a sun you can collect.
 */
export function Sunflower({ className, delay = 0 }: { className?: string; delay?: number }) {
  const uid = useId();
  const leaf = `${uid}-leaf`;
  const face = `${uid}-face`;
  const glow = `${uid}-glow`;
  const ref = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  const reduced = useReducedMotion();

  const pointer = useMotionValue(0);
  const wiggle = useMotionValue(0);
  const lean = useSpring(useTransform(pointer, [-1, 1], [-8, 8]), { stiffness: 60, damping: 12 });
  const tilt = useTransform(() => lean.get() + wiggle.get());

  useMotionValueEvent(tilt, "change", (v) => leanRef.current?.style.setProperty("--lean", `${v}deg`));

  const boing = () => animate(wiggle, [0, -14, 11, -7, 4, 0], { duration: 0.9, ease: "easeOut" });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const dx = (e.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
      pointer.set(Math.max(-1, Math.min(1, dx)));
    };
    const onStrike = () => animate(wiggle, [0, -9, 7, -4, 2, 0], { duration: 0.7, ease: "easeOut" });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("hero:lightning", onStrike);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("hero:lightning", onStrike);
    };
  }, [pointer, wiggle]);

  // Sun production loop
  const [beat, setBeat] = useState(0);
  const [suns, setSuns] = useState<Sun[]>([]);
  useEffect(() => {
    if (reduced) return;
    let n = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    const produce = () => {
      if (visibleRef.current && !document.hidden) {
        const id = ++n;
        setBeat(id);
        later(() => {
          const dx = (id % 2 ? 1 : -1) * (70 + (id % 3) * 12);
          setSuns((s) => (s.length >= 3 ? s : [...s, { id, dx, collected: false }]));
        }, 550);
        later(() => setSuns((s) => s.filter((x) => x.id !== id)), 10_000);
      }
      later(produce, 9_000);
    };
    later(produce, (delay + 4) * 1000);
    return () => timers.forEach(clearTimeout);
  }, [reduced, delay]);

  const collect = (id: number) => {
    setSuns((s) => s.map((x) => (x.id === id ? { ...x, collected: true } : x)));
    setTimeout(() => setSuns((s) => s.filter((x) => x.id !== id)), 850);
  };

  return (
    <div
      ref={ref}
      aria-hidden
      onClick={boing}
      className={cn("relative aspect-[240/345] cursor-pointer", className)}
      style={{ ["--sf-state" as string]: visible ? "running" : "paused" }}
    >
      <svg aria-hidden className="absolute size-0">
        <defs>
          <linearGradient id={leaf} x1="0" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--leaf-dark)" />
            <stop offset="0.55" stopColor="var(--leaf)" />
            <stop offset="1" stopColor="var(--leaf-light)" />
          </linearGradient>
          <radialGradient id={face} cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="var(--face-light)" />
            <stop offset="1" stopColor="var(--face)" />
          </radialGradient>
          <radialGradient id={glow}>
            <stop offset="0.3" stopColor="var(--pollen)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--pollen)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ground */}
      <motion.div
        className="absolute inset-0"
        style={{ originX: 0.5, originY: 1 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 14 }}
      >
        <Layer>
          <ellipse cx="120" cy={GROUND + 14} rx="74" ry="6" fill={INK} opacity="0.2" />
          <path
            d={`M48 ${GROUND + 8} Q120 ${GROUND - 18} 192 ${GROUND + 8} Z`}
            fill="var(--soil)"
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {[62, 90, 156, 178].map((x, i) => (
            <path
              key={x}
              d={`M${x} ${GROUND + 2} l${i % 2 ? 3 : -3} -12 M${x + 5} ${GROUND + 1} l${i % 2 ? -2 : 2} -9`}
              stroke="var(--leaf)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </Layer>
      </motion.div>

      <div ref={leanRef} className="sf-lean absolute inset-0">
        <div className="sf-sway absolute inset-0">
          <Layer>
            {[11, 7].map((w, i) => (
              <motion.path
                key={w}
                d={`M120 ${GROUND} C 112 262, 130 196, ${HEAD[0]} ${HEAD[1] + 10}`}
                stroke={i ? "var(--stem)" : INK}
                strokeWidth={w}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </Layer>
          <Leaf x={117} y={GROUND - 14} transform="scale(-1 1) rotate(-14)" gradient={leaf} delay={delay + 0.55} />
          <Leaf x={122} y={GROUND - 24} transform="rotate(-22)" gradient={leaf} delay={delay + 0.7} />
          <Head delay={delay} beat={beat} face={face} glow={glow} />
        </div>
      </div>

      <AnimatePresence>
        {suns.map((s) => (
          <SunToken key={s.id} sun={s} glow={glow} onCollect={() => collect(s.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
