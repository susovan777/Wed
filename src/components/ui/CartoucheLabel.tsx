import Image from "next/image";
import type { ReactNode, Ref } from "react";

/**
 * The red ornate plate is an image; the "Bride" / "Groom" text is real text on top.
 * Pass `onClick` to make it a button (it also gets hover and focus styles).
 * The text scales with the label width (cqw = percent of the label's own width).
 */
export default function CartoucheLabel({
  image,
  children,
  className = "",
  onClick,
  buttonRef,
  ariaLabel,
}: {
  /** Transparent plate image, cropped tight around the shape. */
  image?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
  ariaLabel?: string;
}) {
  const content = (
    <span className="relative block @container">
      {image ? (
        <Image
          src={image}
          alt=""
          width={1000}
          height={211}
          sizes="(min-width: 1024px) 26vw, 40vw"
          className="block h-auto w-full select-none drop-shadow-[0_5px_6px_rgba(80,8,12,0.3)]"
          draggable={false}
        />
      ) : (
        // Plain fallback when no image is set
        <span className="block aspect-1000/211 w-full rounded-lg bg-crimson" />
      )}

      <span className="absolute inset-0 flex items-center justify-center font-serif font-medium leading-none text-white text-[11cqw] [text-shadow:0_1px_2px_rgba(60,0,0,0.55)]">
        {children}
      </span>
    </span>
  );

  if (!onClick) {
    return <div className={className}>{content}</div>;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      className={`block cursor-pointer rounded-lg outline-none transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${className}`}
    >
      {content}
    </button>
  );
}
