/*
 * Faint floral line art, drawn in code (no image needed).
 * A flowering branch that grows from the outer edge toward the middle of the page.
 * Use `flip` for the right side so it mirrors the left one.
 *
 * Colours: flowers use the text colour (set it with a text-* class, default is a soft crimson),
 * stems and leaves use FOLIAGE. Both are kept very light so they sit behind the content.
 */
const FOLIAGE = "#c9a24b";

type Spot = { x: number; y: number; r?: number; s?: number };

/** A pointed leaf with a centre vein. Points up before rotating. */
function Leaf({ x, y, r = 0, s = 1 }: Spot) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C6 -10 6 -26 0 -38C-6 -26 -6 -10 0 0Z" />
      <path d="M0 -3V-32" fill="none" strokeOpacity="0.6" />
    </g>
  );
}

/** A five-petal flower. */
function Flower({ x, y, r = 0, s = 1 }: Spot) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          d="M0 0C-8 -5 -8 -18 0 -22C8 -18 8 -5 0 0Z"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="3.2" />
      <circle r="1" fill="currentColor" stroke="none" />
    </g>
  );
}

/** A lotus bloom with five pointed petals. */
function Lotus({ x, y, r = 0, s = 1 }: Spot) {
  const petal = "M0 0C-9 -14 -7 -30 0 -42C7 -30 9 -14 0 0Z";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={petal} transform="rotate(-62) scale(0.78)" />
      <path d={petal} transform="rotate(62) scale(0.78)" />
      <path d={petal} transform="rotate(-32) scale(0.92)" />
      <path d={petal} transform="rotate(32) scale(0.92)" />
      <path d={petal} />
      <path d="M-15 3C-8 11 8 11 15 3" fill="none" />
    </g>
  );
}

/** A small closed bud. */
function Bud({ x, y, r = 0, s = 1 }: Spot) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C-6 -4 -5 -13 0 -18C5 -13 6 -4 0 0Z" />
      <path d="M0 -2V-12" fill="none" strokeOpacity="0.6" />
    </g>
  );
}

export default function FloralLineArt({
  className = "",
  flip = false,
}: {
  /** Position and size, e.g. "left-[11%] top-1/2 w-[18%] -translate-y-1/2". */
  className?: string;
  /** Mirror it, for the right side. */
  flip?: boolean;
}) {
  // Fades out at both ends, so it melts into the page
  const fade =
    "linear-gradient(to right, transparent, #000 18%, #000 72%, transparent)";

  return (
    <svg
      viewBox="0 0 240 220"
      aria-hidden
      className={`pointer-events-none absolute z-0 select-none text-crimson/25 ${
        flip ? "-scale-x-100" : ""
      } ${className}`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      fill="currentColor"
      fillOpacity="0.05"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Stems and leaves */}
      <g stroke={FOLIAGE} strokeOpacity="0.5" fill={FOLIAGE} fillOpacity="0.06">
        <g fill="none">
          <path d="M8 212C40 180 62 160 96 138C130 116 150 92 176 70C196 52 210 36 226 14" />
          <path d="M96 138C88 118 80 104 74 92" />
          <path d="M142 104C150 90 152 76 150 62" />
          <path d="M122 120C150 126 172 124 190 112" />
          <path d="M42 178C30 160 28 144 30 128" />
          <path d="M178 70C192 68 202 66 208 60" />
        </g>

        <Leaf x={42} y={178} r={-60} s={0.9} />
        <Leaf x={58} y={166} r={120} />
        <Leaf x={80} y={150} r={-50} />
        <Leaf x={100} y={136} r={125} />
        <Leaf x={122} y={120} r={-45} s={1.05} />
        <Leaf x={142} y={104} r={130} />
        <Leaf x={160} y={86} r={-40} s={0.9} />
        <Leaf x={178} y={70} r={125} s={0.9} />
        <Leaf x={196} y={52} r={-35} s={0.8} />
        <Leaf x={86} y={110} r={-30} s={0.7} />
        <Leaf x={156} y={72} r={25} s={0.7} />
      </g>

      {/* Flowers */}
      <Lotus x={74} y={92} r={-8} s={1.15} />
      <Flower x={150} y={62} r={10} s={0.95} />
      <Flower x={190} y={112} r={-15} s={0.85} />
      <Flower x={30} y={128} r={20} s={0.7} />
      <Bud x={208} y={60} r={60} s={0.9} />
      <Bud x={226} y={14} r={35} s={0.8} />

      {/* Fine dots */}
      <g stroke="none" fillOpacity="0.25">
        <circle cx="112" cy="70" r="1.6" />
        <circle cx="124" cy="52" r="1.2" />
        <circle cx="52" cy="108" r="1.4" />
        <circle cx="206" cy="92" r="1.3" />
        <circle cx="170" cy="150" r="1.5" />
        <circle cx="20" cy="176" r="1.3" />
      </g>
    </svg>
  );
}
