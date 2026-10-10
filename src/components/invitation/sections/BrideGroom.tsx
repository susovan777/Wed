import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CartoucheLabel from "@/components/ui/CartoucheLabel";
import CornerImage from "@/components/ui/CornerImage";
import FleurDivider from "@/components/ui/FleurDivider";
import type { Invitation } from "@/types/invitation";
import RepeatBorder from "@/components/ui/RepeatBorder";
import OrnamentDivider from "@/components/ui/OrnamentDivider";

const TOP_CORNER = "w-[30vw] max-w-[220px] lg:w-[22%] lg:max-w-[190px]";
const BOTTOM_CORNER = "w-[26vw] max-w-[200px] lg:w-[17%] lg:max-w-[280px]";
const COLUMN = "w-[38vw] max-w-[390px] lg:w-[26vw]";

// Heights of the repeating border strips
const TOP_BORDER = "h-8 lg:h-12";
const BOTTOM_BORDER = "h-10 lg:h-16";

function Person({
  photo,
  label,
  button,
  name,
  delay,
}: {
  photo: string;
  label: string;
  button?: string;
  name: string;
  delay: number;
}) {
  return (
    <Reveal
      y={30}
      delay={delay}
      className={`flex flex-col items-center ${COLUMN}`}
    >
      <Image
        src={photo}
        alt={`Portrait of ${name}`}
        width={800}
        height={800}
        sizes="(min-width: 1024px) 26vw, 38vw"
        className="h-auto w-full select-none"
        draggable={false}
      />
      <CartoucheLabel image={button} className="mt-4 w-full lg:mt-7">
        {label}
      </CartoucheLabel>
    </Reveal>
  );
}

export default function BrideGroom({ invitation }: { invitation: Invitation }) {
  const section = invitation.brideGroom;
  if (!section) return null;

  const { bride, groom } = invitation.couple;
  const corners = section.corners ?? {};
  const borders = section.borders ?? {};

  return (
    <section
      id="bride-groom"
      aria-labelledby="bride-groom-title"
      className="relative isolate overflow-hidden"
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
        sizes="(min-width: 1024px) 15vw, 26vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 right-0 z-2 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 15vw, 26vw"
      />

      <div className="relative z-3 mx-auto max-w-310 px-4 pb-50 pt-14 lg:px-8 lg:pb-32 lg:pt-20">
        {/* Heading */}
        <Reveal className="flex flex-col items-center text-center">
          {section.ornament && (
            <Image
              src={section.ornament}
              alt=""
              width={500}
              height={200}
              className="h-auto w-[min(45vw,300px)] select-none lg:w-52"
              draggable={false}
            />
          )}
          <h2
            id="bride-groom-title"
            className="font-serif text-[clamp(2.1rem,9vw,3.1rem)] font-semibold italic leading-none text-maroon "
          >
            {section.title ?? "Bride & Groom"}
          </h2>
          <OrnamentDivider className="mt-3 lg:mt-4" />
          {section.subtitle && (
            <p className="mt-4 whitespace-pre-line font-serif text-[0.95rem] font-medium leading-snug text-[#4a1f1f] lg:text-[1.15rem]">
              {section.subtitle}
            </p>
          )}
        </Reveal>

        {/* Two framed portraits with a vertical ornament between them */}
        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-x-3 lg:mt-5">
          <Person
            photo={section.bride.photo}
            label={section.bride.label ?? "Bride"}
            button={section.button}
            name={bride.fullName ?? bride.name}
            delay={0.1}
          />
          <FleurDivider vertical className="mb-12 self-stretch lg:mb-20" />
          <Person
            photo={section.groom.photo}
            label={section.groom.label ?? "Groom"}
            button={section.button}
            name={groom.fullName ?? groom.name}
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}
