import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RsvpButton from "@/components/ui/RsvpButton";
import type { Invitation } from "@/types/invitation";

/** Small gold lotus for the divider, drawn in code. */
function GoldLotus() {
  return (
    <svg viewBox="0 0 40 28" aria-hidden className="h-6 w-auto shrink-0">
      <defs>
        <linearGradient id="rsvp-lotus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdeaa6" />
          <stop offset="1" stopColor="#d89a2a" />
        </linearGradient>
      </defs>
      <g
        fill="url(#rsvp-lotus)"
        stroke="#b4741a"
        strokeWidth="0.5"
        strokeLinejoin="round"
      >
        <path d="M20 22C13 23 5 19 1 12C8 12 16 15 20 22Z" />
        <path d="M20 22C27 23 35 19 39 12C32 12 24 15 20 22Z" />
        <path d="M20 22C15 22 10 17 9 8C14 10 19 14 20 22Z" />
        <path d="M20 22C25 22 30 17 31 8C26 10 21 14 20 22Z" />
        <path d="M20 2C16 8 16 16 20 22C24 16 24 8 20 2Z" />
      </g>
    </svg>
  );
}

export default function Rsvp({ invitation }: { invitation: Invitation }) {
  const r = invitation.rsvp;
  if (!r) return null;

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative isolate overflow-hidden bg-[#8e0e14] bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,24,40,0.5),transparent_70%),repeating-linear-gradient(45deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_14px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.025)_0_2px,transparent_2px_14px)]"
    >
      {r.background && (
        <Image
          src={r.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center opacity-60"
        />
      )}

      {/* Side illustrations: the drummers and banana leaves */}
      {r.art?.left && (
        <Reveal
          y={20}
          className="pointer-events-none absolute bottom-30 -left-5 z-1 h-[40vw] w-[34vw] lg:bottom-0 lg:h-full lg:w-[22%]"
        >
          <Image
            src={r.art.left}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, 34vw"
            className="select-none object-contain object-bottom-left"
            draggable={false}
          />
        </Reveal>
      )}
      {r.art?.right && (
        <Reveal
          y={20}
          delay={0.1}
          className="pointer-events-none absolute bottom-30 -right-4 z-1 h-[40vw] w-[34vw] lg:bottom-0 lg:h-full lg:w-[22%]"
        >
          <Image
            src={r.art.right}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, 34vw"
            className="select-none object-contain object-bottom-right"
            draggable={false}
          />
        </Reveal>
      )}

      <div className="relative z-2 mx-auto flex max-w-184 flex-col items-center px-15 pb-12  pt-12 text-center lg:pb-14 lg:pt-14">
        <Reveal className="flex flex-col items-center">
          <h2
            id="rsvp-title"
            className="font-serif font-medium uppercase tracking-[0.08em] text-[#fbe9c8] text-[clamp(1.6rem,5vw,2.2rem)]"
          >
            {r.title ?? "Kindly RSVP"}
          </h2>

          {/* Line, gold lotus, line */}
          <div
            aria-hidden
            className="mt-3 flex items-center justify-center gap-3"
          >
            <span className="h-px w-16 bg-[linear-gradient(to_right,transparent,#e3b85c)] lg:w-28" />
            {r.lotus ? (
              <Image
                src={r.lotus}
                alt=""
                width={120}
                height={80}
                className="h-6 w-auto select-none"
                draggable={false}
              />
            ) : (
              <GoldLotus />
            )}
            <span className="h-px w-16 bg-[linear-gradient(to_left,transparent,#e3b85c)] lg:w-28" />
          </div>

          {r.message && (
            <p className="mt-5 max-w-136 text-balance whitespace-pre-line font-serif text-[0.95rem] font-medium leading-relaxed text-[#fbe9c8]/95 lg:max-w-160 lg:text-[1.15rem]">
              {r.message}
            </p>
          )}
        </Reveal>

        <Reveal y={20} delay={0.15} className="mt-6 lg:mt-7">
          <RsvpButton
            label={r.buttonLabel ?? "Confirm Your Presence"}
            endpoint={r.endpoint}
            slug={invitation.slug}
            whatsapp={r.whatsapp}
            text={r.form}
          />
        </Reveal>
      </div>
    </section>
  );
}
