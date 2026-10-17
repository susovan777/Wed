"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyUpiButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Older browsers, or a page without clipboard permission
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy UPI ID"
      className="relative grid size-8 place-items-center rounded-md text-crimson transition hover:bg-crimson/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
    >
      {copied ? (
        <Check className="size-[1.15rem]" strokeWidth={1.8} aria-hidden />
      ) : (
        <Copy className="size-[1.15rem]" strokeWidth={1.8} aria-hidden />
      )}

      {/* Announced to screen readers, and shown as a small bubble */}
      <span role="status" className="sr-only">
        {copied ? "UPI ID copied" : ""}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#4a1f1f] px-2 py-1 font-sans text-xs text-white transition duration-200 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        Copied
      </span>
    </button>
  );
}
