"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type SideOrnamentsProps = {
  /** Optional: your own golden art (transparent PNG/WebP/SVG). Falls back to the built-in SVG. */
  leftImage?: string;
  /** Optional: if omitted, the left image is mirrored for the right side. */
  rightImage?: string;
};

/** Same 9:16 art width used by OpeningGate. */
const ART_RATIO_WIDTH = "calc(100dvh * 9 / 16)";

/** Width of each empty side strip (0 when the screen is phone-sized). */
const SIDE_WIDTH = `max(0px, calc((100vw - ${ART_RATIO_WIDTH}) / 2))`;

const LEAVES = [
  { x: 100, y: 130, r: -35, s: 1 },
  { x: 100, y: 210, r: 215, s: 1 },
  { x: 100, y: 300, r: -35, s: 1.1 },
  { x: 100, y: 390, r: 215, s: 1.1 },
  { x: 100, y: 480, r: -35, s: 1.1 },
  { x: 100, y: 570, r: 215, s: 1.1 },
  { x: 100, y: 660, r: -35, s: 1 },
];

function OrnamentSvg({ id }: { id: string }) {
  const grad = `gold-${id}`;
  return (
    <svg
      viewBox="0 0 200 800"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff1b8" />
          <stop offset="30%" stopColor="#e8b84a" />
          <stop offset="60%" stopColor="#c98f1f" />
          <stop offset="100%" stopColor="#f4d58d" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1.5"
            floodColor="#3a0000"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      <g
        filter={`url(#glow-${id})`}
        fill="none"
        stroke={`url(#${grad})`}
        strokeLinecap="round"
      >
        {/* Main vine */}
        <path
          d="M100 70 C 60 160 140 240 100 340 C 60 440 140 520 100 620 C 70 700 120 730 100 740"
          strokeWidth="2.4"
        />
        <path
          d="M100 70 C 66 160 134 240 100 340 C 66 440 134 520 100 620"
          strokeWidth="0.8"
          opacity="0.7"
          transform="translate(6 0)"
        />

        {/* Leaves */}
        {LEAVES.map((l, i) => (
          <g
            key={i}
            transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}
          >
            <path
              d="M0 0 C 18 -16 48 -16 70 0 C 48 16 18 16 0 0 Z"
              strokeWidth="1.6"
            />
            <path d="M6 0 L 62 0" strokeWidth="0.9" opacity="0.8" />
            <circle
              cx="78"
              cy="0"
              r="2.4"
              fill={`url(#${grad})`}
              stroke="none"
            />
          </g>
        ))}

        {/* Dots along the vine */}
        {[100, 255, 345, 435, 525, 615, 705].map((y, i) => (
          <circle
            key={i}
            cx={100}
            cy={y}
            r="2.6"
            fill={`url(#${grad})`}
            stroke="none"
          />
        ))}

        {/* Top and bottom lotus */}
        <g stroke={`url(#${grad})`}>
          <g transform="translate(0 0)">
            {[-70, -45, -22, 0, 22, 45, 70].map((a) => (
              <path
                key={`t${a}`}
                d="M0 0 C -12 -16 -12 -38 0 -56 C 12 -38 12 -16 0 0 Z"
                transform={`translate(100 70) rotate(${a + 180}) scale(${a === 0 ? 1.15 : 0.95})`}
                strokeWidth="1.6"
              />
            ))}
            <circle
              cx="100"
              cy="70"
              r="5"
              fill={`url(#${grad})`}
              stroke="none"
            />
          </g>
          <g>
            {[-70, -45, -22, 0, 22, 45, 70].map((a) => (
              <path
                key={`b${a}`}
                d="M0 0 C -12 -16 -12 -38 0 -56 C 12 -38 12 -16 0 0 Z"
                transform={`translate(100 740) rotate(${a}) scale(${a === 0 ? 1.15 : 0.95})`}
                strokeWidth="1.6"
              />
            ))}
            <circle
              cx="100"
              cy="740"
              r="5"
              fill={`url(#${grad})`}
              stroke="none"
            />
          </g>
        </g>

        {/* Centre diamond accent */}
        <g transform="translate(100 400)">
          <path d="M0 -16 L 12 0 L 0 16 L -12 0 Z" strokeWidth="1.6" />
          <circle r="3" fill={`url(#${grad})`} stroke="none" />
        </g>
      </g>
    </svg>
  );
}

function Side({
  side,
  image,
  mirror,
  reduce,
}: {
  side: "left" | "right";
  image?: string;
  mirror: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute top-0 hidden h-full items-center justify-center md:flex ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{ width: SIDE_WIDTH }}
      initial={reduce ? false : { opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative h-[84%] w-full max-w-[220px]"
        style={{ transform: mirror ? "scaleX(-1)" : undefined }}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="220px"
            className="select-none object-contain"
            draggable={false}
          />
        ) : (
          <OrnamentSvg id={side} />
        )}
      </div>
    </motion.div>
  );
}

export default function SideOrnaments({
  leftImage,
  rightImage,
}: SideOrnamentsProps) {
  const reduce = useReducedMotion();
  return (
    <>
      <Side side="left" image={leftImage} mirror={false} reduce={reduce} />
      <Side
        side="right"
        image={rightImage ?? leftImage}
        mirror={!rightImage}
        reduce={reduce}
      />
    </>
  );
}
