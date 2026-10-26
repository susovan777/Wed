"use client";

import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "bn", label: "বাংলা" },
];

export default function LanguageToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language"
      // Move it to another corner by changing right/top (for example left-3 bottom-3).
      className="fixed left-3 bottom-3 z-50 flex rounded-full border border-gilt/80 bg-cream/90 p-0.5 font-sans text-xs shadow-[0_4px_12px_rgba(80,30,20,0.25)] backdrop-blur lg:left-5 lg:bottom-5 lg:text-sm"
    >
      {OPTIONS.map(({ value, label }) => {
        const active = lang === value;
        return (
          <button
            key={value}
            type="button"
            lang={value}
            aria-pressed={active}
            onClick={() => onChange(value)}
            className={`rounded-full px-3 py-1.5 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson ${
              active
                ? "bg-crimson text-white"
                : "text-crimson hover:bg-crimson/10"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
