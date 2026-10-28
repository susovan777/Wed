"use client";

import { motion, useReducedMotion } from "motion/react";

export type GlowDotSpec = {
  /** Position as a share of the section, in percent. */
  left: number;
  top: number;
  /** Diameter in px. */
  size: number;
  /** A 6-digit hex colour, e.g. "#f2c46d". */
  color: string;
  /** Strongest opacity it reaches, 0 to 1. Keep it low for a faded look. */
  peak: number;
  /** Seconds for one full fade in, drift and fade out. */
  dur: number;
  /** Seconds before it starts. */
  delay: number;
  /** How far it drifts in px while it glows. */
  dx: number;
  dy: number;
};

/*
 * Small bright dots and big soft ones, in warm gold and blush, spread over the section.
 * Slow and faint, so they stay behind the content.
 */
export const DEFAULT_GLOW_DOTS: GlowDotSpec[] = [
  {
    left: 8,
    top: 12,
    size: 90,
    color: "#f6d9a0",
    peak: 0.55,
    dur: 11,
    delay: 0,
    dx: 24,
    dy: -30,
  },
  {
    left: 22,
    top: 38,
    size: 28,
    color: "#f2c46d",
    peak: 0.7,
    dur: 9,
    delay: 1.5,
    dx: -16,
    dy: -22,
  },
  {
    left: 36,
    top: 8,
    size: 60,
    color: "#f7c9bd",
    peak: 0.5,
    dur: 13,
    delay: 3,
    dx: 20,
    dy: 26,
  },
  {
    left: 48,
    top: 52,
    size: 24,
    color: "#f2c46d",
    peak: 0.65,
    dur: 10,
    delay: 0.8,
    dx: 14,
    dy: -24,
  },
  {
    left: 62,
    top: 18,
    size: 110,
    color: "#f6d9a0",
    peak: 0.45,
    dur: 14,
    delay: 4,
    dx: -28,
    dy: 18,
  },
  {
    left: 74,
    top: 44,
    size: 30,
    color: "#f7c9bd",
    peak: 0.7,
    dur: 9.5,
    delay: 2.2,
    dx: -18,
    dy: -20,
  },
  {
    left: 88,
    top: 10,
    size: 70,
    color: "#f2c46d",
    peak: 0.5,
    dur: 12,
    delay: 5,
    dx: -22,
    dy: 28,
  },
  {
    left: 92,
    top: 62,
    size: 26,
    color: "#f6d9a0",
    peak: 0.7,
    dur: 10,
    delay: 1,
    dx: -12,
    dy: -26,
  },
  {
    left: 14,
    top: 70,
    size: 100,
    color: "#f7c9bd",
    peak: 0.45,
    dur: 13,
    delay: 2.8,
    dx: 26,
    dy: -18,
  },
  {
    left: 40,
    top: 82,
    size: 34,
    color: "#f2c46d",
    peak: 0.6,
    dur: 11,
    delay: 6,
    dx: 18,
    dy: -24,
  },
  {
    left: 66,
    top: 76,
    size: 80,
    color: "#f6d9a0",
    peak: 0.5,
    dur: 12.5,
    delay: 3.6,
    dx: -24,
    dy: -20,
  },
  {
    left: 54,
    top: 30,
    size: 18,
    color: "#f7c9bd",
    peak: 0.7,
    dur: 8.5,
    delay: 4.4,
    dx: 12,
    dy: -18,
  },
];

/**
 * Soft glowing dots that slowly fade in, drift and fade out, behind a section's content.
 * The parent must be `relative`. Only transform and opacity change, so it stays smooth.
 * With "reduce motion" on, the dots stay still and faint.
 */
export default function GlowDots({
  dots = DEFAULT_GLOW_DOTS,
  className = "z-0",
}: {
  dots?: GlowDotSpec[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            marginLeft: -d.size / 2,
            marginTop: -d.size / 2,
            background: `radial-gradient(circle, ${d.color} 0%, ${d.color}00 70%)`,
            opacity: reduce ? d.peak * 0.5 : 0,
          }}
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0, d.peak, 0],
                  x: [0, d.dx / 2, d.dx],
                  y: [0, d.dy / 2, d.dy],
                  scale: [0.8, 1.1, 0.8],
                }
          }
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
