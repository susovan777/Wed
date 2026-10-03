"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useOpened } from "@/components/invitation/OpenContext";

type RevealProps = HTMLMotionProps<"div"> & {
  /** "open": plays when the envelope is clicked (Hero). "view": plays on scroll. */
  trigger?: "open" | "view";
  delay?: number;
  duration?: number;
  /** Starting vertical offset in px. Negative values drift down into place. */
  y?: number;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Reveal({
  trigger = "view",
  delay = 0,
  duration = 0.9,
  y = 24,
  children,
  ...rest
}: RevealProps) {
  const opened = useOpened();
  const reduce = useReducedMotion();

  const hidden = { opacity: 0, y: reduce ? 0 : y };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: reduce ? 0.4 : duration, delay, ease: EASE };

  if (trigger === "open") {
    return (
      <motion.div
        initial={hidden}
        animate={opened ? shown : hidden}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
