import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import CountdownCards from "@/components/ui/CountdownCards";
import LotusDivider from "@/components/ui/LotusDivider";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import type { Invitation } from "@/types/invitation";

const DEFAULT_LABELS = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
};

const CORNER_SIZE = "w-[26vw] max-w-[190px] lg:w-[14%] lg:max-w-[240px]";

export default function Countdown({ invitation }: { invitation: Invitation }) {
  const c = invitation.countdown ?? {};
  const corners = c.corners ?? {};
  const title = c.title ?? "Countdown";
  const subtitle = c.subtitle ?? "Counting down to our special day";

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="relative isolate overflow-hidden bg-paper"
    >

      {/* Corner line art */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-0 top-0 z-1 ${CORNER_SIZE}`}
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-0 top-0 z-1 ${CORNER_SIZE}`}
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 left-0 z-1 ${CORNER_SIZE}`}
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 right-0 z-1 ${CORNER_SIZE}`}
      />

      <div className="relative z-2 mx-auto max-w-295 px-4 pb-8 pt-10 lg:px-8 lg:pb-10 lg:pt-12">
        {/* Heading, divider, subtitle */}
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 lg:gap-6">
            <h2
              id="countdown-title"
              className="font-serif text-[clamp(2.1rem,9vw,3.1rem)] font-semibold leading-none text-crimson"
            >
              {title}
            </h2>
          </div>

          <OrnamentDivider className="mt-3 lg:mt-4" />

          <p className="mt-3 font-serif text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#6b5b4e] lg:text-sm">
            {subtitle}
          </p>
        </Reveal>

        {/* Cards */}
        <div className="mt-6 lg:mt-8">
          <CountdownCards
            target={invitation.wedding.date}
            labels={c.labels ?? DEFAULT_LABELS}
          />
        </div>
      </div>

      {/* Full-width divider with the lotus at the center, closing the section */}
      <Reveal y={20} className="relative z-2">
        <LotusDivider src={c.lotus} />
      </Reveal>
    </section>
  );
}
