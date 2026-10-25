"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease } from "@/components/motion";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: hidden ? 0 : 0.2 }}
      >
        <nav className="flex items-center gap-1 rounded-full border bg-surface/70 p-1.5 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-xl">
          <a
            href="#top"
            className="hidden size-8 items-center justify-center rounded-full bg-accent font-mono text-[11px] font-semibold text-accent-foreground sm:flex"
            aria-label="Back to top"
          >
            AC
          </a>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-[13px] transition-colors sm:px-4 sm:text-sm",
                active === link.id ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {link.label}
            </a>
          ))}
          <span className="mx-1 h-5 w-px bg-line" />
          <ThemeToggle />
        </nav>
      </motion.header>
    </>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative flex size-8 items-center justify-center overflow-hidden rounded-full text-muted transition-colors hover:text-foreground"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ y: 20, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
