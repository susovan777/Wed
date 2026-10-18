"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { Mail } from "lucide-react";
import { readReplyRaw, subscribeReply } from "@/lib/rsvp";
import type { RsvpFormText } from "@/types/invitation";
import RsvpModal from "./RsvpModal";

export default function RsvpButton({
  label,
  endpoint,
  slug,
  whatsapp,
  text,
}: {
  label: string;
  endpoint: string;
  slug: string;
  whatsapp?: string;
  text?: RsvpFormText;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  // Whether this guest has already replied from this browser
  const replied = useSyncExternalStore(
    subscribeReply,
    () => readReplyRaw(slug) !== null,
    () => false,
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-3 rounded-full border border-gilt bg-[linear-gradient(180deg,#fdf3dc,#efd6a0)] px-8 py-3 font-serif text-[1.1rem] font-semibold text-[#5a1a10] shadow-[0_6px_14px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.7)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbe9c8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#8e0e14] lg:text-[1.2rem]"
      >
        {label}
        <Mail className="size-5" strokeWidth={1.8} aria-hidden />
      </button>

      {replied && (
        <p className="mt-3 font-serif text-[0.85rem] italic text-[#fbe9c8]/80">
          You have already replied. Tap the button to update your reply.
        </p>
      )}

      <RsvpModal
        open={open}
        onClose={close}
        returnFocusTo={triggerRef}
        endpoint={endpoint}
        slug={slug}
        whatsapp={whatsapp}
        text={text}
      />
    </>
  );
}
