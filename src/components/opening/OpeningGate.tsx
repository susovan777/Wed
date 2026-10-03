"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "motion/react";

export type OpeningAssets = {
  /** Portrait 9:16 artwork WITHOUT the envelope and seal. */
  background: string;
  /** Transparent envelope image (no seal). */
  envelope: string;
  /** Transparent flower border image. */
  flowerBorder: string;
  /** Image of the Subho Bibaha ceremony. */
  subhoBibaha: string;
};

type OpeningGateProps = {
  assets: OpeningAssets;
  /** Fires on the click itself (a real user gesture). Start music / reveal the page here. */
  onOpen?: () => void;
  /** Fires after the exit animation has finished. Unmount the gate here. */
  onOpened?: () => void;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The artwork is a 9:16 portrait. Everything is positioned in % of this box. */
const ART_RATIO_WIDTH = "calc(100dvh * 9 / 16)";

export default function OpeningGate({
  assets,
  onOpen,
  onOpened,
}: OpeningGateProps) {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();

  // Lock page scroll while the gate is on screen.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpen?.();
  };

  // Whole gate fades (and gently zooms) after the envelope + seal have played.
  const gateTransition: Transition = opening
    ? { duration: reduce ? 0.4 : 0.9, delay: reduce ? 0 : 0.55, ease: EASE }
    : { duration: 0 };

  const envelopeTransition: Transition = opening
    ? { duration: 0.9, delay: 0.3, ease: EASE }
    : { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.25, ease: EASE };

  const sealTransition: Transition = opening
    ? { duration: 0.55, ease: "easeInOut", times: [0, 0.35, 1] }
    : reduce
      ? { duration: 0 }
      : { type: "spring", stiffness: 170, damping: 13, delay: 0.85 };

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-dvh w-full overflow-hidden bg-[#8a0b10]"
      animate={{ opacity: opening ? 0 : 1 }}
      transition={gateTransition}
      onAnimationComplete={() => {
        if (opening) onOpened?.();
      }}
    >
      {/* Soft artwork fill for the empty sides on wide screens */}
      <Image
        src={assets.background}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        quality={90}
        className="hidden scale-110 object-cover opacity-50 blur-2xl md:block"
      />

      {/* Stage: 9:16 on desktop, full width on phones */}
      <motion.div
        className="relative mx-auto h-full overflow-hidden"
        style={{ width: `min(100vw, ${ART_RATIO_WIDTH})` }}
        animate={{ scale: opening && !reduce ? 1.12 : 1 }}
        transition={gateTransition}
      >
        {/* Art box: keeps the exact proportions of the reference on every screen */}
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2"
          style={{ width: ART_RATIO_WIDTH }}
        >
          <Image
            src={assets.background}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="select-none object-cover"
            draggable={false}
          />

          {/* Envelope position matches the reference: x 16.67%–83.33%, vertically centered */}
          <div className="absolute left-[16.67%] top-[50.1%] w-[66.67%] -translate-y-1/2">
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Open the invitation"
              className="relative block w-full cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#f4d58d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#8a0b10]"
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={
                opening
                  ? reduce
                    ? { opacity: 1 }
                    : { opacity: 0, y: -24, scale: 1.45 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={envelopeTransition}
              whileHover={opening || reduce ? undefined : { scale: 1.03 }}
              whileTap={opening || reduce ? undefined : { scale: 0.98 }}
            >
              {/* Idle float */}
              <motion.div
                animate={opening || reduce ? { y: 0 } : { y: [0, -7, 0] }}
                transition={
                  opening || reduce
                    ? { duration: 0.3 }
                    : {
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2,
                      }
                }
              >
                <Image
                  src={assets.envelope}
                  alt=""
                  width={960}
                  height={510}
                  priority
                  sizes="(min-width: 768px) 380px, 70vw"
                  className="h-auto w-full select-none drop-shadow-[0_12px_18px_rgba(40,0,0,0.35)]"
                  draggable={false}
                />

                {/* Seal, centered on the envelope */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative w-[41%]"
                    initial={
                      reduce ? false : { scale: 0.3, rotate: -25, opacity: 0 }
                    }
                    animate={
                      opening
                        ? reduce
                          ? { opacity: 0 }
                          : {
                              scale: [1, 1.18, 0],
                              rotate: [0, 0, 25],
                              opacity: [1, 1, 0],
                            }
                        : { scale: 1, rotate: 0, opacity: 1 }
                    }
                    transition={sealTransition}
                  >
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-[6%] rounded-full border border-[#f4d58d]/70"
                        animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 1.8,
                        }}
                      />
                    )}
                    <div className="relative aspect-square w-full">
                      {/* Flower border: slowly rotates behind the seal */}
                      <motion.div
                        className="absolute inset-0"
                        animate={reduce ? undefined : { rotate: 360 }}
                        transition={{
                          duration: 24,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Image
                          src={assets.flowerBorder}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 160px, 30vw"
                          className="select-none object-contain"
                          draggable={false}
                        />
                      </motion.div>

                      {/* Subho-bibaha: stays still on top */}
                      <div className="absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2">
                        <Image
                          src={assets.subhoBibaha}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 120px, 22vw"
                          className="select-none object-contain"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
