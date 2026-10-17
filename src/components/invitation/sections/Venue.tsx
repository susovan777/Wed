import Image from "next/image";
import { MapPin } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Invitation } from "@/types/invitation";

const CORNER = "w-[28vw] max-w-[110px] lg:w-[8%] lg:max-w-[150px]";

/** Solid map pin with a hole, in the address row. */
function Pin() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="mt-1 size-6 shrink-0 text-[#8f2d1a] lg:size-7"
    >
      <path
        d="M12 2C8 2 5 5 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-4-3-7-7-7z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.6" fill="#f6e9cf" />
    </svg>
  );
}

export default function Venue({ invitation }: { invitation: Invitation }) {
  const v = invitation.venue;
  if (!v) return null;

  const corners = v.corners ?? {};

  return (
    <section
      id="venue"
      aria-labelledby="venue-title"
      className="relative isolate overflow-hidden"
    >
      {v.background && (
        <Image
          src={v.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}

      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-0 top-0 z-[1] ${CORNER}`}
        sizes="(min-width: 1024px) 8vw, 16vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-0 top-0 z-[1] ${CORNER}`}
        sizes="(min-width: 1024px) 8vw, 16vw"
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 -left-5 z-[1] ${CORNER}`}
        sizes="(min-width: 1024px) 8vw, 16vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 -right-5 z-[1] ${CORNER}`}
        sizes="(min-width: 1024px) 8vw, 16vw"
      />

      {/* Phone: text, then the photo centered below it. Desktop: text left, photo right. */}
      <div className="relative z-[2] mx-auto grid max-w-310 items-center gap-8 px-5 py-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-10 lg:px-50 lg:py-14">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            id="venue-title"
            title={v.title ?? "The Venue"}
            lotus={v.lotus}
          />

          <Reveal y={20} delay={0.1} className="mt-6 lg:mt-8">
            <h3 className="font-serif text-[clamp(1.5rem,5vw,2rem)] font-semibold leading-tight text-crimson">
              {v.name}
            </h3>
          </Reveal>

          <Reveal y={20} delay={0.2} className="mt-4 lg:mt-5">
            <div className="flex items-start gap-3 text-left">
              <Pin />
              <address className="whitespace-pre-line font-serif text-[1.05rem] font-medium not-italic leading-snug text-[#4a1f1f] lg:text-[1.15rem]">
                {v.address}
              </address>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.3} className="mt-6 lg:mt-7">
            <a
              href={v.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#e9c985]/70 bg-[linear-gradient(180deg,#b3121f,#7d0714)] px-8 py-2.5 font-serif text-[1.15rem] font-medium italic text-white shadow-[0_6px_14px_rgba(125,7,20,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(125,7,20,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c985] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {v.buttonLabel ?? "View on Map"}
              <MapPin className="size-4" strokeWidth={1.8} aria-hidden />
            </a>
          </Reveal>
        </div>

        {v.image && (
          <Reveal
            y={30}
            delay={0.2}
            className="mx-auto w-full max-w-75 "
          >
            <Image
              src={v.image}
              alt={v.imageAlt ?? v.name}
              width={1400}
              height={760}
              sizes="(min-width: 1024px) 60vw, 92vw"
              className="h-auto w-full select-none drop-shadow-[0_10px_18px_rgba(70,40,20,0.3)]"
              draggable={false}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
