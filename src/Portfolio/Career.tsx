"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal, SectionHeader } from "@/components/motion";
import { Leaf } from "@/components/plant";
import { career, skills } from "@/data/portfolio";

export default function Career() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="career" className="px-5 py-28 sm:px-10 md:py-40">
      <SectionHeader index="03" eyebrow="Career">
        How it <em className="font-serif font-normal text-accent">grew</em>
      </SectionHeader>

      <ol ref={ref} className="relative">
        {/* The vine: a stem that grows down as you scroll */}
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line md:left-56" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[-0.5px] top-0 w-[2px] origin-top rounded-full bg-accent md:left-[calc(14rem-0.5px)]"
          style={{ scaleY: grow }}
        />

        {career.map((item, i) => (
          <li key={item.role + item.org} className="pb-16 last:pb-0 md:grid md:grid-cols-[14rem_1fr]">
            <div className="relative pl-10 md:pl-0 md:pr-10 md:text-right">
              <Reveal className="mb-3 pt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted md:mb-0">
                {item.period}
              </Reveal>
            </div>
            <div className="relative pl-10 md:pl-16">
              <Leaf
                flip={i % 2 === 1}
                className="absolute left-0 top-3 w-9 -translate-y-1/2 md:w-11"
              />
              <Reveal>
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {item.role} <span className="text-muted">— {item.org}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-muted md:text-lg">{item.description}</p>
              </Reveal>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-32 border-t pt-14">
        <Reveal className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Toolkit
        </Reveal>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.06}>
              <div className="mb-4 text-sm text-accent">{group}</div>
              <ul className="space-y-2">
                {items.map((s) => (
                  <li key={s} className="text-muted transition-colors hover:text-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
