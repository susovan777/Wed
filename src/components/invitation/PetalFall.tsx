"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { useOpened } from "./OpenContext";

type PetalFallProps = {
  /** Optional petal image (transparent PNG/WebP). Defaults to a drawn pink rose petal. */
  src?: string;
};

// [left %, size px, drift px, start rotation deg, fall seconds, delay seconds]
const PETALS: [number, number, number, number, number, number][] = [
  [7, 14, -50, 0, 5, 0],
  [54, 21, -21, 67, 6.3, 0.5],
  [1, 17, 8, 134, 7.6, 1],
  [48, 24, 37, 201, 5.4, 0.3],
  [95, 20, -34, 268, 6.7, 0.8],
  [42, 16, -5, 335, 8, 0.1],
  [89, 23, 24, 42, 5.8, 0.6],
  [36, 19, -47, 109, 7.1, 1.1],
  [83, 15, -18, 176, 8.4, 0.4],
  [30, 22, 11, 243, 6.2, 0.9],
  [77, 18, 40, 310, 7.5, 0.2],
  [24, 14, -31, 17, 5.3, 0.7],
  [71, 21, -2, 84, 6.6, 0],
  [18, 17, 27, 151, 7.9, 0.5],
  [65, 24, -44, 218, 5.7, 1],
  [12, 20, -15, 285, 7, 0.3],
  [59, 16, 14, 352, 8.3, 0.8],
  [6, 23, 43, 59, 6.1, 0.1],
  [53, 19, -28, 126, 7.4, 0.6],
  [0, 15, 1, 193, 5.2, 1.1],
  [47, 22, 30, 260, 6.5, 0.4],
  [94, 18, -41, 327, 7.8, 0.9],
  [41, 14, -12, 34, 5.6, 0.2],
  [88, 21, 17, 101, 6.9, 0.7],
  [35, 17, 46, 168, 8.2, 0],
  [82, 24, -25, 235, 6, 0.5],
  [29, 20, 4, 302, 7.3, 1],
  [76, 16, 33, 9, 5.1, 0.3],
  [23, 23, -38, 76, 6.4, 0.8],
  [70, 19, -9, 143, 7.7, 0.1],
  [17, 15, 20, 210, 5.5, 0.6],
  [64, 22, 49, 277, 6.8, 1.1],
];

/** Seconds to wait after the click so the petals appear as the gate fades out. */
const START_OFFSET = 0.9;
/** Multiplies every petal size. 1 = the original sizes. */
const SIZE_SCALE = 1;

// [top, middle, base] gradient colors, three pink shades.
const PALETTES = [
  ["#fbd5df", "#f4a1b8", "#e0678a"],
  ["#f9c2d1", "#ee86a2", "#d84a73"],
  ["#f6adc2", "#e46a8d", "#c93d66"],
];

const TOTAL_SECONDS =
  Math.max(...PETALS.map(([, , , , fall, delay]) => fall + delay)) +
  START_OFFSET;

const KEYFRAMES = `
@keyframes petal-fall {
  0% { transform: translate3d(0, -8dvh, 0) rotate(var(--turn)); opacity: 0; }
  6% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate3d(var(--drift), 108dvh, 0) rotate(calc(var(--turn) + 300deg)); opacity: 0; }
}
@keyframes petal-sway {
  from { transform: translateX(-12px); }
  to { transform: translateX(12px); }
}
@keyframes petal-flutter {
  from { transform: rotateX(-50deg) rotateY(-25deg); }
  to { transform: rotateX(50deg) rotateY(25deg); }
}
`;

export default function PetalFall({ src }: PetalFallProps) {
  const opened = useOpened();
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  // Falls once, then removes itself.
  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => setDone(true), (TOTAL_SECONDS + 0.5) * 1000);
    return () => clearTimeout(timer);
  }, [opened]);

  if (!opened || done || reduce) return null;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        {PETALS.map(([x, size, drift, turn, fall, delay], i) => {
          const palette = PALETTES[i % PALETTES.length];
          const gradientId = `rose-petal-${i}`;
          const width = size * SIZE_SCALE;

          return (
            <span
              key={i}
              className="absolute top-0 will-change-transform"
              style={
                {
                  left: `${x}%`,
                  "--drift": `${drift}px`,
                  "--turn": `${turn}deg`,
                  animation: `petal-fall ${fall}s linear ${delay + START_OFFSET}s both`,
                } as CSSProperties
              }
            >
              <span
                className="block"
                style={{
                  perspective: 300,
                  animation: `petal-sway ${(fall / 2).toFixed(2)}s ease-in-out infinite alternate`,
                }}
              >
                <span
                  className="block"
                  style={{
                    width,
                    height: width * (28 / 24),
                    animation: `petal-flutter ${(fall / 4).toFixed(2)}s ease-in-out infinite alternate`,
                  }}
                >
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  ) : (
                    <svg viewBox="0 0 24 28" width="100%" height="100%">
                      <defs>
                        <linearGradient
                          id={gradientId}
                          x1="0.2"
                          y1="0"
                          x2="0.8"
                          y2="1"
                        >
                          <stop offset="0" stopColor={palette[0]} />
                          <stop offset="0.55" stopColor={palette[1]} />
                          <stop offset="1" stopColor={palette[2]} />
                        </linearGradient>
                      </defs>
                      {/* Rose petal: broad rounded top with a small notch, narrow base */}
                      <path
                        d="M12 27C5 22 1 15 3 8C4 4 8 2 11.2 5.2C11.6 6.4 12.4 6.4 12.8 5.2C16 2 20 4 21 8C23 15 19 22 12 27Z"
                        fill={`url(#${gradientId})`}
                        stroke="#c9486f"
                        strokeOpacity="0.35"
                        strokeWidth="0.6"
                      />
                      {/* Soft sheen and center vein */}
                      <path
                        d="M7 9C8 6.5 10 6 11 7.5"
                        fill="none"
                        stroke="#fff"
                        strokeOpacity="0.55"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 9C11.4 14 11.6 20 12 25"
                        fill="none"
                        stroke="#c9486f"
                        strokeOpacity="0.25"
                        strokeWidth="0.5"
                      />
                    </svg>
                  )}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
}
