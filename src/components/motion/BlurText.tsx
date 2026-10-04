"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useOpened } from "@/components/invitation/OpenContext";

type BlurTextProps = {
  text: string;
  /** Seconds before the first letter starts. */
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** "open": plays when the envelope is clicked. "view": plays on scroll. */
  trigger?: "open" | "view";
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BlurText({
  text,
  delay = 0,
  stagger = 0.06,
  trigger = "open",
  className,
}: BlurTextProps) {
  const opened = useOpened();
  const reduce = useReducedMotion();

  // Each letter starts blurred, stretched and slightly to the left,
  // then slides into place and sharpens: a motion-blur streak.
  const letter: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, x: -36, scaleX: 1.3, filter: "blur(14px)" },
        show: (i: number) => ({
          opacity: 1,
          x: 0,
          scaleX: 1,
          filter: "blur(0px)",
          transition: { duration: 1, ease: EASE, delay: delay + i * stagger },
        }),
      };

  const triggerProps =
    trigger === "open"
      ? { animate: opened ? "show" : "hidden" }
      : {
          whileInView: "show",
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        };

  const words = text.split(" ");
  let index = 0;

  return (
    <motion.span className={className} initial="hidden" {...triggerProps}>
      {words.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => (
              <motion.span
                key={c}
                custom={index++}
                variants={letter}
                className="inline-block origin-left"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </Fragment>
      ))}
    </motion.span>
  );
}
