import type { ReactNode } from "react";

/*
 * The frame is made of three parts, so nothing gets stretched:
 *   a curved top cap (SVG), a straight body (CSS), and a curved bottom cap (SVG).
 * The caps scale with the width only. All numbers below are in units of the
 * frame's width (100 = the full width).
 *   h     height of the curved cap
 *   inset red strip on each side of the panel
 *   r     radius of the scooped corners
 *   gap   distance from the gold edge to the second border, out in the red strip
 */
const GEOMETRY = {
  mobile: { h: 14, inset: 8, r: 5.5, gap: 1.8 },
  desktop: { h: 8, inset: 2.2, r: 3.2, gap: 0.6 },
} as const;

type Variant = keyof typeof GEOMETRY;

// Panel colors: the top cap and body start with TOP, the body and bottom cap end with BOTTOM.
const PANEL_TOP = "#f8ecd1";
const PANEL_BOTTOM = "#f3e1bd";
const GOLD = "#e3b85c";

function capPath({ h, inset: L, r }: { h: number; inset: number; r: number }) {
  const y0 = h * 0.55; // height of the low edge near the corners
  const a = L + r;
  const b = 100 - L - r;
  const k = (50 - a) / 2; // smooth S-curve up to the center peak
  return (
    `M${L} ${h}L${L} ${y0 + r}A${r} ${r} 0 0 0 ${a} ${y0}` +
    `C${a + k} ${y0} ${50 - k} 0 50 0` +
    `C${50 + k} 0 ${b - k} ${y0} ${b} ${y0}` +
    `A${r} ${r} 0 0 0 ${100 - L} ${y0 + r}L${100 - L} ${h}`
  );
}

function PanelCap({
  variant,
  flip = false,
  className = "",
}: {
  variant: Variant;
  flip?: boolean;
  className?: string;
}) {
  const g = GEOMETRY[variant];
  const d = capPath(g);

  // The second border is the same outline, grown outward from the bottom center of
  // the cap, so it runs parallel to the gold edge, out in the red.
  const sx = 1 + g.gap / (50 - g.inset);
  const sy = 1 + g.gap / g.h;

  return (
    <svg
      viewBox={`0 0 100 ${g.h}`}
      preserveAspectRatio="none"
      aria-hidden
      className={`block w-full overflow-visible ${
        flip ? "-scale-y-100" : ""
      } ${className}`}
    >
      <path d={`${d}Z`} fill={flip ? PANEL_BOTTOM : PANEL_TOP} />
      <path
        d={d}
        fill="none"
        stroke={GOLD}
        strokeWidth="1.6"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.8"
        strokeWidth="1"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        transform={`translate(50 ${g.h}) scale(${sx} ${sy}) translate(-50 ${-g.h})`}
      />
    </svg>
  );
}

function GoldLotus({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 60" aria-hidden className="h-auto w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdeaa6" />
          <stop offset="1" stopColor="#d89a2a" />
        </linearGradient>
      </defs>
      <g
        fill={`url(#${id})`}
        stroke="#b4741a"
        strokeWidth="0.6"
        strokeLinejoin="round"
      >
        <path d="M50 46C34 48 14 42 5 29C20 29 38 35 50 46Z" />
        <path d="M50 46C66 48 86 42 95 29C80 29 62 35 50 46Z" />
        <path d="M50 46C38 46 26 38 22 22C34 24 46 32 50 46Z" />
        <path d="M50 46C62 46 74 38 78 22C66 24 54 32 50 46Z" />
        <path d="M50 4C42 15 42 33 50 46C58 33 58 15 50 4Z" />
      </g>
      <path
        d="M36 52H64"
        stroke="#d89a2a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Gold lotus with a thin gold line either side, sitting on the red band. */
function GoldOrnament({ id, className }: { id: string; className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-3 flex items-center justify-center gap-2 ${className}`}
    >
      <span className="h-px w-[10%] bg-[linear-gradient(to_right,transparent,#e3b85c)]" />
      <div className="w-[15%] max-w-27.5 lg:w-[7.2%] lg:max-w-35">
        <GoldLotus id={id} />
      </div>
      <span className="h-px w-[10%] bg-[linear-gradient(to_left,transparent,#e3b85c)]" />
    </div>
  );
}

export default function GiftFrame({
  children,
  bodyClassName = "",
}: {
  children: ReactNode;
  /** Extra classes for the parchment area (padding, for example). */
  bodyClassName?: string;
}) {
  return (
    <div className="relative bg-[#9a0c1a] bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,24,40,0.55),transparent_65%),repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0_2px,transparent_2px_16px)] pb-[6%] pt-[6%] lg:pb-[3.2%] lg:pt-[3.2%]">
      {/* <GoldOrnament id="gift-lotus-top" className="top-1 lg:top-2" /> */}

      <PanelCap variant="mobile" className="lg:hidden" />
      <PanelCap variant="desktop" className="hidden lg:block" />

      {/* Straight middle part. The side margins are the red strips with a gold edge.
          --l2 is where the second border runs: the strip's inset minus the gap. */}
      <div className="relative [--l2:6.2%] lg:[--l2:1.6%]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-(--l2) right-(--l2) border-x border-[#e3b85c]/80"
        />
        <div
          className={`mx-[8%] border-x-[1.5px] border-[#e3b85c] bg-[linear-gradient(180deg,#f8ecd1,#f3e1bd)] lg:mx-[2.2%] ${bodyClassName}`}
        >
          {children}
        </div>
      </div>

      <PanelCap variant="mobile" flip className="lg:hidden" />
      <PanelCap variant="desktop" flip className="hidden lg:block" />

      {/* <GoldOrnament id="gift-lotus-bottom" className="bottom-1 lg:bottom-2" /> */}
    </div>
  );
}
