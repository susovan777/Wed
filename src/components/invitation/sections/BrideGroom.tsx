import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import FleurDivider from "@/components/ui/FleurDivider";
import RepeatBorder from "@/components/ui/RepeatBorder";
import type { Invitation } from "@/types/invitation";
import PersonColumn from "@/components/ui/PersonColumn";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import SectionHeading from "@/components/ui/SectionHeading";

const TOP_CORNER = "w-[30vw] max-w-[180px] lg:w-[11%] lg:max-w-[260px]";
const BOTTOM_CORNER = "w-[26vw] max-w-[160px] lg:w-[11%] lg:max-w-[280px]";

// Photo width = the smaller of a share of the SECTION WIDTH (first number)
// and a share of the SECTION HEIGHT (second number). The height share is what
// keeps everything inside one screen: lower 33cqh to make the photos smaller.
const COLUMN = "w-[min(40cqw,33cqh)] lg:w-[min(26cqw,33cqh)] lg:max-w-[390px]";

// Heights of the repeating border strips
const TOP_BORDER = "h-8 lg:h-12";
const BOTTOM_BORDER = "h-10 lg:h-16";

export default function BrideGroom({ invitation }: { invitation: Invitation }) {
  const section = invitation.brideGroom;
  if (!section) return null;

  const { bride, groom } = invitation.couple;
  const corners = section.corners ?? {};
  const borders = section.borders ?? {};

  return (
    // h-dvh: exactly one screen tall. container-type:size lets the contents
    // size themselves from the section's own width (cqw) and height (cqh).
    // min-h-[540px] stops it from squashing on very short windows.
    <section
      id="bride-groom"
      aria-labelledby="bride-groom-title"
      className="relative isolate h-dvh min-h-200 overflow-hidden @container-size"
    >
      {/* Faint line-art parchment (optional) */}
      {section.background && (
        <Image
          src={section.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}

      {/* Patterned red borders: tiled across the full width, never scaled to fit */}
      {borders.top && (
        <RepeatBorder
          src={borders.top}
          position="top"
          className={`z-1 ${TOP_BORDER}`}
        />
      )}
      {borders.bottom && (
        <RepeatBorder
          src={borders.bottom}
          position="bottom"
          className={`z-1 ${BOTTOM_BORDER}`}
        />
      )}

      {/* Garlands (top) and banana leaves with kalash (bottom) */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-0 top-0 z-2 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 22vw, 30vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-0 top-0 z-2 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 22vw, 30vw"
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 left-0 z-2 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 17vw, 26vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 right-0 z-2 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 17vw, 26vw"
      />

      {/* justify-around spreads the heading and the portraits over the full height */}
      <div className="relative z-3 mx-auto flex h-full max-w-200 flex-col gap-5 justify-center md:justify-around px-4 pb-35 pt-10 lg:px-8 lg:pb-18 lg:pt-14">
        {/* Heading: every size is capped by both width and height */}
        <Reveal className="flex flex-col items-center text-center">
          {section.ornament && (
            <Image
              src={section.ornament}
              alt=""
              width={500}
              height={200}
              className="h-auto w-[min(70cqw,20cqh,340px)] mb-5 select-none"
              draggable={false}
            />
          )}
          <SectionHeading
            id="celebrations-title"
            title={section.title ?? "Bride & Groom"}
            subtitle={section.subtitle}
          />
        </Reveal>

        {/* Two framed portraits with a vertical ornament between them */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-x-3">
          <PersonColumn
            className={COLUMN}
            photo={section.bride.photo}
            label={section.bride.label ?? "Bride"}
            button={section.button}
            frame={section.modalFrame}
            name={bride.fullName ?? bride.name}
            parents={bride.parents}
            details={section.bride.details}
            butterfly={section.butterfly !== false}
            delay={0.1}
          />
          <FleurDivider vertical className="mb-12 self-stretch lg:mb-20" />
          <PersonColumn
            className={COLUMN}
            photo={section.groom.photo}
            label={section.groom.label ?? "Groom"}
            button={section.button}
            frame={section.modalFrame}
            name={groom.fullName ?? groom.name}
            parents={groom.parents}
            details={section.groom.details}
            // butterfly={section.butterfly !== false}
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}
