import Image from "next/image";

/** Short line, lotus, line. Shows a small diamond if no lotus image is given. */
export default function LotusRule({
  lotus,
  className = "",
  lineClass = "w-16 lg:w-28",
}: {
  lotus?: string;
  className?: string;
  /** Width of each line, as Tailwind classes. */
  lineClass?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span
        className={`h-px bg-[linear-gradient(to_right,transparent,var(--color-crimson))] ${lineClass}`}
      />
      {lotus ? (
        <Image
          src={lotus}
          alt=""
          width={120}
          height={80}
          className="h-5 w-auto select-none lg:h-6"
          draggable={false}
        />
      ) : (
        <span className="size-2 rotate-45 bg-crimson" />
      )}
      <span
        className={`h-px bg-[linear-gradient(to_left,transparent,var(--color-crimson))] ${lineClass}`}
      />
    </div>
  );
}
