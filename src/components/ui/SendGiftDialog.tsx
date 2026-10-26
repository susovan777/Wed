"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Gift, X } from "lucide-react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

/** Side flourish: a fading line ending in a small diamond. */
function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex items-center gap-1 ${flip ? "flex-row-reverse" : ""}`}
    >
      <span
        className={`h-px w-6 lg:w-16 ${
          flip
            ? "bg-[linear-gradient(to_left,transparent,var(--color-crimson))]"
            : "bg-[linear-gradient(to_right,transparent,var(--color-crimson))]"
        }`}
      />
      <span className="size-1.5 rotate-45 bg-crimson" />
    </span>
  );
}

/**
 * The "Send a Gift" button. Clicking it opens the children (the QR card) in a popup.
 */
export default function SendGiftDialog({
  label,
  closeLabel,
  children,
}: {
  label: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  // The popup is drawn on document.body, so scroll animations above it cannot trap it
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const trigger = triggerRef.current;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab inside the popup
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      {/* Button with a flourish on each side */}
      <div className="flex items-center justify-center gap-2 lg:gap-3">
        <Flourish />
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="flex min-w-[min(66vw,16rem)] items-center justify-between gap-4 rounded-[1.4rem] border-2 border-gilt bg-[linear-gradient(180deg,#b3121f,#7d0714)] px-5 py-3 font-serif text-[1.2rem] font-medium text-white shadow-[0_8px_18px_rgba(125,7,20,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(125,7,20,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2 focus-visible:ring-offset-paper lg:min-w-88 lg:px-8 lg:py-4 lg:text-[1.6rem]"
        >
          <Gift
            className="size-6 shrink-0 text-[#fbe9c4] lg:size-8"
            strokeWidth={1.6}
            aria-hidden
          />
          <span>{label}</span>
          <ArrowRight
            className="size-5 shrink-0 lg:size-6"
            strokeWidth={1.8}
            aria-hidden
          />
        </button>
        <Flourish flip />
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="gift-dialog"
                className="fixed inset-0 z-70 grid place-items-center overflow-y-auto bg-[#3a0610]/70 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) close();
                }}
              >
                <motion.div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={label}
                  className="relative w-full max-w-[min(94vw,46rem)]"
                  initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label={closeLabel}
                    className="absolute -right-2 -top-2 z-10 grid size-9 place-items-center rounded-full border-2 border-gilt bg-crimson text-white shadow-md transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt lg:-right-3 lg:-top-3"
                  >
                    <X className="size-4" strokeWidth={2.2} aria-hidden />
                  </button>

                  <div className="max-h-[88dvh] overflow-y-auto rounded-2xl border border-gilt bg-[linear-gradient(180deg,#f8ecd1,#f3e1bd)] p-3 shadow-[0_20px_50px_rgba(60,5,15,0.5)] lg:p-5">
                    {children}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
