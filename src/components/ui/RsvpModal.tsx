"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Check, Loader2, Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  readReply,
  saveReply,
  submitRsvp,
  whatsappLink,
  type Attending,
} from "@/lib/rsvp";
import type { RsvpFormText } from "@/types/invitation";
import LotusRule from "./LotusRule";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEFAULT_TEXT = {
  title: "Confirm Your Presence",
  intro: "We would love to know if you can join us.",
  nameLabel: "Your name",
  namePlaceholder: "Full name",
  attendLabel: "Will you attend?",
  yesLabel: "Joyfully accept",
  noLabel: "Regretfully decline",
  messageLabel: "Your blessings & wishes",
  messagePlaceholder: "Write a few words for the couple (optional)",
  submitLabel: "Send RSVP",
  thanksYes: {
    title: "Thank you!",
    text: "We are so happy you will be there. See you soon.",
  },
  thanksNo: {
    title: "Thank you for letting us know",
    text: "You will be missed. Your blessings mean a lot to us.",
  },
};

const MESSAGE_LIMIT = 300;

// True in the browser, false on the server (so the portal is never rendered during SSR).
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

// Petals that burst out of the check mark on the thank-you screen: [angle, distance px, size px, delay s]
const BURST: [number, number, number, number][] = Array.from(
  { length: 12 },
  (_, i) => {
    const angle = (i / 12) * Math.PI * 2 + (i % 2) * 0.18;
    return [angle, 70 + (i % 3) * 22, 10 + (i % 4) * 3, (i % 4) * 0.05];
  },
);

type Errors = { name?: string; attending?: string };

const FIELD =
  "w-full rounded-xl border border-[#d9bd84] bg-[#fffaf0] px-4 py-3 font-serif text-[1.05rem] font-medium text-[#3a1f1a] placeholder:text-[#a58a6a] transition focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20";
const LABEL =
  "mb-1.5 block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-crimson";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

type TextSet = typeof DEFAULT_TEXT;

function Thanks({
  attending,
  text,
  onClose,
}: {
  attending: Attending;
  text: TextSet;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const copy = attending === "yes" ? text.thanksYes : text.thanksNo;

  return (
    <div
      role="status"
      className="relative flex flex-col items-center px-2 py-6 text-center"
    >
      {!reduce &&
        BURST.map(([angle, distance, size, delay], i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[3.6rem] rounded-[0_100%_0_100%] bg-[linear-gradient(135deg,#ffc6d6,#f48fb1)]"
            style={{ width: size, height: size }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + 24,
              opacity: [0, 1, 1, 0],
              scale: 1,
              rotate: angle * 90,
            }}
            transition={{ duration: 1.6, delay: 0.2 + delay, ease: "easeOut" }}
          />
        ))}

      <motion.div
        initial={reduce ? false : { scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="grid size-16 place-items-center rounded-full bg-crimson text-white shadow-lg"
      >
        <Check className="size-8" strokeWidth={2.2} aria-hidden />
      </motion.div>

      <motion.h3
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        className="mt-5 font-serif text-[1.8rem] font-semibold italic leading-tight text-maroon"
      >
        {copy.title}
      </motion.h3>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
        className="mt-2 max-w-88 font-serif text-[1.05rem] font-medium leading-relaxed text-[#4a1f1f]"
      >
        {copy.text}
      </motion.p>

      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="mt-6 rounded-full border border-[#d9bd84] bg-[#fffaf0] px-7 py-2 font-serif text-[1.05rem] font-medium text-maroon transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
      >
        Close
      </button>
    </div>
  );
}

function RsvpForm({
  endpoint,
  slug,
  whatsapp,
  text,
  titleId,
  onClose,
}: {
  endpoint: string;
  slug: string;
  whatsapp?: string;
  text: TextSet;
  titleId: string;
  onClose: () => void;
}) {
  // Read what this guest sent before, once, when the form opens
  const [stored] = useState(() => readReply(slug));

  const [name, setName] = useState(stored?.name ?? "");
  const [attending, setAttending] = useState<Attending | "">(
    stored?.attending ?? "",
  );
  const [message, setMessage] = useState(stored?.message ?? "");
  const [company, setCompany] = useState(""); // hidden trap field
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [sentAs, setSentAs] = useState<Attending>("yes");

  const openedAt = useRef(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const nameId = useId();
  const messageId = useId();
  const groupId = useId();

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;

    const trimmed = name.trim();
    const next: Errors = {};
    if (trimmed.length < 2) next.name = "Please enter your name.";
    if (!attending) next.attending = "Please choose one.";
    setErrors(next);

    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.attending || !attending) {
      groupRef.current?.querySelector("input")?.focus();
      return;
    }

    // Bots fill the hidden field, or send faster than a person could type.
    const tooFast = !stored && Date.now() - openedAt.current < 2000;
    if (company || tooFast) {
      setSentAs(attending);
      setStatus("success");
      return;
    }

    setStatus("sending");
    const id = stored?.id ?? makeId();
    const cleanMessage = message.trim();
    const result = await submitRsvp(endpoint, {
      id,
      name: trimmed,
      attending,
      message: cleanMessage,
      company: "",
    });

    if (result === "error") {
      setStatus("error");
      return;
    }

    saveReply(slug, { id, name: trimmed, attending, message: cleanMessage });
    setSentAs(attending);
    setStatus("success");
  };

  if (status === "success") {
    return <Thanks attending={sentAs} text={text} onClose={onClose} />;
  }

  const sending = status === "sending";
  const waText = `Hi, I'm ${name.trim() || "a guest"}. I ${
    attending === "no" ? "won't be able to attend" : "will attend"
  }.${message.trim() ? ` ${message.trim()}` : ""}`;

  const options: { value: Attending; label: string }[] = [
    { value: "yes", label: text.yesLabel },
    { value: "no", label: text.noLabel },
  ];

  return (
    <>
      <h2
        id={titleId}
        className="font-serif text-[1.9rem] font-semibold italic leading-tight text-maroon"
      >
        {text.title}
      </h2>
      <LotusRule className="mt-2" lineClass="w-10" />
      <p className="mt-3 font-serif text-[1rem] font-medium text-[#4a1f1f]">
        {text.intro}
      </p>
      {stored && (
        <p className="mt-2 font-serif text-[0.9rem] italic text-[#7a4a3a]">
          You have already replied. Sending again will update your reply.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-5 space-y-5 text-left">
        {/* Name */}
        <div>
          <label htmlFor={nameId} className={LABEL}>
            {text.nameLabel}
          </label>
          <input
            ref={nameRef}
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={text.namePlaceholder}
            autoComplete="name"
            maxLength={80}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={FIELD}
          />
          {errors.name && (
            <p
              id={`${nameId}-error`}
              className="mt-1 font-sans text-sm text-crimson"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Attending */}
        <div>
          <p id={groupId} className={LABEL}>
            {text.attendLabel}
          </p>
          <div
            ref={groupRef}
            role="radiogroup"
            aria-labelledby={groupId}
            aria-describedby={errors.attending ? `${groupId}-error` : undefined}
            className="grid grid-cols-2 gap-3"
          >
            {options.map((option) => {
              const selected = attending === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center font-serif text-[1rem] font-medium leading-tight transition has-focus-visible:ring-2 has-focus-visible:ring-crimson ${
                    selected
                      ? "border-crimson bg-[linear-gradient(180deg,#b3121f,#7d0714)] text-white shadow-md"
                      : "border-[#d9bd84] bg-[#fffaf0] text-[#3a1f1a] hover:border-crimson/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={selected}
                    onChange={() => {
                      setAttending(option.value);
                      setErrors((prev) => ({ ...prev, attending: undefined }));
                    }}
                    className="sr-only"
                  />
                  {selected && (
                    <Check className="size-4 shrink-0" aria-hidden />
                  )}
                  {option.label}
                </label>
              );
            })}
          </div>
          {errors.attending && (
            <p
              id={`${groupId}-error`}
              className="mt-1 font-sans text-sm text-crimson"
            >
              {errors.attending}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor={messageId} className={LABEL}>
            {text.messageLabel}
          </label>
          <textarea
            id={messageId}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={text.messagePlaceholder}
            maxLength={MESSAGE_LIMIT}
            className={`${FIELD} resize-none`}
          />
          <p className="mt-1 text-right font-sans text-xs text-[#8a6a4a]">
            {message.length}/{MESSAGE_LIMIT}
          </p>
        </div>

        {/* Hidden trap field: people never see it, bots often fill it */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {status === "error" && (
          <div
            role="alert"
            className="rounded-xl border border-crimson/30 bg-crimson/5 px-4 py-3 font-serif text-[0.95rem] font-medium text-[#7a1018]"
          >
            We could not send your reply. Please check your connection and try
            again.
            {whatsapp && (
              <>
                {" "}
                Or{" "}
                <a
                  href={whatsappLink(whatsapp, waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  RSVP on WhatsApp instead
                </a>
                .
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(180deg,#b3121f,#7d0714)] px-6 py-3 font-serif text-[1.15rem] font-medium text-white shadow-[0_6px_14px_rgba(125,7,20,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf1dd] disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
        >
          {sending ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-5" strokeWidth={1.6} aria-hidden />
              {text.submitLabel}
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default function RsvpModal({
  open,
  onClose,
  returnFocusTo,
  endpoint,
  slug,
  whatsapp,
  text,
}: {
  open: boolean;
  /** Must be a stable function (wrap it in useCallback). */
  onClose: () => void;
  /** The button that opened the modal; it gets focus back on close. */
  returnFocusTo: RefObject<HTMLElement | null>;
  endpoint: string;
  /** Used to remember this guest's reply in their browser. */
  slug: string;
  /** Digits with country code, e.g. 919876543210. Enables the WhatsApp fallback. */
  whatsapp?: string;
  text?: RsvpFormText;
}) {
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
        'button:not([disabled]), input:not([tabindex="-1"]), textarea, a[href]',
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

  // Anything left out of the content falls back to the default wording
  const merged: TextSet = {
    ...DEFAULT_TEXT,
    ...Object.fromEntries(
      Object.entries(text ?? {}).filter(([, value]) => value !== undefined),
    ),
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
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-120 overflow-hidden rounded-2xl border border-[#d9bd84] bg-[#fbf1dd] shadow-[0_20px_60px_rgba(40,8,12,0.45)] before:pointer-events-none before:absolute before:inset-1.5 before:rounded-xl before:border before:border-[#e8d5a6]"
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

            <div className="relative max-h-[90dvh] overflow-y-auto px-6 pb-7 pt-9 text-center">
              <RsvpForm
                endpoint={endpoint}
                slug={slug}
                whatsapp={whatsapp}
                text={merged}
                titleId={titleId}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
