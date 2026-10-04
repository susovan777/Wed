import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import { formatWeddingDate } from "@/lib/date";
import type { Invitation } from "@/types/invitation";
import BlurText from "@/components/motion/BlurText";

const NAME_SIZE =
  "text-[clamp(3.25rem,15vw,5rem)] lg:text-[clamp(3.5rem,6.2vw,6.25rem)]";
const NAME_SHADOW = "[text-shadow:0_2px_8px_rgba(120,30,50,0.18)]";

function Corner({
  src,
  y,
  className,
}: {
  src?: string;
  y: number;
  className: string;
}) {
  if (!src) return null;
  return (
    <Reveal
      trigger="open"
      y={y}
      delay={0.6}
      duration={1.2}
      className={`pointer-events-none absolute ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={700}
        height={800}
        sizes="(min-width: 1024px) 24vw, 34vw"
        className="h-auto w-full select-none"
        draggable={false}
      />
    </Reveal>
  );
}

export default function Hero({ invitation }: { invitation: Invitation }) {
  const { hero, couple, wedding } = invitation;
  const { bride, groom } = couple;
  const corners = hero.corners ?? {};

  const backgroundClass = "-z-20 select-none object-cover object-center";

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-cream"
    >
      {/* Background (optional separate mobile version) */}
      {hero.backgroundMobile && (
        <Image
          src={hero.backgroundMobile}
          alt=""
          fill
          sizes="100vw"
          className={`${backgroundClass} lg:hidden`}
        />
      )}
      <Image
        src={hero.background}
        alt=""
        fill
        sizes="100vw"
        className={`${backgroundClass} ${hero.backgroundMobile ? "hidden lg:block" : ""}`}
      />
      <div
        className={`absolute inset-0 -z-10 lg:bg-linear-to-t from-white via-white/40 to-transparent ${
          hero.backgroundMobile ? "hidden lg:block" : ""
        }`}
        aria-hidden="true"
      />
      {/* Corner decorations */}
      <Corner
        src={corners.topLeft}
        y={-30}
        className="left-0 top-0 z-1 w-[34%] max-w-90 lg:w-[22%]"
      />
      <Corner
        src={corners.topRight}
        y={-30}
        className="right-0 top-0 z-1 w-[34%] max-w-90 lg:w-[22%]"
      />
      <Corner
        src={corners.bottomLeft}
        y={30}
        className="bottom-0 left-0 z-20 w-[22%] max-w-90 lg:block"
      />
      <Corner
        src={corners.bottomRight}
        y={30}
        className="bottom-0 right-0 z-20 w-[20%] max-w-85 lg:block"
      />

      {/* Ganesha mark */}
      <header className="relative z-10 flex flex-col items-center pt-4 text-center lg:pt-6">
        <Reveal
          trigger="open"
          y={-16}
          delay={0.45}
          className="flex flex-col items-center"
        >
          <Image
            src={hero.ganesha}
            alt="Ganesha"
            width={240}
            height={300}
            className="h-auto w-17 lg:w-28"
          />
          <p className="mt-1 font-serif text-[0.8rem] font-semibold tracking-wide text-maroon lg:mt-2 lg:text-base">
            {hero.invocation}
          </p>
        </Reveal>
      </header>

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col items-center px-6 pt-4 text-center lg:self-center lg:pb-12 lg:pl-12 lg:pr-4 lg:pt-0">
          <h1 className="sr-only">
            {bride.fullName ?? bride.name} and {groom.fullName ?? groom.name}
          </h1>

          <Reveal trigger="open" delay={0.6}>
            <OrnamentDivider />
          </Reveal>

          {/* <Reveal
            trigger="open"
            y={20}
            delay={0.75}
            aria-hidden
            className={`mt-3 font-script leading-[1.1] text-primary lg:mt-8 ${NAME_SIZE} ${NAME_SHADOW}`}
          >
            <span className="lg:hidden">{bride.name}</span>
            <span className="hidden lg:inline">
              {bride.fullName ?? bride.name}
            </span>
          </Reveal> */}

          <div
            aria-hidden
            className={`mt-3 font-script leading-[1.1] text-primary lg:mt-8 ${NAME_SIZE} ${NAME_SHADOW}`}
          >
            <BlurText text={bride.name} delay={0.75} className="lg:hidden" />
            <BlurText
              text={bride.fullName ?? bride.name}
              delay={0.75}
              className="hidden lg:inline"
            />
          </div>

          <Reveal
            trigger="open"
            y={12}
            delay={0.9}
            aria-hidden
            className="-my-1 font-script text-3xl text-primary/70 lg:text-4xl"
          >
            &amp;
          </Reveal>

          {/* <Reveal
            trigger="open"
            y={20}
            delay={1}
            aria-hidden
            className={`font-script leading-[1.1] text-gold ${NAME_SIZE} ${NAME_SHADOW}`}
          >
            <span className="lg:hidden">{groom.name}</span>
            <span className="hidden lg:inline">
              {groom.fullName ?? groom.name}
            </span>
          </Reveal> */}

          <div
            aria-hidden
            className={`font-script leading-[1.1] text-gold ${NAME_SIZE} ${NAME_SHADOW}`}
          >
            <BlurText text={groom.name} delay={1.15} className="lg:hidden" />
            <BlurText
              text={groom.fullName ?? groom.name}
              delay={1.15}
              className="hidden lg:inline"
            />
          </div>

          <Reveal
            trigger="open"
            delay={1.15}
            className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ink lg:mt-10 lg:text-sm"
          >
            {hero.tagline}
          </Reveal>

          <Reveal trigger="open" delay={1.35} className="mt-6 lg:mt-8">
            <OrnamentDivider />
          </Reveal>

          <Reveal
            trigger="open"
            delay={1.45}
            className="mt-5 flex flex-col items-center gap-2 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink lg:mt-6 lg:flex-row lg:gap-4 lg:text-sm"
          >
            <span className="flex items-center gap-2">
              <CalendarDays
                className="size-4 shrink-0"
                strokeWidth={1.5}
                aria-hidden
              />
              {formatWeddingDate(wedding.date)}
            </span>
            <span aria-hidden className="hidden h-5 w-px bg-ink/30 lg:block" />
            <span className="flex items-center gap-2">
              <MapPin
                className="size-4 shrink-0"
                strokeWidth={1.5}
                aria-hidden
              />
              {wedding.city}
            </span>
          </Reveal>
        </div>

        {/* Couple illustration: bottom on mobile, bottom-right on desktop */}
        <div className="mt-auto flex justify-center pt-8 lg:justify-end lg:self-end lg:pr-8 lg:pt-0">
          <Reveal
            trigger="open"
            y={90}
            delay={0.8}
            duration={1.3}
            className="w-[82%] max-w-115 lg:w-auto lg:max-w-none"
          >
            <Image
              src={hero.couple}
              alt={`${bride.name} and ${groom.name}`}
              width={1000}
              height={1350}
              sizes="(min-width: 1024px) 40vw, 82vw"
              className="h-auto w-full select-none lg:h-[74dvh] lg:max-h-215 lg:w-auto mask-b-from-90%"
              draggable={false}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
