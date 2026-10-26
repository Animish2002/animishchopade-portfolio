"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const INK = "var(--ink)";
const HEAD: [number, number] = [120, 122];
const GROUND = 318;
const PETALS = 14;

// Broad cartoon leaf, base at (0,0), tip pointing right.
const LEAF = "M0 0 C 12 -30, 60 -38, 88 -10 C 66 14, 20 18, 0 0 Z";
const RIB = "M6 -2 C 30 -12, 56 -15, 80 -10";

function Leaf({ transform, gradient, delay }: { transform: string; gradient: string; delay: number }) {
  return (
    <g transform={transform}>
      <motion.g
        style={{ originX: 0, originY: 0.6 }}
        initial={{ scale: 0, rotate: 25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay, type: "spring", stiffness: 160, damping: 9 }}
      >
        <g className="sf-flutter" style={{ animationDelay: `${-delay}s` }}>
          <path d={LEAF} fill={`url(#${gradient})`} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d={RIB} stroke="var(--leaf-dark)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
        </g>
      </motion.g>
    </g>
  );
}

function Head({ delay, beat, face }: { delay: number; beat: number; face: string }) {
  return (
    <g transform={`translate(${HEAD[0]} ${HEAD[1]})`}>
      <motion.g
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 1.1, type: "spring", stiffness: 170, damping: 9 }}
      >
        <g className="sf-head">
          {/* glows right before it makes a sun, like in the game */}
          <motion.circle
            key={beat}
            r="78"
            fill="var(--pollen)"
            initial={{ opacity: 0 }}
            animate={{ opacity: beat ? [0, 0.45, 0] : 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ filter: "blur(10px)" }}
          />
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
          {/* face */}
          <motion.g
            style={{ originX: 0.5, originY: 0.5 }}
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 3.6, times: [0, 0.92, 0.96, 1], repeat: Infinity, delay: delay + 2 }}
          >
            <ellipse cx="-12" cy="-7" rx="4.6" ry="7.5" fill={INK} />
            <ellipse cx="12" cy="-7" rx="4.6" ry="7.5" fill={INK} />
            <circle cx="-13.5" cy="-10" r="1.8" fill="white" />
            <circle cx="10.5" cy="-10" r="1.8" fill="white" />
          </motion.g>
          <ellipse cx="-23" cy="8" rx="5.5" ry="3.5" fill="var(--blush)" opacity="0.5" />
          <ellipse cx="23" cy="8" rx="5.5" ry="3.5" fill="var(--blush)" opacity="0.5" />
          <path d="M-14 7 Q0 25 14 7 Q0 15 -14 7 Z" fill={INK} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      </motion.g>
    </g>
  );
}

type Sun = { id: number; dx: number; collected: boolean };

/** The sun the flower produces: pops out, drops beside it, and can be clicked to collect. */
function SunToken({ sun, glow, onCollect }: { sun: Sun; glow: string; onCollect: () => void }) {
  const fall = useMemo(
    () => ({
      x: [HEAD[0], HEAD[0] + sun.dx * 0.55, HEAD[0] + sun.dx],
      y: [HEAD[1], HEAD[1] - 55, GROUND - 22],
      scale: [0, 1, 1],
      opacity: 1,
    }),
    [sun.dx],
  );

  return (
    <motion.g
      initial={{ x: HEAD[0], y: HEAD[1], scale: 0, opacity: 1 }}
      animate={
        sun.collected
          ? { y: -160, x: HEAD[0] - 60, scale: 0.5, opacity: 0 }
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
      className="cursor-pointer"
    >
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ delay: 1.3, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle r="30" fill={`url(#${glow})`} />
        <g className="sf-spin">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d="M-4 -15 L0 -24 L4 -15 Z" transform={`rotate(${i * 45})`} fill="var(--pollen)" />
          ))}
        </g>
        <circle r="14" fill="var(--pollen)" />
        <circle r="9" fill="var(--sun-core)" />
        <circle cx="-4" cy="-4" r="3" fill="white" opacity="0.75" />
      </motion.g>
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
    </motion.g>
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
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  const pointer = useMotionValue(0);
  const wiggle = useMotionValue(0);
  const lean = useSpring(useTransform(pointer, [-1, 1], [-8, 8]), { stiffness: 60, damping: 12 });
  const tilt = useTransform(() => lean.get() + wiggle.get());

  useMotionValueEvent(tilt, "change", (v) => ref.current?.style.setProperty("--lean", `${v}deg`));

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
      if (!document.hidden) {
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
    <svg
      ref={ref}
      viewBox="0 0 240 345"
      aria-hidden
      onClick={boing}
      className={cn("cursor-pointer overflow-visible", className)}
    >
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

      {/* ground */}
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 14 }}
      >
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
      </motion.g>

      <g className="sf-lean">
        <g className="sf-sway">
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
          <Leaf transform={`translate(117 ${GROUND - 14}) scale(-1 1) rotate(-14)`} gradient={leaf} delay={delay + 0.55} />
          <Leaf transform={`translate(122 ${GROUND - 24}) rotate(-22)`} gradient={leaf} delay={delay + 0.7} />
          <Head delay={delay} beat={beat} face={face} />
        </g>
      </g>

      <AnimatePresence>
        {suns.map((s) => (
          <SunToken key={s.id} sun={s} glow={glow} onCollect={() => collect(s.id)} />
        ))}
      </AnimatePresence>
    </svg>
  );
}
