import { useId } from "react";
import Reveal from "@/components/motion/Reveal";
import BlessingPetals from "@/components/ui/BlessingPetals";
import CornerImage from "@/components/ui/CornerImage";
import type { Invitation } from "@/types/invitation";

/** Gold-and-crimson lotus divider with a fading line on each side. */
function Divider({
  className = "",
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  // Unique ids, because the section draws this three times
  const uid = useId().replace(/:/g, "");
  const leftEnd = large ? 150 : 165;
  const rightStart = large ? 250 : 235;

  return (
    <svg
      viewBox="0 0 400 40"
      aria-hidden
      className={`mx-auto block h-auto text-crimson ${className}`}
      fill="none"
    >
      <defs>
        {/* userSpaceOnUse, because a flat horizontal line has no height for a normal gradient */}
        <linearGradient
          id={`${uid}-l`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={leftEnd}
          y2="0"
        >
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient
          id={`${uid}-r`}
          gradientUnits="userSpaceOnUse"
          x1={rightStart}
          y1="0"
          x2="400"
          y2="0"
        >
          <stop offset="0" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line
        x1="0"
        y1="26"
        x2={leftEnd}
        y2="26"
        stroke={`url(#${uid}-l)`}
        strokeWidth="1.2"
      />
      <line
        x1={rightStart}
        y1="26"
        x2="400"
        y2="26"
        stroke={`url(#${uid}-r)`}
        strokeWidth="1.2"
      />
      <circle cx={large ? 160 : 172} cy="26" r="2.6" className="fill-gilt" />
      <circle cx={large ? 240 : 228} cy="26" r="2.6" className="fill-gilt" />

      {/* Lotus */}
      <path
        d="M200 8C210 16 210 28 200 38C190 28 190 16 200 8Z"
        className="fill-crimson"
      />
      <path
        d="M200 14C205 20 205 28 200 35C195 28 195 20 200 14Z"
        className="fill-gilt"
        opacity="0.9"
      />
      <path
        d="M200 38C190 36 182 28 184 18C193 21 199 29 200 38Z"
        className="fill-gilt"
        transform="rotate(-18 200 38)"
      />
      <path
        d="M200 38C210 36 218 28 216 18C207 21 201 29 200 38Z"
        className="fill-gilt"
        transform="rotate(18 200 38)"
      />
    </svg>
  );
}

export default function Blessing({ invitation }: { invitation: Invitation }) {
  const b = invitation.blessing;
  if (!b) return null;

  const corners = b.corners ?? {};

  return (
    <section
      id="blessing"
      aria-label={b.meaning}
      className="relative isolate min-h-auto overflow-hidden bg-[#fdf0dc] bg-[radial-gradient(ellipse_at_50%_40%,#fff6e4_0%,#fbe9cf_55%,#f8dcc0_100%)]"
    >
      {/* Watercolour washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 -z-10 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 -z-10 h-96 w-96 rounded-full bg-rose-400/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-0 -z-10 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl"
      />

      {/* Big left illustration: temple, flowers, butterflies */}
      <CornerImage
        src={b.art}
        y={20}
        className="bottom-0 left-0 z-0 w-[88%] sm:w-[70%] lg:w-[50%] lg:max-w-180"
        sizes="(min-width: 1024px) 42vw, 88vw"
      />

      {/* Corner art */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className="left-0 top-0 z-1 w-[30%] lg:w-[12%] lg:max-w-105"
        sizes="(min-width: 1024px) 24vw, 44vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className="right-0 top-0 z-1 w-[26%] lg:w-[12%] lg:max-w-65"
        sizes="(min-width: 1024px) 14vw, 26vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className="bottom-0 right-0 z-1 w-[34%] lg:w-[13%] lg:max-w-[320px]"
        sizes="(min-width: 1024px) 18vw, 34vw"
      />

      {b.petals !== false && <BlessingPetals />}

      {/* Content. On desktop it keeps clear of the left illustration. */}
      <div className="relative z-10 mx-auto flex min-h-20 max-w-6xl flex-col items-center justify-center px-6 pb-[45vw] pt-28 text-center sm:pb-[55vw] lg:pb-10 lg:pl-[12%] lg:pr-14 lg:pt-10">
        <Reveal y={18} className="w-full">
          <Divider className="w-[88%] max-w-160" large />
        </Reveal>

        <Reveal y={18} delay={0.25} className="mt-8">
          <div
            lang="sa"
            className="font-sloka flex flex-col items-center gap-2 text-crimson sm:gap-3"
          >
            {b.sloka.map((line) => (
              <p
                key={line}
                className="text-balance text-[clamp(1.05rem,2.1vw,2.9rem)] leading-[1.45]"
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal y={18} delay={0.5} className="mt-7 w-full">
          <Divider className="w-[72%] max-w-130" />
        </Reveal>

        <Reveal y={18} delay={0.75} className="mt-7">
          <p className="max-w-[26ch] text-balance font-serif text-[clamp(1rem,1.2vw,1.85rem)] leading-snug text-[#5a3a2a] sm:max-w-[34ch]">
            {b.meaning}
          </p>
        </Reveal>

        <Reveal y={18} delay={1} className="mt-7 w-full">
          <Divider className="w-[62%] max-w-115" />
        </Reveal>
      </div>
    </section>
  );
}
