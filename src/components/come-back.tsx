"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { comeBack } from "@/data/portfolio";

const MIN_AWAY_MS = 1500; // ignore quick flickers

/** Changes the tab title while the visitor is away and greets them dramatically when they return. */
export function ComeBack() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const original = document.title;
    let leftAt = 0;

    const onChange = () => {
      if (document.hidden) {
        leftAt = Date.now();
        document.title = comeBack.awayTitle;
      } else {
        document.title = original;
        if (leftAt && Date.now() - leftAt >= MIN_AWAY_MS) setOpen(true);
        leftAt = 0;
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      document.title = original;
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={comeBack.headline}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-black px-5 text-center text-white"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {comeBack.gif && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={comeBack.gif} alt="" className="absolute inset-0 size-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/45" />

          <h2 className="relative max-w-4xl text-[clamp(1.75rem,5.5vw,4.5rem)] font-semibold uppercase leading-[1] tracking-tight">
            {comeBack.headline}
          </h2>
          <p className="relative mt-5 max-w-xl text-sm font-medium text-white/85 md:text-base">{comeBack.subline}</p>
          <motion.button
            autoFocus
            onClick={() => setOpen(false)}
            animate={{ x: [0, -8, 8, -6, 6, -3, 3, 0], rotate: [0, -3, 3, -2, 2, -1, 1, 0] }}
            transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-tight text-black shadow-[0_8px_30px_rgba(0,0,0,0.45)] ring-4 ring-white/25 md:px-9 md:py-4 md:text-base"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{comeBack.button}</span>
            <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
