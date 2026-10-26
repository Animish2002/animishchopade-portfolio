"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const INTERACTIVE = "a, button, [role='button'], summary, label, select, .cursor-pointer";
const TEXT_ENTRY = "input, textarea, [contenteditable='true']";

type State = { mode: "default" | "hover" | "label" | "text"; label?: string };

const SIZE = { default: 12, hover: 44, label: 84, text: 0 };

/**
 * One soft blob that inverts whatever it sits on, so it reads on any
 * background. It swells over clickable things, turns into a labelled bubble
 * over elements with `data-cursor="…"`, squeezes on press, and gives text
 * fields back the native caret. Mouse-driven devices only.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<State>({ mode: "default" });
  const [shown, setShown] = useState(false);
  const [down, setDown] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 900, damping: 55, mass: 0.35 });
  const y = useSpring(my, { stiffness: 900, damping: 55, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX);
      my.set(e.clientY);
      setShown(true);

      const el = e.target as Element | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      const next: State = el?.closest(TEXT_ENTRY)
        ? { mode: "text" }
        : labelled
          ? { mode: "label", label: labelled.dataset.cursor }
          : el?.closest(INTERACTIVE)
            ? { mode: "hover" }
            : { mode: "default" };
      setState((s) => (s.mode === next.mode && s.label === next.label ? s : next));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setShown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  const label = state.mode === "label";
  const size = SIZE[state.mode];

  return (
    <motion.div
      aria-hidden
      // The blend has to live on the fixed element itself: a wrapper would
      // form its own stacking context and there'd be nothing to invert.
      className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full ${
        label ? "bg-accent text-accent-foreground" : "bg-white mix-blend-difference"
      }`}
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{
        width: size,
        height: size,
        opacity: shown && state.mode !== "text" ? 1 : 0,
        scale: down ? 0.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 30, opacity: { duration: 0.15 } }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            key={state.label}
            className="flex items-center gap-0.5 whitespace-nowrap text-[13px] font-medium"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.1 } }}
            transition={{ delay: 0.05, duration: 0.2 }}
          >
            {state.label}
            <ArrowUpRight className="size-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
