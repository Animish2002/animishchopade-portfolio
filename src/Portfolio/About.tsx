"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
} from "motion/react";
import { PhotoReel } from "@/components/photo-reel";
import { Reveal, ScrollText, SectionHeader } from "@/components/motion";
import { profile, projects, services } from "@/data/portfolio";

const stats = [
  { value: 2, suffix: "+", label: "Years building" },
  { value: projects.length, suffix: "", label: "Projects shipped" },
  { value: 1, suffix: "", label: "Patent project" },
];

export default function About() {
  return (
    <section id="about" className="px-5 py-28 sm:px-10 md:py-40">
      <SectionHeader index="02" eyebrow="About">
        Rooted in <em className="font-serif font-normal text-accent">craft</em>
      </SectionHeader>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="md:max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border">
            <PhotoReel />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between glass rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em]">
              <span>{profile.name}</span>
              <span className="text-accent">Pune, IN</span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <ScrollText
            className="text-2xl font-medium leading-snug tracking-tight md:text-4xl"
            text="I'm a full-stack developer who loves building user-friendly, efficient applications — bringing ideas to life on both the frontend and the backend with modern tools."
          />
          <Reveal className="mt-8 max-w-xl text-muted md:text-lg">
            I&apos;m always eager to learn, solve problems and build things that make a difference.
            Whether it&apos;s sharpening functionality or polishing the experience, I enjoy new
            challenges and growing as a developer — one commit at a time.
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-4 border-y py-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-medium tracking-tight md:text-6xl">
                  <Counter to={s.value} />
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {s.title}
                </div>
                <p className="mb-4 text-muted">{s.description}</p>
                <p className="text-sm leading-7">{s.stack.join("  /  ")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}
