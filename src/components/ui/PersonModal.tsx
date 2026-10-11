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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[88dvh] w-full max-w-136 flex-col overflow-hidden rounded-2xl border border-[#d9bd84] bg-[#fbf1dd] shadow-[0_20px_60px_rgba(40,8,12,0.45)]"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full text-maroon transition hover:bg-maroon/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div
              tabIndex={0}
              className="overflow-y-auto px-6 pb-8 pt-9 text-center outline-none"
            >
              <Image
                src={photo}
                alt=""
                width={800}
                height={800}
                className="mx-auto h-auto w-[min(60%,210px)] select-none"
                draggable={false}
              />
              <CartoucheLabel image={button} className="mx-auto mt-2 w-44">
                {label}
              </CartoucheLabel>

              <h3
                id={titleId}
                className="mt-5 font-serif text-[2rem] font-semibold italic leading-tight text-maroon"
              >
                {details?.title ?? name}
              </h3>
              {subtitle && (
                <p className="mt-1 font-serif text-[1.05rem] font-medium text-[#4a1f1f]">
                  {subtitle}
                </p>
              )}

              <FleurDivider className="mx-auto mt-4 w-48" />

              {details?.about && (
                <p className="mt-4 whitespace-pre-line font-serif text-[1.05rem] font-medium leading-relaxed text-[#4a1f1f]">
                  {details.about}
                </p>
              )}

              {details?.facts && details.facts.length > 0 && (
                <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {details.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-crimson">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 font-serif text-[1.05rem] font-medium text-[#4a1f1f]">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
