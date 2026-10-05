import Image from "next/image";
import { Heart } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import StoryChapter from "@/components/ui/StoryChapter";
import type { Invitation } from "@/types/invitation";

const CORNER_SIZE = "w-[26vw] max-w-[170px] lg:w-[12%] lg:max-w-[210px]";

// Small decorative petals: [left %, top %, size px, rotation deg]
const PETALS: [number, number, number, number][] = [
  [46, 3, 12, 30],
  [3, 23, 10, -20],
  [2, 54, 10, 40],
  [60, 12, 10, 15],
  [88, 30, 9, 10],
  [30, 64, 9, -40],
  [96, 66, 9, -30],
  [97, 88, 10, 20],
  [8, 88, 9, 60],
  [78, 97, 10, 50],
];

// Dotted paths between the chapters (desktop only), in a 100 x 100 box.
const ARCS = [
  "M 26 2 C 40 -3, 52 8, 54 26",
  "M 62 46 C 56 60, 30 46, 22 54",
  "M 30 76 C 42 90, 52 84, 52 74",
];

export default function Story({ invitation }: { invitation: Invitation }) {
  const story = invitation.story;
  if (!story) return null;

  const corners = story.corners ?? {};

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative isolate overflow-hidden bg-ivory"
    >
      {story.background && (
        <Image
          src={story.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}

      {PETALS.map(([left, top, size, rotate], i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-0 rounded-[0_100%_0_100%] bg-[#f2cf58]/80"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}

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

      <div className="relative z-2 mx-auto max-w-295 px-5 py-14 lg:px-10 lg:py-16">
        {/* Intro: text on the left, couple illustration on the right */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal className="text-center lg:text-left">
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#4d4d3f] lg:text-xs">
              {story.eyebrow ?? "Our Story"}
            </p>
            <h2
              id="story-title"
              className="mt-3 whitespace-pre-line font-script text-[clamp(2.6rem,10vw,3.4rem)] leading-[1.15] text-forest lg:text-[clamp(2.8rem,4.6vw,4.2rem)]"
            >
              {story.title}
            </h2>
            <Heart
              aria-hidden
              className="mx-auto mt-3 size-4 fill-current text-leaf lg:mx-0"
            />
            {story.intro && (
              <p className="mx-auto mt-4 max-w-120 font-sans text-sm leading-relaxed text-[#5a5a48] lg:mx-0 lg:text-base">
                {story.intro}
              </p>
            )}
          </Reveal>

          {story.image && (
            <Reveal
              y={40}
              delay={0.15}
              className="relative mx-auto w-full max-w-115 lg:ml-auto lg:mr-0"
            >
              {/* Faint arch and base line behind the illustration */}
              <div
                aria-hidden
                className="absolute inset-x-[10%] top-[-8%] bottom-[8%] rounded-t-full border border-b-0 border-[#d6dcbc]"
              />
              <div
                aria-hidden
                className="absolute inset-x-[-8%] bottom-[7%] h-px bg-[#e0e4cc]"
              />
              <Image
                src={story.image}
                alt=""
                width={800}
                height={640}
                sizes="(min-width: 1024px) 460px, 90vw"
                className="relative h-auto w-full select-none"
                draggable={false}
              />
            </Reveal>
          )}
        </div>

        {/* Chapters */}
        <div className="relative mt-14 lg:mt-16">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {ARCS.map((d) => (
              <path
                key={d}
                d={d}
                stroke="#c3cca6"
                strokeWidth="1.5"
                strokeDasharray="2 6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Dotted center line (mobile only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 -translate-x-1/2 border-l border-dashed border-[#bcc79c] lg:hidden"
          />

          <div className="relative grid gap-y-12 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
            {story.steps.map((step, i) => (
              <Reveal key={step.title} y={30} delay={(i % 2) * 0.12}>
                <StoryChapter step={step} flip={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Closing ribbon */}
        {story.closing && (
          <Reveal y={24} className="mt-14 flex justify-center lg:mt-16">
            <div className="-rotate-1 bg-sage px-10 py-5 text-center [clip-path:polygon(0_0,100%_0,97%_50%,100%_100%,0_100%,3%_50%)] lg:px-16">
              <p className="font-script text-[1.35rem] text-forest lg:text-[1.9rem]">
                {story.closing}
              </p>
              <Heart
                aria-hidden
                className="mx-auto mt-1 size-3.5 fill-current text-forest/80"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
