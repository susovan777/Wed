import Image from "next/image";

/** Full-width line, centered lotus, line. The lines fade out toward the screen edges. */
export default function LotusDivider({
  src,
  className = "",
}: {
  /** Lotus image (transparent PNG/WebP). A small diamond is shown if omitted. */
  src?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex w-full items-center gap-3 lg:gap-5 ${className}`}
    >
      <span className="h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--color-crimson))]" />
      {src ? (
        <Image
          src={src}
          alt=""
          width={240}
          height={160}
          className="h-[clamp(34px,6vw,56px)] w-auto select-none"
          draggable={false}
        />
      ) : (
        <span className="size-2 rotate-45 bg-crimson" />
      )}
      <span className="h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--color-crimson))]" />
    </div>
  );
}
