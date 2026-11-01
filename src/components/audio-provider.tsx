"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { audio } from "@/data/portfolio";

type AudioCtx = {
  ambientOn: boolean;
  toggleAmbient: () => void;
  /** Fade the background track out while something louder (the meme clip) plays. */
  duck: (on: boolean) => void;
};

const Ctx = createContext<AudioCtx | null>(null);
export const useSiteAudio = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSiteAudio must be used inside AudioProvider");
  return c;
};

const VOLUME = 0.18;

function fade(el: HTMLAudioElement, to: number, ms = 600, done?: () => void) {
  const from = el.volume;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    el.volume = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(tick);
    else done?.();
  };
  requestAnimationFrame(tick);
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLAudioElement | null>(null);
  const [ambientOn, setAmbientOn] = useState(false);
  const wanted = useRef(true); // visitor hasn't muted it
  const ducked = useRef(false);

  const play = useCallback(() => {
    const a = el.current;
    if (!a || ducked.current || !wanted.current) return;
    a.play().then(() => {
      setAmbientOn(true);
      fade(a, VOLUME, 1500);
    }).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const a = el.current;
    if (!a) return;
    fade(a, 0, 500, () => a.pause());
    setAmbientOn(false);
  }, []);

  useEffect(() => {
    const a = new Audio(audio.ambient);
    a.loop = true;
    a.volume = 0;
    a.preload = "auto";
    el.current = a;

    // Browsers block autoplay, so start on the first real gesture.
    const start = () => {
      play();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      cleanup();
      a.pause();
      el.current = null;
    };
  }, [play]);

  const toggleAmbient = useCallback(() => {
    if (ambientOn) {
      wanted.current = false;
      pause();
    } else {
      wanted.current = true;
      play();
    }
  }, [ambientOn, play, pause]);

  const duck = useCallback(
    (on: boolean) => {
      ducked.current = on;
      const a = el.current;
      if (!a) return;
      if (on) {
        if (!a.paused) fade(a, 0, 400, () => a.pause());
        setAmbientOn(false);
      } else if (wanted.current) play();
    },
    [play]
  );

  return <Ctx.Provider value={{ ambientOn, toggleAmbient, duck }}>{children}</Ctx.Provider>;
}
