"use client";

import { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/*
 * A royal-blue butterfly: wings fade from a light cyan-blue glow near the body
 * to deep blue at the edges, with thin dark veins, a dark navy body and
 * curly antennae. It flies in from off to the side, lands where it is placed,
 * then rests with its wings slowly opening and closing.
 */

/*
 * The butterfly is drawn tilted (body runs from upper right to lower left).
 * To flap, we rotate into a frame where the body is vertical, squash the
 * wings sideways (scaleX) around a point on the body, then rotate back.
 */
const TILT = 48.6; // degrees
const PIVOT = { x: 320, y: 455 }; // a point on the body line

// Big upper wing pointing up
const WING_TOP =
  "M352 395C305 350 232 275 225 205C222 168 268 130 298 105C320 60 345 32 365 35C400 45 430 120 425 190C420 270 395 340 375 388Z";

// Left wing (slightly scalloped outer edge)
const WING_LEFT =
  "M348 405C300 362 250 300 205 272C170 266 150 298 125 338C100 378 98 418 108 436C125 472 170 490 215 485C270 476 320 442 352 408Z";

// Lower wing pointing down
const WING_BOTTOM =
  "M368 425C322 452 282 502 265 572C255 620 285 650 320 662C360 668 410 645 440 620C465 590 462 540 442 500C422 460 398 432 378 420Z";

// Long right wing
const WING_RIGHT =
  "M385 405C420 386 500 372 570 380C640 390 690 440 712 480C722 500 710 515 690 522C640 542 580 592 540 582C490 566 430 500 395 440Z";

const VEIN = {
  fill: "none",
  stroke: "#0a2466",
  strokeWidth: 1.3,
  strokeOpacity: 0.75,
  strokeLinecap: "round" as const,
};

function Wings({ fill }: { fill: string }) {
  return (
    <g strokeLinejoin="round">
      {/* Wing shapes */}
      {[WING_TOP, WING_LEFT, WING_BOTTOM, WING_RIGHT].map((d) => (
        <path
          key={d}
          d={d}
          fill={fill}
          stroke="#0a2466"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
      ))}

      {/* Top wing veins */}
      <g {...VEIN}>
        <path d="M352 392C325 330 318 240 340 125" />
        <path d="M358 390C360 320 392 230 402 110" />
        <path d="M345 385C300 330 262 260 255 205" />
        <path d="M365 392C385 330 410 260 418 190" />
        {/* inner lobes */}
        <path d="M335 365C300 310 305 230 322 152C345 200 352 300 335 365Z" />
        <path d="M345 330C320 290 325 255 338 255C350 270 352 305 345 330Z" />
      </g>

      {/* Left wing veins */}
      <g {...VEIN}>
        <path d="M345 405C290 380 220 350 150 345" />
        <path d="M345 410C290 420 220 440 135 440" />
        <path d="M345 402C300 360 250 310 205 290" />
        <path d="M345 412C300 450 255 475 215 482" />
        {/* inner lobe */}
        <path d="M340 400C300 340 250 335 198 345C225 395 290 420 340 400Z" />
      </g>

      {/* Bottom wing veins */}
      <g {...VEIN}>
        <path d="M370 430C345 500 335 580 335 655" />
        <path d="M375 430C390 500 420 560 435 620" />
        <path d="M368 430C320 480 290 540 285 610" />
        <path d="M380 430C410 480 440 520 450 570" />
        {/* inner lobe */}
        <path d="M368 450C335 500 340 560 362 600C395 560 395 490 368 450Z" />
      </g>

      {/* Right wing veins */}
      <g {...VEIN}>
        <path d="M388 410C470 395 560 395 640 430" />
        <path d="M392 418C470 430 560 470 620 530" />
        <path d="M392 412C460 410 540 420 600 460" />
        <path d="M395 425C440 480 500 540 540 578" />
        {/* inner lobe */}
        <path d="M395 415C440 395 500 400 530 430C520 480 440 490 395 415Z" />
      </g>
    </g>
  );
}

type BlueButterflyProps = {
  /** Where it lands: its top-left corner, as a percentage of the parent box. */
  left: string;
  top: string;
  /** Its width, as a percentage of the parent box width. */
  size: string;
  /** Resting tilt in degrees. */
  rotate?: number;
  /** Where the flight starts, as [x, y] in percent of the butterfly's own size. */
  from?: [number, number];
  /** Seconds to wait after the parent scrolls into view. */
  delay?: number;
  /** Seconds for one slow open-and-close of the wings while resting. */
  restSeconds?: number;
  /** Seconds the wings stay closed between slow flaps. */
  pauseSeconds?: number;
  flightSeconds?: number;
};

export default function BlueButterfly({
  left,
  top,
  size,
  rotate = 0,
  from = [-700, -900],
  delay = 1.2,
  restSeconds = 2.4,
  pauseSeconds = 1.2,
  flightSeconds = 5.5,
}: BlueButterflyProps) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [landed, setLanded] = useState(false);

  // A curved path from the start point to the landing spot
  const progress = [1, 0.62, 0.3, -0.06, 0];
  const swing = [0, 0.18, -0.2, 0.05, 0];
  const [fx, fy] = from;
  const x = progress.map((p, i) => `${fx * p - fy * swing[i]}%`);
  const y = progress.map((p, i) => `${fy * p + fx * swing[i]}%`);

  // Fast flutter while flying, slow open-and-close once landed
  const flap = landed
    ? {
        duration: restSeconds,
        repeat: Infinity,
        repeatDelay: pauseSeconds,
        ease: "easeInOut" as const,
      }
    : { duration: 0.14, repeat: Infinity, ease: "easeInOut" as const };
  const wingAnimation = { scaleX: reduce ? 1 : [1, 0.3, 1] };

  const wingFill = `url(#${uid}-wing)`;

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute z-2 aspect-6/5"
      style={{ left, top, width: size }}
    >
      <motion.span
        className="block size-full drop-shadow-[0_3px_3px_rgba(10,30,90,0.35)]"
        initial={
          reduce
            ? false
            : { x: x[0], y: y[0], opacity: 0, scale: 0.5, rotate: rotate + 30 }
        }
        animate={
          reduce
            ? { x: "0%", y: "0%", opacity: 1, scale: 1, rotate }
            : inView
              ? {
                  x,
                  y,
                  rotate: [
                    rotate + 30,
                    rotate - 15,
                    rotate + 20,
                    rotate - 8,
                    rotate,
                  ],
                  scale: [0.5, 0.8, 0.95, 1, 1],
                  opacity: [0, 1, 1, 1, 1],
                }
              : undefined
        }
        transition={{
          duration: flightSeconds,
          delay,
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          if (inView) setLanded(true);
        }}
      >
        <svg viewBox="0 0 120 100" className="size-full overflow-visible">
          {/* Fit the butterfly drawing (about 615 x 636 units) into the 120 x 100 box */}
          <g transform="translate(60 50) scale(0.17) translate(-407 -350)">
            <defs>
              {/* Light blue near the body, deep blue toward the wing tips */}
              <radialGradient
                id={`${uid}-wing`}
                gradientUnits="userSpaceOnUse"
                cx="380"
                cy="410"
                r="340"
              >
                <stop offset="0" stopColor="#4fbaff" />
                <stop offset="0.45" stopColor="#1c7af2" />
                <stop offset="1" stopColor="#0a38c8" />
              </radialGradient>
              <linearGradient
                id={`${uid}-body`}
                gradientUnits="userSpaceOnUse"
                x1="400"
                y1="380"
                x2="235"
                y2="530"
              >
                <stop offset="0" stopColor="#0b2a6e" />
                <stop offset="1" stopColor="#06143d" />
              </linearGradient>
            </defs>

            {/* Wings: rotate so the body is vertical, squash sideways, rotate back */}
            <g transform={`rotate(${TILT} ${PIVOT.x} ${PIVOT.y})`}>
              <motion.g
                key={`w-${landed}`}
                style={{ originX: 0.5, originY: 0.5 }}
                animate={wingAnimation}
                transition={flap}
              >
                {/* Invisible box centred on the pivot so the flap pivots on the body */}
                <rect
                  x={PIVOT.x - 500}
                  y={PIVOT.y - 500}
                  width={1000}
                  height={1000}
                  fill="none"
                />
                <g transform={`rotate(${-TILT} ${PIVOT.x} ${PIVOT.y})`}>
                  <Wings fill={wingFill} />
                </g>
              </motion.g>
            </g>

            {/* Body and curly antennae */}
            <path
              d="M406 378C396 374 380 385 365 400L240 520C232 528 232 535 241 530C272 514 330 470 376 425C396 408 412 388 406 378Z"
              fill={`url(#${uid}-body)`}
            />
            <g
              fill="none"
              stroke="#0a2466"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M402 380C425 340 445 305 450 280C452 262 462 262 458 276" />
              <path d="M404 384C440 365 480 345 497 338C508 336 510 348 500 352" />
            </g>
          </g>
        </svg>
      </motion.span>
    </span>
  );
}
