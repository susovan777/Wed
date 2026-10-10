const LINE = "#b98b46";

/** A thin gold line that fades outward, with a small crimson fleur in the middle. */
export default function FleurDivider({
  vertical = false,
  className = "",
}: {
  vertical?: boolean;
  className?: string;
}) {
  const toCenterA = `linear-gradient(${vertical ? "to bottom" : "to right"}, transparent, ${LINE})`;
  const toCenterB = `linear-gradient(${vertical ? "to top" : "to left"}, transparent, ${LINE})`;
  const lineClass = vertical ? "w-px flex-1" : "h-px flex-1";

  return (
    <div
      aria-hidden
      className={`flex items-center gap-2 ${vertical ? "flex-col" : "w-full"} ${className}`}
    >
      <span className={lineClass} style={{ background: toCenterA }} />
      <svg
        viewBox="0 0 24 24"
        className="size-5 shrink-0 text-[#8f1020]"
        fill="currentColor"
      >
        <path d="M12 2L16 12L12 22L8 12Z" />
        <path d="M12 12C8 8 4 9 3 12C4 15 8 16 12 12Z" />
        <path d="M12 12C16 8 20 9 21 12C20 15 16 16 12 12Z" />
      </svg>
      <span className={lineClass} style={{ background: toCenterB }} />
    </div>
  );
}
