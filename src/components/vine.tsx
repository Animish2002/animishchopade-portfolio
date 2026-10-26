"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import { useInView, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// Heart-shaped pothos (money plant) leaf: stalk at (0,0), tip pointing right.
const HEART =
  "M8 0 C 2 -12, 14 -21, 27 -16 C 39 -12, 50 -5, 60 0 C 50 5, 39 12, 27 16 C 14 21, 2 12, 8 0 Z";
const MIDRIB = "M8 0 C 24 -1, 40 -1, 54 0";

const W = 64; // svg width; the stem wanders around its centre
const CX = W / 2;
const AMP = 9; // how far the stem swings between nodes, px
const WAVE = (2 * Math.PI) / 150; // one ripple per 150px
const SPEED = 1.4; // ripple travel, rad/s
const STEP = 4; // path sampling, px

type SideLeaf = { y: number; side: 1 | -1; size: number };

/**
 * A money-plant vine for the career timeline. It hangs from the first entry
 * and grows downward with `progress` (0 → 1), always pinned to each entry's
 * node, while the stretches between nodes ripple like a slow snake. Heart
 * leaves unfurl as the growing tip passes them.
 */
export function Vine({
  nodes,
  progress,
  className,
}: {
  nodes: number[];
  progress: MotionValue<number>;
  className?: string;
}) {
  const gradient = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const stemRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const leafRefs = useRef<(SVGGElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const visible = useInView(svgRef, { margin: "200px" });
  const reduced = useReducedMotion();

  const top = nodes[0] ?? 0;
  const bottom = nodes[nodes.length - 1] ?? 0;
  const span = Math.max(1, bottom - top);

  // Two small leaves in every stretch between entries, on alternating sides.
  const sideLeaves = useMemo<SideLeaf[]>(
    () =>
      nodes.slice(1).flatMap((y, i) => {
        const from = nodes[i];
        return [0.3, 0.68].map((f, j) => ({
          y: from + (y - from) * f,
          side: (i + j) % 2 ? 1 : -1,
          size: j ? 0.42 : 0.5,
        }));
      }),
    [nodes],
  );

  useEffect(() => {
    const stem = stemRef.current;
    const ghost = ghostRef.current;
    if (!stem || !ghost || nodes.length < 2) return;

    // 0 at each node, 1 midway: the vine stays attached to every entry.
    const envelope = (y: number) => {
      for (let i = 0; i < nodes.length - 1; i++) {
        if (y <= nodes[i + 1]) return Math.sin((Math.PI * (y - nodes[i])) / (nodes[i + 1] - nodes[i]));
      }
      return 0;
    };
    const xAt = (y: number, t: number) => CX + AMP * envelope(y) * Math.sin(WAVE * y - SPEED * t);

    const easeOutBack = (s: number) => 1 + 2.2 * (s - 1) ** 3 + 1.2 * (s - 1) ** 2;
    const grownAt = (y: number, p: number) => {
      const s = Math.min(1, Math.max(0, (p - (y - top) / span) / 0.05));
      return s && easeOutBack(s);
    };

    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      const t = reduced ? 0 : (performance.now() - t0) / 1000;
      const p = progress.get();

      let d = `M${xAt(top, t).toFixed(2)} ${top}`;
      for (let y = top + STEP; y < bottom; y += STEP) d += ` L${xAt(y, t).toFixed(2)} ${y}`;
      d += ` L${CX} ${bottom}`;
      stem.setAttribute("d", d);
      ghost.setAttribute("d", d);
      stem.style.strokeDashoffset = String(1 - p);

      // Bud riding the growing tip
      const tip = tipRef.current;
      if (tip) {
        const pt = stem.getPointAtLength(p * stem.getTotalLength());
        tip.setAttribute("transform", `translate(${pt.x} ${pt.y}) scale(${p > 0.002 && p < 0.998 ? 1 : 0})`);
      }

      sideLeaves.forEach((l, i) => {
        const el = leafRefs.current[i];
        if (!el) return;
        const slope = (xAt(l.y + 1, t) - xAt(l.y - 1, t)) / 2;
        const angle = (Math.atan2(1, slope) * 180) / Math.PI - 90; // stem direction offset from vertical
        const flutter = Math.sin(t * 1.8 + l.y * 0.05) * 6;
        const rot = l.side === 1 ? -30 - angle + flutter : 210 - angle - flutter;
        const s = grownAt(l.y, p) * l.size;
        el.setAttribute(
          "transform",
          `translate(${xAt(l.y, t).toFixed(2)} ${l.y}) rotate(${rot.toFixed(2)}) scale(${s.toFixed(3)} ${(l.side === 1 ? s : -s).toFixed(3)})`,
        );
      });

      nodes.forEach((y, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const s = grownAt(y, p + 0.04) * 0.68;
        const flutter = Math.sin(t * 1.5 + i) * 5;
        el.setAttribute("transform", `translate(${CX} ${y}) rotate(${(-28 + flutter).toFixed(2)}) scale(${s.toFixed(3)})`);
      });

      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };
    draw();
    // Still redraw on scroll when the ripple is paused (reduced motion).
    const unsub = reduced ? progress.on("change", draw) : undefined;
    return () => {
      cancelAnimationFrame(raf);
      unsub?.();
    };
  }, [nodes, top, bottom, span, sideLeaves, progress, visible, reduced]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      width={W}
      height={bottom + 40}
      viewBox={`0 0 ${W} ${bottom + 40}`}
      className={cn("pointer-events-none overflow-visible", className)}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--leaf-dark)" />
          <stop offset="0.55" stopColor="var(--leaf)" />
          <stop offset="1" stopColor="var(--leaf-light)" />
        </linearGradient>
      </defs>

      <path ref={ghostRef} stroke="var(--line)" strokeWidth="1.5" fill="none" />
      <path
        ref={stemRef}
        pathLength={1}
        stroke="var(--stem)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 1"
        strokeDashoffset={1}
        fill="none"
      />

      {sideLeaves.map((_, i) => (
        <g key={`s${i}`} ref={(el) => void (leafRefs.current[i] = el)} transform="scale(0)">
          <Heart gradient={gradient} />
        </g>
      ))}
      {nodes.map((_, i) => (
        <g key={`n${i}`} ref={(el) => void (nodeRefs.current[i] = el)} transform="scale(0)">
          <Heart gradient={gradient} />
        </g>
      ))}

      <g ref={tipRef} transform="scale(0)">
        <circle r="7" fill="var(--leaf-light)" opacity="0.25" />
        <circle r="3.5" fill="var(--leaf-light)" />
      </g>
    </svg>
  );
}

function Heart({ gradient }: { gradient: string }) {
  return (
    <>
      <path d="M0 0 L8 0" stroke="var(--stem)" strokeWidth="2" strokeLinecap="round" />
      <path d={HEART} fill={`url(#${gradient})`} stroke="var(--leaf-dark)" strokeWidth="1.4" strokeLinejoin="round" />
      <path d={MIDRIB} stroke="var(--leaf-light)" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" fill="none" />
    </>
  );
}
