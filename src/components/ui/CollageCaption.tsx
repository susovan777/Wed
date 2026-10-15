import type { GalleryCaption } from "@/types/invitation";

/**
 * Three caption styles, placed around a photo. The parent must be `relative`
 * and sit inside a container with `container-type: inline-size`, because
 * text sizes use cqw (a percentage of that container's width).
 */

const TAPE_PLACE = {
  top: "bottom-full",
  bottom: "top-full",
} as const;

// Brush strokes overlap a corner of the photo and hang slightly outside it
const BRUSH_PLACE = {
  tl: "left-0 top-0 -translate-x-[12%] -translate-y-[30%] -rotate-[4deg]",
  tr: "right-0 top-0 translate-x-[12%] -translate-y-[30%] -rotate-[7deg]",
  bl: "left-0 bottom-0 -translate-x-[12%] translate-y-[30%] -rotate-[4deg]",
  br: "right-0 bottom-0 translate-x-[12%] translate-y-[30%] -rotate-[7deg]",
} as const;

// Notes sit beside or above/below the photo, outside it
const NOTE_PLACE = {
  top: "bottom-full left-0 mb-[5%] w-full text-left",
  bottom: "top-full left-0 mt-[5%] w-full text-left",
  left: "right-full top-0 mr-[7%] w-[75%] text-right",
  right: "left-full top-0 ml-[7%] w-[75%] text-left",
} as const;

function BrushSwatch() {
  return (
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute inset-0 size-full"
    >
      <path
        d="M8 12L30 8L62 12L100 7L140 11L176 6L192 14L196 26L190 36L197 48L188 58L194 68L158 72L120 68L84 73L48 69L16 72L10 60L4 48L11 38L3 26Z"
        fill="#efcdc4"
      />
      <path
        d="M14 22L60 18L110 21L170 16L186 24L150 30L96 28L40 32Z"
        fill="#e8b7ab"
        opacity="0.45"
      />
      <path
        d="M20 50L70 46L120 50L180 44L186 54L130 60L70 58L26 62Z"
        fill="#e8b7ab"
        opacity="0.35"
      />
    </svg>
  );
}

export default function CollageCaption({
  caption,
}: {
  caption: GalleryCaption;
}) {
  const { style, text, place } = caption;

  if (style === "tape") {
    const where = place === "bottom" ? "bottom" : "top";
    return (
      <p
        className={`pointer-events-none absolute left-0 w-full bg-[#c9d8dc] px-[0.6em] py-[0.35em] text-center font-mono leading-tight text-[#2f3a3c] [font-size:max(9px,2.6cqw)] lg:[font-size:max(11px,1.15cqw)] ${TAPE_PLACE[where]}`}
      >
        {text}
      </p>
    );
  }

  if (style === "brush") {
    const where =
      place === "tl" || place === "tr" || place === "bl" || place === "br"
        ? place
        : "bl";
    return (
      <div
        className={`pointer-events-none absolute w-[64%] ${BRUSH_PLACE[where]}`}
      >
        <BrushSwatch />
        <span className="relative grid place-items-center px-[8%] py-[9%] text-center font-hand leading-none text-[#1f1a18] [font-size:max(15px,5.4cqw)] lg:[font-size:max(18px,2.2cqw)]">
          {text}
        </span>
      </div>
    );
  }

  const where =
    place === "top" || place === "bottom" || place === "right" ? place : "left";
  return (
    <p
      className={`pointer-events-none absolute whitespace-pre-line font-mono leading-snug text-[#2b2b2b] [font-size:max(9px,2.5cqw)] lg:[font-size:max(11px,1.1cqw)] ${NOTE_PLACE[where]}`}
    >
      {text}
    </p>
  );
}
