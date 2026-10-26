"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SplitText, ease } from "@/components/motion";
import { Sunflower } from "@/components/sunflower";
import { DappledLight } from "@/components/dappled-light";
import { Lightning } from "@/components/lightning";
import { profile } from "@/data/portfolio";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Soft green glow that trails the cursor.
  const mx = useMotionValue(0.7);
  const my = useMotionValue(0.4);
  const gx = useSpring(useTransform(mx, (v) => `${v * 100}%`), { stiffness: 60, damping: 20 });
  const gy = useSpring(useTransform(my, (v) => `${v * 100}%`), { stiffness: 60, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-28 pt-8 sm:px-10 md:pb-32 md:pt-10"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.05] blur-[140px]"
        style={{ left: gx, top: gy }}
      />
      <DappledLight />
      <Lightning />

      <motion.div
        className="relative z-10 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <Availability />
        <Clock />
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 mt-auto">
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-[clamp(3.6rem,15vw,13.5rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
            <SplitText text="Animish" delay={0.4} />
            <br />
            <SplitText
              text="Chopade"
              delay={0.65}
              className="font-serif font-normal italic tracking-[-0.03em] text-accent"
            />
          </h1>
          <Sunflower delay={1} className="mb-[1%] h-[clamp(9rem,26vw,24rem)] shrink-0" />
        </div>

        <motion.div
          className="mt-10 grid gap-8 border-t pt-8 sm:grid-cols-2 sm:items-end lg:grid-cols-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.2 }}
        >
          <p className="max-w-md text-lg leading-relaxed text-muted sm:col-span-2 md:text-xl lg:col-span-6">
            <span className="text-foreground">Full-stack developer</span> building fast, thoughtful
            web products — from the first pixel to the database.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted lg:col-span-3">
            Currently
            <br />
            <span className="text-foreground">{profile.current}</span>
          </p>
          <div className="flex gap-3 whitespace-nowrap sm:justify-end lg:col-span-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              See work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="glass-subtle relative group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors hover:bg-accent-soft"
            >
              Say hi
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const openTo = ["full-time roles", "freelance projects", "collaborations"];

/**
 * Frosted status badge: live dot plus a cycling list of what I'm open to.
 * Every word sits in the same grid cell, so the badge is always as wide as
 * the longest one and never resizes; only transform/opacity animate.
 */
function Availability() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % openTo.length), 2600);
    return () => clearInterval(id);
  }, []);
  const prev = (i - 1 + openTo.length) % openTo.length;

  return (
    <a
      href="#contact"
      className="glass-subtle glass-static group relative flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-3 font-sans text-[13px] normal-case tracking-normal text-foreground/90 transition-colors hover:text-foreground"
    >
      <span className="relative flex size-2.5 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40 [animation-duration:1.8s]" />
        <span className="relative size-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
      </span>
      <span className="text-muted">Available for</span>
      <span className="grid h-5 overflow-hidden">
        {openTo.map((label, n) => {
          const state = n === i ? "in" : n === prev ? "out" : "wait";
          return (
            <motion.span
              key={label}
              aria-hidden={state !== "in"}
              className="col-start-1 row-start-1 whitespace-nowrap leading-5"
              initial={false}
              animate={{
                y: state === "in" ? "0%" : state === "out" ? "-100%" : "100%",
                opacity: state === "in" ? 1 : 0,
              }}
              transition={state === "wait" ? { duration: 0 } : { duration: 0.5, ease }}
            >
              {label}
            </motion.span>
          );
        })}
      </span>
      <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </a>
  );
}

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hidden sm:inline">
      Pune, IN <span className="text-foreground">{time ?? "--:--"}</span> IST
    </span>
  );
}
