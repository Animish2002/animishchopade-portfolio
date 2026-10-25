"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader, ease } from "@/components/motion";
import { projects } from "@/data/portfolio";

const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 25, mass: 0.5 });

  const visible = projects
    .map((p, i) => ({ ...p, i }))
    .filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="work" className="px-5 py-28 sm:px-10 md:py-40">
      <SectionHeader index="01" eyebrow="Selected work">
        Things I&apos;ve <em className="pr-[0.12em] font-serif font-normal text-accent">planted</em> &amp; grown
      </SectionHeader>

      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative isolate rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === f ? "border-transparent text-accent-foreground" : "glass-subtle text-muted hover:text-foreground"
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <ul
        className="group/list border-b"
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, n) => (
            <motion.li
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.6, ease }}
              className="border-t transition-opacity duration-300 md:group-hover/list:opacity-35 md:hover:!opacity-100"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p.i)}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-4 py-6 md:grid-cols-[4rem_1fr_10rem_auto] md:py-8"
              >
                <div className="relative col-span-3 aspect-[16/9] overflow-hidden rounded-xl border md:hidden">
                  <Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover object-top" />
                </div>
                <span className="font-mono text-xs text-muted">{String(n + 1).padStart(2, "0")}</span>
                <div className="min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-3">
                  <h3 className="text-2xl font-medium tracking-tight md:text-4xl">{p.title}</h3>
                  <p className="mt-1.5 max-w-xl text-sm text-muted md:text-base">{p.description}</p>
                </div>
                <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted md:block">
                  {p.category}
                </span>
                <span className="flex size-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-foreground md:size-12">
                  <ArrowUpRight className="size-4 md:size-5" />
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Cursor-following preview (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-surface shadow-2xl"
          style={{ width: 380, height: 240 }}
          initial={false}
          animate={{ scale: hovered !== null ? 1 : 0, opacity: hovered !== null ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <motion.div
            className="flex flex-col"
            animate={{ y: `${-(hovered ?? 0) * 240}px` }}
            transition={{ duration: 0.6, ease }}
          >
            {projects.map((p) => (
              <div key={p.title} className="relative h-[240px] w-[380px] shrink-0">
                <Image src={p.image} alt="" fill sizes="380px" className="object-cover object-top" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
