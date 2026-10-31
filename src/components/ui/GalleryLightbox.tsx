"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "motion/react";
import type { GalleryPhoto } from "@/types/invitation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// True in the browser, false on the server (so the portal is never rendered during SSR).
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

const ROUND_BUTTON =
  "grid size-10 place-items-center rounded-full bg-[#fbf1dd]/90 text-maroon shadow-md transition hover:bg-[#fbf1dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c985] sm:size-11";

export default function GalleryLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
  returnFocusTo,
}: {
  photos: GalleryPhoto[];
  /** The photo being shown, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  /** Must be a stable function (wrap it in useCallback). */
  onClose: () => void;
  /** The tile that opened the viewer; it gets focus back on close. */
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = index !== null;
  const count = photos.length;

  const go = useCallback(
    (delta: 1 | -1) => {
      if (index === null || count < 2) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Lock page scroll, move focus in, and give focus back on close
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = returnFocusTo.current;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, returnFocusTo]);

  // Keyboard: Escape closes, arrows change photo, Tab stays inside the viewer
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        go(1);
      } else if (event.key === "ArrowLeft") {
        go(-1);
      } else if (event.key === "Tab" && panelRef.current) {
        const focusable =
          panelRef.current.querySelectorAll<HTMLElement>("button");
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
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go, onClose]);

  if (!isClient) return null;

  const photo = index === null ? null : photos[index];

  const slide: Variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: reduce ? 0 : d * 60,
      scale: reduce ? 1 : 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.35, ease: EASE },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: reduce ? 0 : d * -60,
      transition: { duration: 0.2 },
    }),
  };

  // Swipe left or right on a phone to change photo
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return createPortal(
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-60 flex items-center justify-center bg-[#1d0709]/55 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`absolute right-4 top-4 z-10 ${ROUND_BUTTON}`}
          >
            <X className="size-5" aria-hidden />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6 ${ROUND_BUTTON}`}
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6 ${ROUND_BUTTON}`}
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </>
          )}

          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-sm tracking-[0.2em] text-[#fbf1dd]">
            {index + 1} / {count}
          </p>

          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.figure
              key={index}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              onPanEnd={onPanEnd}
              style={{ touchAction: "pan-y" }}
              className="rounded-2xl border-[6px] border-[#fbf1dd] bg-[#fbf1dd] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt ?? ""}
                width={1600}
                height={1200}
                sizes="92vw"
                loading="eager"
                className="block h-auto max-h-[78dvh] w-auto max-w-[calc(92vw-1rem)] rounded-xl object-contain"
                draggable={false}
              />
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
