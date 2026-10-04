"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

// Edit these to restyle every card.
const RED_TOP = "#b3121f";
const RED_MID = "#9a0b18";
const RED_BASE = "#7d0714";
const GOLD = "#e9c985";

// Cusped-arch frame, symmetrical top and bottom. Drawn in a 120 x 165 box.
const FRAME =
  "M60 2C65 2 68 9 76 10L96 10C96 17 101 21 109 21C113 21 116 24 116 30L116 135C116 141 113 144 109 144C101 144 96 148 96 155L76 155C68 156 65 163 60 163C55 163 52 156 44 155L24 155C24 148 19 144 11 144C7 144 4 141 4 135L4 30C4 24 7 21 11 21C19 21 24 17 24 10L44 10C52 9 55 2 60 2Z";

function Lotus() {
  return (
    <g fill={GOLD}>
      <path d="M60 15C57.5 18.5 57.5 22.5 60 25.5C62.5 22.5 62.5 18.5 60 15Z" />
      <path d="M60 25.5C57 25.5 54 23.5 52.5 20C55.5 20.5 58 22.5 60 25.5Z" />
      <path d="M60 25.5C63 25.5 66 23.5 67.5 20C64.5 20.5 62 22.5 60 25.5Z" />
      <path
        d="M56 27.6H64"
        stroke={GOLD}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </g>
  );
}

export default function CountCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  return (
    // Container query units (cqw) let the text scale with the card width.
    <div className="relative aspect-120/165 w-full @container">
      <svg
        viewBox="0 0 120 165"
        aria-hidden
        className="absolute inset-0 h-full w-full drop-shadow-[0_8px_8px_rgba(80,8,12,0.3)]"
      >
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={RED_TOP} />
            <stop offset="0.5" stopColor={RED_MID} />
            <stop offset="1" stopColor={RED_BASE} />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.3" r="0.6">
            <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`${uid}-lines`}
            width="3"
            height="3"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0V3"
              stroke="#fff"
              strokeOpacity="0.05"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>

        <path d={FRAME} fill={`url(#${uid}-fill)`} />
        <path d={FRAME} fill={`url(#${uid}-lines)`} />
        <path d={FRAME} fill={`url(#${uid}-glow)`} />

        {/* Gold border: outer line and a thinner inner line */}
        <path d={FRAME} fill="none" stroke={GOLD} strokeWidth="1.6" />
        <path
          d={FRAME}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.75"
          strokeWidth="0.7"
          transform="translate(60 82.5) scale(0.9) translate(-60 -82.5)"
        />

        {/* Lotus ornaments, top and bottom */}
        <Lotus />
        <g transform="rotate(180 60 82.5)">
          <Lotus />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-[5cqw]">
        <motion.span
          key={value}
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="block font-serif font-medium leading-none text-white lining-nums text-[34cqw]"
        >
          {value}
        </motion.span>
        <span className="block font-serif uppercase leading-none text-white/90 text-[max(8px,10cqw)] tracking-[0.08em] mt-[6cqw]">
          {label}
        </span>
      </div>
    </div>
  );
}
