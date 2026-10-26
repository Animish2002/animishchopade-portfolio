"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "motion/react";
import { Reveal, SectionHeader } from "@/components/motion";
import { Vine } from "@/components/vine";
import { career, skills } from "@/data/portfolio";

// Where an entry meets the vine, from the top of its list item (level with the title).
const NODE_Y = 20;

export default function Career() {
  const ref = useRef<HTMLOListElement>(null);
  // Education sits at the top; the vine grows down through each role as you scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  // Where each entry's node sits on the vine, in px from the top of the list.
  const [nodes, setNodes] = useState<number[]>([]);
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const measure = () =>
      setNodes(Array.from(list.querySelectorAll<HTMLElement>(":scope > li"), (li) => li.offsetTop + NODE_Y));
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
        <Vine nodes={nodes} progress={grow} className="absolute -left-8 top-0 md:left-[calc(14rem-2rem)]" />

        {career.map((item) => (
          <li key={item.role + item.org} className="pb-16 last:pb-0 md:grid md:grid-cols-[14rem_1fr]">
            <div className="relative pl-10 md:pl-0 md:pr-10 md:text-right">
              <Reveal className="mb-3 pt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted md:mb-0">
                {item.period}
              </Reveal>
            </div>
            <div className="relative pl-10 md:pl-16">
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
