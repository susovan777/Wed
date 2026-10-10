import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The red ornate plate is an image; the "Bride" / "Groom" text is real text on top.
 * The text scales with the width of the label (cqw = percent of its container).
 */
export default function CartoucheLabel({
  image,
  children,
  className = "",
}: {
  /** Transparent plate image, cropped tight around the shape. */
  image?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative @container ${className}`}>
      {image ? (
        <Image
          src={image}
          alt=""
          width={1000}
          height={211}
          sizes="(min-width: 1024px) 26vw, 38vw"
          className="h-auto w-full select-none drop-shadow-[0_5px_6px_rgba(80,8,12,0.3)]"
          draggable={false}
        />
      ) : (
        // Plain fallback when no image is set
        <div className="aspect-1000/211 w-full rounded-lg bg-crimson" />
      )}

      <span className="absolute inset-0 flex items-center justify-center font-serif font-medium italic leading-none text-white text-[11cqw] [text-shadow:0_1px_2px_rgba(60,0,0,0.55)]">
        {children}
      </span>
    </div>
  );
}
