"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import BlueButterfly from "./BlueButterfly";
import Reveal from "@/components/motion/Reveal";
import CollageCaption from "./CollageCaption";
import GalleryLightbox from "./GalleryLightbox";
import type { GalleryPhoto } from "@/types/invitation";

/*
 * The collage is drawn on a canvas that keeps a fixed shape:
 *   phones:  100 wide x 174 tall (portrait)
 *   desktop: 100 wide x 68 tall (landscape)
 * Every position below is in those units (x, y, width, and height for bars),
 * so the whole collage scales together on any screen.
 */
const M_H = 174;
const D_H = 68;

type Box = [x: number, y: number, w: number, h?: number];

type Slot = {
  /** Position on phones */
  m: Box;
  /** Position on desktop */
  d: Box;
  /** Shape of the photo (width : height) */
  ratio: string;
};

// Photo 1 to 5, in the order they appear in the content.
const SLOTS: Slot[] = [
  { m: [4, 10, 54], d: [15, 6, 21], ratio: "aspect-[3/4]" },
  { m: [62, 20, 34], d: [39, 11, 19], ratio: "aspect-[3/4]" },
  { m: [4, 88, 38], d: [61, 4, 23], ratio: "aspect-[3/4]" },
  { m: [46, 86, 50], d: [23, 41, 34], ratio: "aspect-[5/3] lg:aspect-[3/2]" },
  { m: [46, 120, 36], d: [62, 38, 20], ratio: "aspect-[3/4]" },
];

// Small colored bars behind the photos, like the first reference.
const BARS: { m: Box; d: Box; color: string }[] = [
  { m: [0.8, 36, 1.8, 28], d: [11, 14, 1.4, 18], color: "#a39565" },
  { m: [64, 68, 24, 2.6], d: [42, 37.8, 14, 1.8], color: "#b8917a" },
  { m: [97.2, 90, 1.8, 24], d: [87, 12, 1.4, 18], color: "#6e8b3d" },
  { m: [86, 122, 1.8, 24], d: [85, 40, 1.4, 20], color: "#8b6648" },
  { m: [8, 141.5, 26, 2.4], d: [24, 65, 12, 1.4], color: "#9b1c1c" },
];

// Blue butterflies. `photo` is the photo's position in the list (0 is the first).
// left / top place its top-left corner on the photo, as a percentage of the photo.
// `from` is where its flight starts, in percent of its own size.
const BUTTERFLIES: {
  photo: number;
  left: string;
  top: string;
  size: string;
  rotate: number;
  from: [number, number];
  delay: number;
  rest: number;
  pause: number;
}[] = [
  {
    photo: 0,
    left: "-10%",
    top: "-5%",
    size: "26%",
    rotate: -28,
    from: [-700, -900],
    delay: 1.2,
    rest: 2.4,
    pause: 1.2,
  },
  {
    photo: 2,
    left: "-5%",
    top: "86%",
    size: "19%",
    rotate: -60,
    from: [-600, 700],
    delay: 2.2,
    rest: 2.0,
    pause: 1.8,
  },
  {
    photo: 3,
    left: "90%",
    top: "-10%",
    size: "15%",
    rotate: -45,
    from: [900, -800],
    delay: 1.6,
    rest: 1.8,
    pause: 0.9,
  },
];

const pct = (value: number, base: number) =>
  `${((value / base) * 100).toFixed(3)}%`;

// Turns the phone and desktop boxes into CSS variables used by the classes below.
function vars(m: Box, d: Box): CSSProperties {
  return {
    "--ml": `${m[0]}%`,
    "--mt": pct(m[1], M_H),
    "--mw": `${m[2]}%`,
    "--mh": m[3] !== undefined ? pct(m[3], M_H) : undefined,
    "--dl": `${d[0]}%`,
    "--dt": pct(d[1], D_H),
    "--dw": `${d[2]}%`,
    "--dh": d[3] !== undefined ? pct(d[3], D_H) : undefined,
  } as CSSProperties;
}

export default function GalleryCollage({
  photos,
  butterflies = true,
}: {
  photos: GalleryPhoto[];
  butterflies?: boolean;
}) {
  const lastTile = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const closeViewer = useCallback(() => setOpen(null), []);

  // Only as many photos as there are slots in the collage
  const shown = photos.slice(0, SLOTS.length);

  return (
    <>
      {/* container-type lets captions size themselves from the canvas width (cqw) */}
      <div className="relative mx-auto aspect-100/174 w-full max-w-140 @container lg:aspect-100/68 lg:max-w-275">
        {BARS.map((bar, i) => (
          <span
            key={i}
            aria-hidden
            style={{ ...vars(bar.m, bar.d), backgroundColor: bar.color }}
            className="absolute left-(--ml) top-(--mt) h-(--mh) w-(--mw) lg:left-(--dl) lg:top-(--dt) lg:h-(--dh) lg:w-(--dw)"
          />
        ))}

        {shown.map((photo, i) => {
          const slot = SLOTS[i];
          return (
            <div
              key={photo.src}
              style={vars(slot.m, slot.d)}
              className="absolute left-(--ml) top-(--mt) z-1 w-(--mw) lg:left-(--dl) lg:top-(--dt) lg:w-(--dw)"
            >
              <Reveal y={30} delay={i * 0.1} className="relative">
                {photo.caption && <CollageCaption caption={photo.caption} />}
                {butterflies &&
                  BUTTERFLIES.filter((b) => b.photo === i).map((b, k) => (
                    <BlueButterfly
                      key={k}
                      left={b.left}
                      top={b.top}
                      size={b.size}
                      rotate={b.rotate}
                      from={b.from}
                      delay={b.delay}
                      restSeconds={b.rest}
                      pauseSeconds={b.pause}
                    />
                  ))}
                <button
                  type="button"
                  onClick={(event) => {
                    lastTile.current = event.currentTarget;
                    setOpen(i);
                  }}
                  aria-haspopup="dialog"
                  aria-label={
                    photo.alt
                      ? `Open photo: ${photo.alt}`
                      : `Open photo ${i + 1} of ${shown.length}`
                  }
                  className={`group relative block w-full overflow-hidden border-[3px] border-[#fffdf6] bg-[#efe3cc] shadow-[0_2px_8px_rgba(80,50,30,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-crimson lg:border-[5px] ${slot.ratio}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 24vw, 56vw"
                    className="select-none object-cover transition duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </button>

                {photo.caption && <CollageCaption caption={photo.caption} />}
              </Reveal>
            </div>
          );
        })}
      </div>

      <GalleryLightbox
        photos={shown}
        index={open}
        onIndexChange={setOpen}
        onClose={closeViewer}
        returnFocusTo={lastTile}
      />
    </>
  );
}
