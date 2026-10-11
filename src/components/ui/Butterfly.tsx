"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Where the butterfly lands, as a percentage of the image it sits on.
 * left / top = its top-left corner, size = its width.
 */
const PERCH = { left: "18%", top: "74%", size: "15%" };

/** Seconds after the image scrolls into view before the butterfly starts flying. */
const START_DELAY = 1.2;
/** Seconds the flight takes. */
const FLIGHT_SECONDS = 6.5;

const WING_UPPER = "M30 22C24 8 8 2 4 12C1 21 12 27 30 26Z";
const WING_LOWER = "M30 26C20 27 10 32 13 41C17 48 27 40 30 31Z";

function Wing() {
  return (
    <g strokeLinejoin="round">
      <path d={WING_UPPER} fill="#ef5f94" stroke="#8a1c45" strokeWidth="0.7" />
      <path d={WING_LOWER} fill="#f7a3c1" stroke="#8a1c45" strokeWidth="0.7" />
      <path
        d="M30 24C22 16 14 12 8 12"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="0.6"
      />
      <circle cx="13" cy="14" r="2" fill="#fff" opacity="0.8" />
      <circle cx="17" cy="35" r="1.6" fill="#fff" opacity="0.7" />
    </g>
  );
}

export default function Butterfly() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [landed, setLanded] = useState(false);

  // Fast flutter while flying, slow open-and-close once landed.
  const flap = landed
    ? {
        duration: 2.2,
        repeat: Infinity,
        repeatDelay: 1.1,
        ease: "easeInOut" as const,
      }
    : { duration: 0.16, repeat: Infinity, ease: "easeInOut" as const };

  const wingAnimation = { scaleX: reduce ? 1 : [1, 0.3, 1] };

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute aspect-square"
      style={{ left: PERCH.left, top: PERCH.top, width: PERCH.size }}
    >
      <motion.span
        className="block size-full drop-shadow-[0_2px_2px_rgba(60,0,20,0.35)]"
        initial={
          reduce
            ? false
            : { x: "1100%", y: "-1300%", opacity: 0, scale: 0.5, rotate: 0 }
        }
        animate={
          reduce
            ? { x: "0%", y: "0%", opacity: 1, scale: 1, rotate: 0 }
            : inView
              ? {
                  x: ["1100%", "700%", "250%", "-60%", "0%"],
                  y: ["-1300%", "-600%", "-900%", "-150%", "0%"],
                  rotate: [35, -20, 30, -10, 0],
                  scale: [0.5, 0.8, 0.9, 1, 1],
                  opacity: [0, 1, 1, 1, 1],
                }
              : undefined
        }
        transition={{
          duration: FLIGHT_SECONDS,
          delay: START_DELAY,
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          if (inView) setLanded(true);
        }}
      >
        <svg viewBox="0 0 60 48" className="size-full overflow-visible">
          {/* Left wing pivots on the body */}
          <motion.g
            key={`l-${landed}`}
            style={{ originX: 1, originY: 0.5 }}
            animate={wingAnimation}
            transition={flap}
          >
            <Wing />
          </motion.g>

          {/* Right wing is the mirrored copy */}
          <motion.g
            key={`r-${landed}`}
            style={{ originX: 0, originY: 0.5 }}
            animate={wingAnimation}
            transition={flap}
          >
            <g transform="translate(60 0) scale(-1 1)">
              <Wing />
            </g>
          </motion.g>

          {/* Body and antennae */}
          <rect
            x="28.6"
            y="14"
            width="2.8"
            height="28"
            rx="1.4"
            fill="#5a1230"
          />
          <circle cx="30" cy="13" r="2.4" fill="#5a1230" />
          <path
            d="M29 11C26 6 24 4 22 4M31 11C34 6 36 4 38 4"
            fill="none"
            stroke="#5a1230"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.span>
    </span>
  );
}
