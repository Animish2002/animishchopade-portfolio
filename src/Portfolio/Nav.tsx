"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTheme } from "next-themes";
import {
  BriefcaseBusiness,
  Github,
  House,
  Mail,
  Moon,
  Sprout,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease } from "@/components/motion";

const links: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "top", label: "Home", icon: House },
  { id: "work", label: "Work", icon: BriefcaseBusiness },
  { id: "about", label: "About", icon: UserRound },
  { id: "career", label: "Career", icon: Sprout },
  { id: "contact", label: "Contact", icon: Mail },
];

/** macOS-style dock pinned to the bottom, with cursor magnification. */
export default function Nav() {
  const [active, setActive] = useState("top");
  const mouseX = useMotionValue(Infinity);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
      <motion.nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] md:bottom-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 1.4 }}
      >
        <div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="glass relative flex h-[52px] items-end gap-1 rounded-full px-1.5 pb-1.5"
        >
          {links.map((link) => (
            <DockItem
              key={link.id}
              mouseX={mouseX}
              label={link.label}
              href={`#${link.id}`}
              active={active === link.id}
            >
              <link.icon className="size-[42%]" strokeWidth={1.6} />
            </DockItem>
          ))}
          <span className="mx-1 mb-2 h-6 w-px self-end bg-foreground/10" />
          <DockItem
            mouseX={mouseX}
            label="GitHub"
            href="https://github.com/Animish2002"
            external
            className="hidden sm:flex"
          >
            <Github className="size-[42%]" strokeWidth={1.6} />
          </DockItem>
          <ThemeItem mouseX={mouseX} />
        </div>
      </motion.nav>
    </>
  );
}

function useMagnify(mouseX: MotionValue<number>) {
  const ref = useRef<HTMLElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - (box.left + box.width / 2) : Infinity;
  });
  const size = useSpring(useTransform(distance, [-120, 0, 120], [40, 52, 40]), {
    stiffness: 260,
    damping: 18,
    mass: 0.2,
  });
  return { ref, size };
}

function Tooltip({ show, label }: { show: boolean; label: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, y: 6, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 4, x: "-50%" }}
          transition={{ duration: 0.18 }}
          className="glass pointer-events-none absolute -top-10 left-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

const itemClass =
  "relative flex aspect-square items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground";

function DockItem({
  mouseX,
  label,
  href,
  active,
  external,
  className,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, size } = useMagnify(mouseX);
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      aria-label={label}
      aria-current={active ? "location" : undefined}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      style={{ width: size }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileTap={{ scale: 0.9 }}
      className={cn(itemClass, "isolate", active && "text-foreground", className)}
    >
      <Tooltip show={hover} label={label} />
      {active && (
        <motion.span
          layoutId="dock-active"
          className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-accent/20"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      {children}
    </motion.a>
  );
}

function ThemeItem({ mouseX }: { mouseX: MotionValue<number> }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);
  const { ref, size } = useMagnify(mouseX);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{ width: size }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileTap={{ scale: 0.9 }}
      className={cn(itemClass, "overflow-visible")}
    >
      <Tooltip show={hover} label={dark ? "Light mode" : "Dark mode"} />
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={dark ? "moon" : "sun"}
            className="flex size-[42%]"
            initial={{ y: 12, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -12, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            {dark ? <Moon className="size-full" strokeWidth={1.75} /> : <Sun className="size-full" strokeWidth={1.75} />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
