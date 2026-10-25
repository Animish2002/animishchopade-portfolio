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
import { HeroPlant } from "@/components/hero-plant";
import { DappledLight } from "@/components/dappled-light";
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
      className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-10 pt-28 sm:px-10 md:pb-14"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.05] blur-[140px]"
        style={{ left: gx, top: gy }}
      />
      <DappledLight />

      <motion.div
        className="relative z-10 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex size-2">
                        <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Open to work
        </span>
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
          <HeroPlant delay={1} className="mb-[1%] h-[clamp(9rem,26vw,24rem)] shrink-0" />
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
              className="group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition-colors hover:bg-accent-soft"
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
    <span>
      Pune, IN <span className="text-foreground">{time ?? "--:--"}</span> IST
    </span>
  );
}
