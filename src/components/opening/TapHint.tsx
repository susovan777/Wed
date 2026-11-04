"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const BENGALI = /[\u0980-\u09FF]/;

/**
 * A 👆 hand that taps, with a ripple and a short text, to show guests that the envelope
 * can be tapped. It appears after `delay` seconds. By default it stays until the guest
 * taps (the gate closes and takes it away). Set `hideAfter` to make it disappear by itself.
 */
export default function TapHint({
  text,
  iconSize = 44,
  delay = 1.2,
  hideAfter,
  className = "",
}: {
  /** One line per \n, e.g. "Tap to open\nখুলতে ট্যাপ করুন". Leave out to show only the hand. */
  text?: string;
  /** Size of the 👆 emoji in px. Make it bigger or smaller here. */
  iconSize?: number;
  /** Seconds before the hint appears. */
  delay?: number;
  /** Seconds it stays visible once it has appeared. Leave out to keep it until the tap. */
  hideAfter?: number;
  /** Position it, e.g. "absolute left-1/2 top-[68%] -translate-x-1/2". */
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!hideAfter) return;
    const timer = setTimeout(() => setShow(false), (delay + hideAfter) * 1000);
    return () => clearTimeout(timer);
  }, [delay, hideAfter]);

  const box = Math.round(iconSize * 1.7);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className={`pointer-events-none z-10 flex gap-5 flex-col items-center ${className}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ delay, duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="relative flex items-end justify-center"
            style={{ width: box, height: box }}
          >
            {/* Ripple at the fingertip (top of the hand) */}
            {!reduce && (
              <span className="absolute inset-x-0 top-0 flex justify-center">
                <motion.span
                  className="rounded-full border-2 border-[#f4d9a0]"
                  style={{ width: iconSize * 0.7, height: iconSize * 0.7 }}
                  animate={{ scale: [0.5, 1.9], opacity: [0.7, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </span>
            )}

            {/* The hand: lifts and presses, again and again */}
            <motion.span
              className="block leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              style={{ fontSize: iconSize }}
              animate={
                reduce ? undefined : { y: [6, -4, 6], scale: [0.94, 1, 0.94] }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              👆
            </motion.span>
          </div>

          {text && (
            <div className="mt-1 flex flex-col items-center gap-0.5 text-center text-[#f9e4b0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {text.split("\n").map((line, i) =>
                BENGALI.test(line) ? (
                  // No letter spacing for Bengali, it would split the joined letters
                  <span
                    key={i}
                    lang="bn"
                    className="text-[0.95rem] font-medium tracking-normal lg:text-[1.05rem]"
                    style={{ fontFamily: "var(--nf-bn-serif), serif" }}
                  >
                    {line}
                  </span>
                ) : (
                  <span
                    key={i}
                    className="font-serif text-[0.85rem] font-medium tracking-[0.18em] lg:text-base"
                  >
                    {line}
                  </span>
                ),
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
