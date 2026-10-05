import Image from "next/image";
import { Heart } from "lucide-react";
import StoryIcon from "./StoryIcon";
import type { StoryStep } from "@/types/invitation";

/**
 * Mobile: two halves (photo and text), swapping sides when `flip` is true.
 * Desktop (lg): photo on the left, text on the right, regardless of `flip`.
 */
export default function StoryChapter({
  step,
  flip,
}: {
  step: StoryStep;
  flip: boolean;
}) {
  return (
    <article className="relative grid grid-cols-2 items-center gap-x-8 lg:flex lg:items-start lg:gap-7">
      {/* Round photo */}
      <div
        className={`flex lg:order-1 lg:shrink-0 lg:justify-start ${
          flip ? "order-2 justify-end" : "order-1 justify-start"
        }`}
      >
        <div className="relative aspect-square w-full max-w-37.5 lg:w-47.5 lg:max-w-none">
          <div className="relative size-full overflow-hidden rounded-full bg-sage/40 shadow-[0_10px_24px_rgba(70,80,30,0.18)]">
            {step.image && (
              <Image
                src={step.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 190px, 40vw"
                className="select-none object-cover"
                draggable={false}
              />
            )}
          </div>
          <Heart
            aria-hidden
            className="absolute -bottom-3 right-6 hidden size-3.5 fill-current text-leaf lg:block"
          />
        </div>
      </div>

      {/* Text */}
      <div className={`lg:order-2 lg:pt-3 ${flip ? "order-1" : "order-2"}`}>
        <StoryIcon name={step.icon} className="size-4.5 text-forest/80" />
        <h3 className="mt-1 font-script text-[2rem] leading-tight text-forest lg:text-[2.3rem]">
          {step.title}
        </h3>
        <p className="mt-1 font-sans text-[0.8rem] leading-relaxed text-[#5a5a48] lg:text-[0.95rem]">
          {step.text}
        </p>
      </div>

      {/* Heart on the center line (mobile only) */}
      <Heart
        aria-hidden
        className="absolute -bottom-6 left-1/2 size-3.5 -translate-x-1/2 fill-current text-leaf lg:hidden"
      />
    </article>
  );
}
