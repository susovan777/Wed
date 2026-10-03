export default function OrnamentDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <span className="h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-primary))] lg:w-36" />
      <span className="size-2 rotate-45 bg-primary" />
      <span className="h-px w-24 bg-[linear-gradient(to_left,transparent,var(--color-primary))] lg:w-36" />
    </div>
  );
}
