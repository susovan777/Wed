"use client";

import { motion, useReducedMotion } from "motion/react";

// left / top as a share of the section, size in px, delay and duration in seconds
const PETALS = [
  { left: "8%", top: "12%", size: 14, delay: 0, dur: 9 },
  { left: "22%", top: "30%", size: 12, delay: 1.5, dur: 11 },
  { left: "38%", top: "8%", size: 10, delay: 3, dur: 10 },
  { left: "55%", top: "22%", size: 12, delay: 0.8, dur: 12 },
  { left: "70%", top: "6%", size: 14, delay: 2.2, dur: 9.5 },
  { left: "84%", top: "35%", size: 11, delay: 4, dur: 11 },
  { left: "46%", top: "50%", size: 10, delay: 5, dur: 10.5 },
  { left: "92%", top: "60%", size: 13, delay: 1, dur: 12 },
];

/** Petals that drift down slowly and fade out, again and again. Off for reduced motion. */
export default function BlessingPetals() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <>
      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-2 rounded-[80%_0_80%_0] bg-linear-to-br from-rose-400 to-rose-600/80"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size * 1.5,
          }}
          animate={{
            y: [0, 60, 120],
            x: [0, 14, -8],
            rotate: [0, 120, 240],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
