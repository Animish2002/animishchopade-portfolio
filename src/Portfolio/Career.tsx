"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal, SectionHeader } from "@/components/motion";
import { Leaf } from "@/components/plant";
import { career, skills } from "@/data/portfolio";

export default function Career() {
  const ref = useRef<HTMLOListElement>(null);
  // Roots (education) sit at the bottom, so the vine grows upward as you scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end end"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const budScale = useTransform(grow, [0.96, 1], [0, 1], { clamp: true });

  // Where each leaf sits along the vine, measured from the roots (0) to the tip (1).
  const [stops, setStops] = useState<number[]>([]);
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const measure = () =>
      setStops(
        Array.from(list.querySelectorAll("li"), (li) =>
          1 - (li.offsetTop + 12) / list.offsetHeight
        )
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="career" className="px-5 py-28 sm:px-10 md:py-40">
      <SectionHeader index="03" eyebrow="Career">
        How it <em className="font-serif font-normal text-accent">grew</em>
      </SectionHeader>

      <ol ref={ref} className="relative">
        {/* The vine: a stem that grows up from the roots as you scroll */}
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line md:left-56" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[-0.5px] top-0 w-[2px] origin-bottom rounded-full bg-stem md:left-[calc(14rem-0.5px)]"
          style={{ scaleY: grow }}
        />
        {/* Bud that opens at the tip once the vine reaches the present */}
        <motion.span
          aria-hidden
          className="absolute -top-1.5 left-[-4.5px] size-2.5 rounded-full bg-leaf-light md:left-[calc(14rem-4.5px)]"
          style={{ scale: budScale }}
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
                progress={grow}
                at={stops[i] ?? 1}
                className="absolute left-0 top-5 w-9 -translate-y-[80%] md:w-11"
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
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
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
