"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import { audio, gallery, profile } from "@/data/portfolio";
import { useSiteAudio } from "@/components/audio-provider";

const IDLE_MS = 3500; // auto-advance when the meme clip isn't playing

/** About-section photo that cycles through the gallery, synced to the meme clip when played. */
export function PhotoReel() {
  const { duck } = useSiteAudio();
  const clip = useRef<HTMLAudioElement | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const a = new Audio(audio.meme);
    a.preload = "auto";
    clip.current = a;

    const slideAt = (t: number) => {
      let i = 0;
      gallery.forEach((s, n) => {
        if (t >= s.at) i = n;
      });
      return i;
    };
    const onTime = () => setIndex(slideAt(a.currentTime));
    const onEnd = () => {
      setPlaying(false);
      setIndex(0);
      duck(false);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.pause();
      clip.current = null;
    };
  }, [duck]);

  // Idle slideshow, paused while the clip drives the slides or the cursor is over the photo.
  useEffect(() => {
    if (playing || hover) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % gallery.length), IDLE_MS);
    return () => clearInterval(id);
  }, [playing, hover]);

  const start = useCallback(() => {
    const a = clip.current;
    if (!a) return Promise.reject();
    duck(true);
    a.currentTime = 0;
    return a.play().then(() => setPlaying(true)).catch((e) => {
      duck(false);
      throw e;
    });
  }, [duck]);

  const stop = useCallback(() => {
    clip.current?.pause();
    setPlaying(false);
    duck(false);
  }, [duck]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start().catch(() => {});
  }, [playing, start, stop]);

  // Play automatically while this section is on screen, stop when it leaves.
  const inView = useInView(root, { amount: 0.6 });
  useEffect(() => {
    if (!inView) {
      if (clip.current && !clip.current.paused) stop();
      return;
    }
    let cancelled = false;
    const unlock = () => {
      if (!cancelled) start().catch(() => {});
    };
    start().catch(() => {
      // Autoplay blocked until the visitor interacts: try again on their first gesture.
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
    });
    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [inView, start, stop]);

  const slide = gallery[index];

  return (
    <div
      ref={root}
      className="absolute inset-0"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.type === "video" && !videoFailed ? (
            <video
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoFailed(true)}
              className="size-full object-cover"
            />
          ) : (
            <Image
              src={slide.type === "video" ? slide.poster : slide.src}
              alt={`${profile.name} — photo ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 448px, 100vw"
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={playing ? "Stop the song" : "Play the song"}
        className="glass absolute right-4 top-4 flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em]"
      >
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        {playing ? "Wow!" : "Play me"}
      </button>

      <div className="absolute inset-x-0 top-0 flex gap-1 px-4 pt-3">
        {gallery.map((_, n) => (
          <span key={n} className={`h-0.5 flex-1 rounded-full ${n <= index ? "bg-accent" : "bg-foreground/20"}`} />
        ))}
      </div>
    </div>
  );
}
