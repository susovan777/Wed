/**
 * A strip across the full width that repeats `src` horizontally.
 * The tile keeps its proportions: its height always fills the strip and
 * the width follows, so it is never squeezed or stretched on narrow screens.
 * Extra width simply shows more repeats, trimmed equally at both ends.
 *
 * Set the strip height through className (for example "h-10 lg:h-16").
 */
export default function RepeatBorder({
  src,
  position,
  className = "",
}: {
  src: string;
  position: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
      }}
    />
  );
}
