"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Cursor } from "@/components/cursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(false);

  // Smooth scrolling only when the visitor hasn't asked for reduced motion.
  useEffect(() => {
    setSmooth(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        {smooth && <ReactLenis root options={{ lerp: 0.1, anchors: true }} />}
        {children}
        <Cursor />
      </MotionConfig>
    </ThemeProvider>
  );
}
