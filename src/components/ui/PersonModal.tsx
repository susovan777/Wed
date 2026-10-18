"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import BlurText from "@/components/motion/BlurText";
import CartoucheLabel from "./CartoucheLabel";
import FleurDivider from "./FleurDivider";
import type { PersonDetails } from "@/types/invitation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// True in the browser, false on the server (so the portal is never rendered during SSR).
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

type PersonModalProps = {
  open: boolean;
  /** Must be a stable function (wrap it in useCallback). */
  onClose: () => void;
  /** The button that opened the modal; it gets focus back on close. */
  returnFocusTo: RefObject<HTMLElement | null>;
  photo: string;
  label: string;
  button?: string;
  /** Portrait frame image for the card (2:3). A plain cream card is used if omitted. */
  frame?: string;
  name: string;
  parents?: string;
  details?: PersonDetails;
};

export default function PersonModal({
  open,
  onClose,
  returnFocusTo,
  photo,
  label,
  button,
  frame,
  name,
  parents,
  details,
}: PersonModalProps) {
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = returnFocusTo.current;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab inside the dialog
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!isClient) return null;

  const subtitle = details?.subtitle ?? parents;

  // The card appears first, then the content follows one piece at a time.
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : 0.3,
        staggerChildren: reduce ? 0 : 0.09,
      },
    },
  };
  const item: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: EASE },
        },
      };
  const photoItem: Variants = reduce
    ? item
    : {
        hidden: { opacity: 0, scale: 0.9 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, ease: EASE },
        },
      };
  const lineItem: Variants = reduce
    ? item
    : {
        hidden: { opacity: 0, scaleX: 0 },
        show: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.7, ease: EASE },
        },
      };
  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center bg-[#2a0a0e]/60 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          {/* The card keeps the 2:3 shape of the frame image. Its width is the
              smallest of: 92% of the screen width, 34rem, and 92% of the screen
              height. Text sizes use cqw, a percentage of this card's width. */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-[min(92vw,34rem,calc(80dvh*2/3))] @container"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {frame ? (
              <Image
                src={frame}
                alt=""
                width={1024}
                height={1536}
                sizes="(min-width: 640px) 34rem, 92vw"
                className="block h-auto w-full select-none drop-shadow-[0_20px_30px_rgba(40,8,12,0.45)]"
                draggable={false}
              />
            ) : (
              // Plain card when no frame image is set
              <div className="aspect-2/3 w-full rounded-2xl bg-[#fbf1dd] shadow-[0_20px_60px_rgba(40,8,12,0.45)]" />
            )}

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-[6%] top-[4.5%] z-10 grid size-[clamp(2rem,7cqw,2.5rem)] place-items-center rounded-full border border-[#d9bd84] bg-[#fbf1dd]/90 text-maroon transition hover:bg-[#fbf1dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <X className="size-[55%]" aria-hidden />
            </button>

            {/* Content area: stays inside the frame, clear of the lotus at the
                top and the corner ornaments. Scrolls if the text is long. */}
            <div
              tabIndex={0}
              className="absolute inset-x-[12%] bottom-[11%] top-[12%] overflow-y-auto text-center outline-none scrollbar-thin"
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center pb-2"
              >
                <motion.div variants={photoItem} className="w-[38cqw]">
                  <Image
                    src={photo}
                    alt=""
                    width={800}
                    height={800}
                    className="h-auto w-full select-none"
                    draggable={false}
                  />
                </motion.div>

                <motion.div variants={item} className="w-[40cqw] mt-5">
                  <CartoucheLabel image={button} className="w-full">
                    {label}
                  </CartoucheLabel>
                </motion.div>

                <h3
                  id={titleId}
                  aria-label={details?.title ?? name}
                  className="mt-[3cqw] font-serif font-semibold italic leading-tight text-maroon text-[clamp(1.5rem,8cqw,3rem)]"
                >
                  <span aria-hidden>
                    <BlurText
                      text={details?.title ?? name}
                      delay={0.45}
                      stagger={0.04}
                    />
                  </span>
                </h3>

                {subtitle && (
                  <motion.p
                    variants={item}
                    className="mt-[1cqw] font-serif font-medium text-[#4a1f1f] text-[clamp(0.9rem,5cqw,2.05rem)]"
                  >
                    {subtitle}
                  </motion.p>
                )}

                <motion.div variants={lineItem} className="mt-[3cqw] w-[44cqw]">
                  <FleurDivider />
                </motion.div>

                {details?.about && (
                  <motion.p
                    variants={item}
                    className="mt-[3cqw] whitespace-pre-line font-serif font-medium leading-relaxed text-[#4a1f1f] text-[clamp(0.9rem,4cqw,2.05rem)]"
                  >
                    {details.about}
                  </motion.p>
                )}

                {details?.facts && details.facts.length > 0 && (
                  <motion.dl
                    variants={list}
                    className="mt-[4cqw] grid w-full grid-cols-2 gap-x-[4cqw] gap-y-[3cqw]"
                  >
                    {details.facts.map((fact) => (
                      <motion.div key={fact.label} variants={item}>
                        <dt className="font-sans font-semibold uppercase tracking-[0.18em] text-crimson text-[clamp(0.6rem,1.6cqw,0.7rem)]">
                          {fact.label}
                        </dt>
                        <dd className="mt-[0.5cqw] font-serif font-medium text-[#4a1f1f] text-[clamp(0.9rem,3cqw,1.05rem)]">
                          {fact.value}
                        </dd>
                      </motion.div>
                    ))}
                  </motion.dl>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
