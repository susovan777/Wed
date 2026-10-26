import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import StoryIcon from "@/components/ui/StoryIcon";
import type { Invitation, StoryStep } from "@/types/invitation";
import SectionHeading from "@/components/ui/SectionHeading";
import ScatteredFlowers, {
  type FlowerSpec,
} from "@/components/ui/ScatteredFlowers";

const CORNER = "w-[30%] max-w-[170px] lg:w-[15%] lg:max-w-[260px]";

// Desktop photo positions, as a share of the section. Change these if a photo touches the text.
const PHOTO_LEFT = "left-[3.5%] top-[24%] w-[28%]";
const PHOTO_RIGHT = "right-[2.5%] top-[24%] w-[26.5%]";

// Fades the top edge of the river scene into the page
const FADE =
  "[mask-image:linear-gradient(to_bottom,transparent,black_22%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_22%)]";

// Small flowers: [left %, top %, size px, rotation deg, blur px, opacity]
// Big, soft ones (blur above 0) look out of focus, like flowers close to the camera.
const FLOWERS: FlowerSpec[] = [
  [30, 17, 16, 25, 0, 0.95, "blue"],
  [72, 28, 14, -15, 0, 0.9, "yellow"],
  [3, 43, 15, 60, 0, 0.9, "green"],
  [98, 42, 13, 20, 0, 0.85, "yellow"],
  [37, 77, 16, 35, 0, 0.95, "blue"],
  [85, 58, 14, 50, 0, 0.9, "green"],
  [33, 31, 30, -30, 3, 0.6, "green"],
  [71, 18, 34, 40, 4, 0.55, "blue"],
  [8, 65, 36, -40, 4, 0.5, "yellow"],
  [61, 76, 28, -20, 3, 0.6, "yellow"],
  [94, 61, 32, 10, 3.5, 0.55, "green"],
];

// function Flower({
//   className = "",
//   style,
// }: {
//   className?: string;
//   style?: CSSProperties;
// }) {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
//       {[0, 72, 144, 216, 288].map((angle) => (
//         <ellipse
//           key={angle}
//           cx="12"
//           cy="6.4"
//           rx="3.9"
//           ry="5.3"
//           fill="url(#story-flower-grad)"
//           stroke="#e8a317"
//           strokeOpacity="0.35"
//           strokeWidth="0.4"
//           transform={`rotate(${angle} 12 12)`}
//         />
//       ))}
//       <circle cx="12" cy="12" r="2.3" fill="#e98a0e" />
//       <circle cx="11.3" cy="11.3" r="0.8" fill="#ffd98a" />
//     </svg>
//   );
// }

function Blossom({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="12"
          cy="6.5"
          rx="3.6"
          ry="5"
          fill="#f291ae"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.4" fill="#e0527f" />
    </svg>
  );
}

function StepItem({ step, last }: { step: StoryStep; last: boolean }) {
  return (
    // Phone: icon on the left, text on the right. Desktop: icon above, text centered.
    <div
      className={`relative grid grid-cols-[var(--d)_1fr] items-start gap-x-4 lg:flex lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center ${
        last ? "" : "pb-10"
      }`}
    >
      <div className="grid size-(--d) shrink-0 place-items-center rounded-full border border-[#e2c27a] bg-[radial-gradient(circle,#fff8e2,#fbe8b6)] text-crimson shadow-[0_0_0_4px_rgba(240,217,160,0.35)]">
        <StoryIcon name={step.icon} className="size-[46%]" />
      </div>

      <div className="lg:mt-3">
        <h3 className="font-serif text-[1.05rem] font-semibold leading-tight text-crimson lg:text-[clamp(1.05rem,1.75vw,1.45rem)]">
          {step.title}
        </h3>
        <p className="mt-1 whitespace-pre-line text-balance font-serif text-[0.8rem] font-medium leading-snug text-[#4a2a22] lg:mx-auto lg:max-w-48 lg:text-[clamp(0.85rem,1.3vw,1.05rem)]">
          {step.text}
        </p>
      </div>

      {!last && (
        <>
          {/* Phone: blossom between rows, under the icon */}
          <Blossom className="absolute bottom-[0.8rem] left-[calc(var(--d)/2)] size-3.5 -translate-x-1/2 lg:hidden" />

          {/* Desktop: dotted line with a blossom, from this icon to the next */}
          <span
            aria-hidden
            className="absolute left-[calc(50%+var(--d)/2+0.5rem)] top-[calc(var(--d)/2)] hidden w-[calc(100%-var(--d)-1rem)] -translate-y-1/2 items-center gap-2 lg:flex"
          >
            <span className="h-0 flex-1 border-t-2 border-dotted border-[#d9a35a]" />
            <Blossom className="size-4 shrink-0" />
            <span className="h-0 flex-1 border-t-2 border-dotted border-[#d9a35a]" />
          </span>
        </>
      )}
    </div>
  );
}

export default function Story({ invitation }: { invitation: Invitation }) {
  const s = invitation.story;
  if (!s) return null;

  const corners = s.corners ?? {};
  const [photoA, photoB] = s.photos ?? [];
  const photoClass = "h-auto w-full select-none";

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative isolate overflow-hidden"
      // bg-[linear-gradient(180deg,#fdf1cd,#f9e3ae)]
    >
      {s.background && (
        <Image
          src={s.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}
      {/* Gold frame (set frame: false in the content to turn it off) */}
      {s.frame !== false && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-1.5 z-4 rounded-[1.75rem] border-[1.5px] border-[#d6a233] lg:inset-2 lg:rounded-[2.5rem]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[0.8rem] z-4 rounded-[1.4rem] border border-[#ecc977]/70 lg:inset-[1.1rem] lg:rounded-[2.1rem]"
          />
        </>
      )}
      <ScatteredFlowers flowers={FLOWERS} />

      {/* Corner art: flower garlands on top, frame corners below */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-0 top-0 z-5 ${CORNER}`}
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-0 top-0 z-5 ${CORNER}`}
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 left-0 z-5 ${CORNER}`}
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 right-0 z-5 ${CORNER}`}
      />
      {/* Desktop photos, either side of the text */}
      {photoA && (
        <Reveal
          y={30}
          delay={0.2}
          className={`absolute z-2 hidden lg:block ${PHOTO_LEFT}`}
        >
          <Image
            src={photoA.src}
            alt="The couple"
            width={800}
            height={760}
            sizes="28vw"
            className={photoClass}
            style={{ transform: `rotate(${photoA.tilt ?? 0}deg)` }}
            draggable={false}
          />
        </Reveal>
      )}
      {photoB && (
        <Reveal
          y={30}
          delay={0.35}
          className={`absolute z-2 hidden lg:block ${PHOTO_RIGHT}`}
        >
          <Image
            src={photoB.src}
            alt="The couple at sunset"
            width={800}
            height={760}
            sizes="27vw"
            className={photoClass}
            style={{ transform: `rotate(${photoB.tilt ?? 0}deg)` }}
            draggable={false}
          />
        </Reveal>
      )}
      <div className="relative z-3 px-6 pb-8 pt-10 lg:px-0 lg:pb-12 lg:pt-14">
        {/* Ornament, title, divider, subtitle, paragraph */}
        <Reveal className="mx-auto flex max-w-[24rem] flex-col items-center text-center lg:max-w-[min(42vw,40rem)]">
          {s.ornament && (
            <Image
              src={s.ornament}
              alt=""
              width={500}
              height={200}
              className="h-auto w-[min(46vw,200px)] select-none lg:w-[min(22vw,300px)]"
              draggable={false}
            />
          )}
          <SectionHeading id="story-title" title={s.title ?? "Our Story"} />
          {s.subtitle && (
            <p className="mt-3 font-serif text-base font-medium italic text-crimson lg:text-[clamp(1.1rem,2vw,1.7rem)]">
              {s.subtitle}
            </p>
          )}
          {s.intro && (
            <p className="mt-4 whitespace-pre-line font-serif text-[0.95rem] font-medium leading-relaxed text-[#4a2a22] lg:mt-5 lg:text-[clamp(0.95rem,1.45vw,1.15rem)]">
              {s.intro}
            </p>
          )}
        </Reveal>

        {/* Phone photo, below the text */}
        {photoA && (
          <Reveal y={30} className="mx-auto mt-7 w-[82%] max-w-90 lg:hidden">
            <Image
              src={photoA.src}
              alt="The couple"
              width={800}
              height={760}
              sizes="80vw"
              className={photoClass}
              style={{ transform: `rotate(${photoA.tilt ?? 0}deg)` }}
              draggable={false}
            />
          </Reveal>
        )}

        {/* Timeline */}
        <div
          role="list"
          className="mx-auto mt-8 grid w-full max-w-88 [--d:3.5rem] lg:mt-[7vw] lg:max-w-[min(62%,980px)] lg:grid-cols-4 lg:[--d:clamp(3.6rem,6.2vw,5rem)]"
        >
          {s.steps.map((step, i) => (
            <Reveal key={step.title} role="listitem" y={30} delay={i * 0.12}>
              <StepItem step={step} last={i === s.steps.length - 1} />
            </Reveal>
          ))}
        </div>
      </div>
      {/* River scene at the bottom, fading into the page above it */}
      {(s.bottom || s.bottomMobile) && (
        <div aria-hidden className="relative z-1 -mt-8 lg:mt-[-5vw]">
          {s.bottomMobile && (
            <Image
              src={s.bottomMobile}
              alt=""
              width={800}
              height={520}
              sizes="100vw"
              quality={90}
              className={`${FADE} block h-auto w-full select-none lg:hidden`}
              draggable={false}
            />
          )}
          {s.bottom && (
            <Image
              src={s.bottom}
              alt=""
              width={1600}
              height={420}
              sizes="100vw"
              quality={90}
              className={`${FADE} h-auto w-full select-none ${
                s.bottomMobile ? "hidden lg:block" : "block"
              }`}
              draggable={false}
            />
          )}
        </div>
      )}
    </section>
  );
}
