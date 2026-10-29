"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

export type FlowerColor = "yellow" | "blue" | "green";

/** [left %, top %, size px, rotation deg, blur px, opacity, color (optional, default yellow)] */
export type FlowerSpec = [
  left: number,
  top: number,
  size: number,
  rotate: number,
  blur: number,
  opacity: number,
  color?: FlowerColor,
];

/* Gradient stops (centre to edge), outline, flower centre and highlight per colour. */
const PALETTE: Record<
  FlowerColor,
  {
    stops: [string, string, string];
    stroke: string;
    center: string;
    glint: string;
  }
> = {
  yellow: {
    stops: ["#f6b422", "#fbd95c", "#fff3b4"],
    stroke: "#e8a317",
    center: "#e98a0e",
    glint: "#ffd98a",
  },
  blue: {
    stops: ["#3f8fe8", "#8cc4ff", "#e3f2ff"],
    stroke: "#2f7fd6",
    center: "#1d5fb8",
    glint: "#cfe8ff",
  },
  green: {
    stops: ["#4fa84f", "#9bd983", "#e4f7c9"],
    stroke: "#3d8a3a",
    center: "#2f7a35",
    glint: "#d9f5b8",
  },
};

const COLORS = Object.keys(PALETTE) as FlowerColor[];

/*
 * Small flowers: sharp ones (blur 0) and big soft ones (blur above 0) that
 * look out of focus. Mostly blue and green, a few yellow.
 */
export const DEFAULT_FLOWERS: FlowerSpec[] = [
  [30, 17, 16, 25, 0, 0.95, "blue"],
  [72, 28, 14, -15, 0, 0.9, "yellow"],
  [3, 43, 15, 60, 0, 0.9, "green"],
  [98, 42, 13, 20, 0, 0.85, "yellow"],
  [37, 77, 16, 35, 0, 0.95, "blue"],
  [85, 58, 14, 50, 0, 0.9, "green"],
  [33, 31, 30, -30, 3, 0.6, "green"],
  [71, 18, 34, 40, 4, 0.55, "blue"],
  [8, 65, 36, -40, 4, 0.5, "yellow"],
  [61, 76, 28, -20, 3, 0.6, "blue"],
  [94, 61, 32, 10, 3.5, 0.55, "green"],
];

/**
 * Scattered flowers, placed as a share of the parent section.
 * The parent must be `relative` (your sections already are).
 * Keep `className` z-index below the text and above the background.
 *
 * `animated`: every flower slowly fades in, drifts and turns a little, then fades out.
 * Each one has its own speed and start time. Off by default. Stays still when the
 * visitor has "reduce motion" turned on.
 */
export default function ScatteredFlowers({
  flowers = DEFAULT_FLOWERS,
  className = "z-1",
  animated = false,
}: {
  flowers?: FlowerSpec[];
  className?: string;
  animated?: boolean;
}) {
  const gid = `flower-${useId().replace(/:/g, "")}`;
  const reduce = useReducedMotion();

  return (
    <>
      {/* One gradient per colour, shared by every flower in this group */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          {COLORS.map((c) => (
            <radialGradient
              key={c}
              id={`${gid}-${c}`}
              gradientUnits="userSpaceOnUse"
              cx="12"
              cy="12"
              r="11"
            >
              <stop offset="0.15" stopColor={PALETTE[c].stops[0]} />
              <stop offset="0.6" stopColor={PALETTE[c].stops[1]} />
              <stop offset="1" stopColor={PALETTE[c].stops[2]} />
            </radialGradient>
          ))}
        </defs>
      </svg>

      {flowers.map(
        ([left, top, size, rotate, blur, opacity, color = "yellow"], i) => {
          const p = PALETTE[color];

          const shape = (
            <>
              {[0, 72, 144, 216, 288].map((angle) => (
                <ellipse
                  key={angle}
                  cx="12"
                  cy="6.4"
                  rx="3.9"
                  ry="5.3"
                  fill={`url(#${gid}-${color})`}
                  stroke={p.stroke}
                  strokeOpacity="0.35"
                  strokeWidth="0.4"
                  transform={`rotate(${angle} 12 12)`}
                />
              ))}
              <circle cx="12" cy="12" r="2.3" fill={p.center} />
              <circle cx="11.3" cy="11.3" r="0.8" fill={p.glint} />
            </>
          );

          const box = {
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            filter: blur ? `blur(${blur}px)` : undefined,
          };
          const cls = `pointer-events-none absolute ${className}`;

          // Still flowers
          if (!animated || reduce) {
            return (
              <svg
                key={i}
                viewBox="0 0 24 24"
                aria-hidden
                className={cls}
                style={{ ...box, transform: `rotate(${rotate}deg)`, opacity }}
              >
                {shape}
              </svg>
            );
          }

          // Moving flowers: each one gets its own drift, turn, speed and start time
          const dx = (((i * 7) % 5) - 2) * 7; // -14 to 14 px sideways
          const dy = -(12 + ((i * 5) % 4) * 6); // 12 to 30 px upward
          const spin = i % 2 ? 10 : -10; // degrees
          const duration = 11 + ((i * 3) % 6); // 11 to 16 seconds
          const delay = (i * 1.7) % 7;

          return (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              aria-hidden
              className={cls}
              style={box}
              initial={{ opacity: 0, rotate }}
              animate={{
                // fade in, stay, fade out
                opacity: [0, opacity, opacity, 0],
                x: [0, dx],
                y: [0, dy],
                rotate: [rotate, rotate + spin],
              }}
              // Each property needs its own duration, delay and repeat. A property that has
              // its own settings does not inherit them from the top level.
              transition={{
                opacity: {
                  duration,
                  delay,
                  repeat: Infinity,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut",
                },
                x: { duration, delay, repeat: Infinity, ease: "linear" },
                y: { duration, delay, repeat: Infinity, ease: "linear" },
                rotate: { duration, delay, repeat: Infinity, ease: "linear" },
              }}
            >
              {shape}
            </motion.svg>
          );
        },
      )}
    </>
  );
}
