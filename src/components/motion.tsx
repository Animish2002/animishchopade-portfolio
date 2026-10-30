"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Splits text into characters that slide up from behind a mask. */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } }
    : { animate: "show" };

  return (
    <motion.span
      className={cn("inline-block", className)}
      aria-label={text}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((char, c) => (
            <span key={c} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%", rotate: 6 },
                  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {w < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </motion.span>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  children,
}: {
  index: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        {eyebrow}
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-7xl">
          {children}
        </h2>
      </Reveal>
    </div>
  );
}
