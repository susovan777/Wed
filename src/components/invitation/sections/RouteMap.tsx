import Image from "next/image";
import { MapPin, Route as RouteIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Invitation, RouteGroup } from "@/types/invitation";

const TOP_CORNER = "w-[30vw] max-w-[180px] lg:w-[13%] lg:max-w-[260px]";
const BOTTOM_CORNER = "w-[30vw] max-w-[170px] lg:w-[22%] lg:max-w-[260px]";

// Fades the top edge of the scene image into the page
const FADE =
  "[mask-image:linear-gradient(to_bottom,transparent,black_22%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_22%)]";

const DOTTED = "border-l-2 border-dotted border-crimson/55";

/** One route: a red header pill with a round badge, then a card with the steps. */
function RouteCard({ route }: { route: RouteGroup }) {
  const last = route.steps.length - 1;

  return (
    <div className="flex h-full flex-col">
      {/* Header: pill with the round badge overlapping its left end */}
      <div className="relative z-1 mx-auto w-[min(92%,22rem)] lg:w-[min(92%,26rem)]">
        <div className="rounded-full border-2 border-gilt bg-[linear-gradient(180deg,#a50f1d,#6e0a14)] py-2 pl-[4.4rem] pr-6 text-center text-white shadow-[0_6px_14px_rgba(110,10,20,0.3)] lg:py-3 lg:pl-[5.4rem]">
          <p className="font-serif text-[1.3rem] font-semibold leading-tight lg:text-[1.9rem]">
            {route.title}
          </p>
          {route.subtitle && (
            <p className="font-serif text-[0.78rem] text-[#f7e3b4] lg:text-[1rem]">
              {route.subtitle}
            </p>
          )}
        </div>
        <span className="absolute -left-3 top-1/2 grid size-[4.6rem] -translate-y-1/2 place-items-center rounded-full border-2 border-gilt bg-[radial-gradient(circle_at_50%_35%,#c1121f,#7d0714)] shadow-md lg:size-[5.6rem]">
          {route.icon ? (
            <Image
              src={route.icon}
              alt=""
              width={120}
              height={120}
              className="size-[62%] select-none object-contain"
              draggable={false}
            />
          ) : (
            <RouteIcon
              className="size-[46%] text-gilt"
              strokeWidth={1.6}
              aria-hidden
            />
          )}
        </span>
      </div>

      {/* Card with the steps */}
      <div className="-mt-5 flex-1 rounded-[1.6rem] border-[1.5px] border-gilt bg-[linear-gradient(180deg,rgba(255,251,238,0.9),rgba(252,241,216,0.9))] px-3 pb-4 pt-9 shadow-[0_4px_14px_rgba(120,70,20,0.12)] lg:px-5 lg:pb-6 lg:pt-12">
        <ol>
          {route.steps.map((step, i) => (
            // Picture | dot on the dotted line | text
            <li
              key={i}
              className="grid grid-cols-[5.2rem_1.25rem_1fr] items-stretch gap-x-2 lg:grid-cols-[8.5rem_1.5rem_1fr] lg:gap-x-3"
            >
              <div className="my-2 flex items-center justify-center lg:my-3">
                {step.image && (
                  <Image
                    src={step.image}
                    alt=""
                    width={300}
                    height={200}
                    sizes="(min-width: 1024px) 9rem, 5.2rem"
                    className="h-auto max-h-14 w-full select-none object-contain lg:max-h-20"
                    draggable={false}
                  />
                )}
              </div>

              {/* The dotted line is drawn in halves, so it joins up from one step to the next */}
              <div aria-hidden className="relative">
                {i > 0 && (
                  <span
                    className={`absolute left-1/2 top-0 h-1/2 -translate-x-1/2 ${DOTTED}`}
                  />
                )}
                {i < last && (
                  <span
                    className={`absolute bottom-0 left-1/2 h-1/2 -translate-x-1/2 ${DOTTED}`}
                  />
                )}
                <span className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-crimson bg-gilt lg:size-4" />
              </div>

              <div className="my-2 self-center lg:my-3">
                <p className="font-serif text-[0.95rem] font-semibold leading-snug text-[#3a2420] lg:text-[1.2rem]">
                  {step.text}
                </p>
                {step.mode && (
                  <p className="font-serif text-[0.85rem] font-medium text-crimson lg:text-[1.05rem]">
                    ({step.mode})
                  </p>
                )}
                {step.note && (
                  <span className="mt-1.5 inline-block rounded-full border border-gilt/80 bg-[#f7e3b4]/80 px-3 py-1 font-serif text-[0.78rem] font-medium text-crimson lg:text-[0.98rem]">
                    {step.note}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function RouteMap({ invitation }: { invitation: Invitation }) {
  const r = invitation.routeMap;
  if (!r) return null;

  const corners = r.corners ?? {};

  return (
    <section
      id="route-map"
      aria-labelledby="route-map-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#fff8e8_0%,#fbeccc_60%,#f6dfb8_100%)]"
    >
      {r.background && (
        <Image
          src={r.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}

      {/* Corner art. The bottom ones sit above the scene. */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-0 top-0 z-1 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 13vw, 30vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-0 top-0 z-1 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 13vw, 30vw"
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 -left-3 z-3 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 12vw, 30vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 -right-3 z-3 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 12vw, 30vw"
      />

      <div className="relative z-2 mx-auto max-w-310 px-4 pt-5 lg:px-8 lg:pt-5">
        {/* Map icon, title and subtitle */}
        <Reveal className="flex flex-col items-center text-center">
          {r.icon && (
            <Image
              src={r.icon}
              alt=""
              width={200}
              height={160}
              className="mb-2 h-auto w-16 select-none lg:w-24"
              draggable={false}
            />
          )}
          <SectionHeading
            id="route-map-title"
            title={r.title}
            subtitle={r.subtitle}
          />
        </Reveal>

        {/* Routes: stacked on phones, side by side on desktop */}
        <div className="mx-auto mt-8 grid max-w-md gap-8 lg:mt-10 lg:max-w-none lg:grid-cols-2 xl:gap-12">
          {r.routes.map((route, i) => (
            <Reveal
              key={route.title}
              y={30}
              delay={i * 0.15}
              className="h-full"
            >
              <RouteCard route={route} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Scene along the bottom, with the venue signboard drawn in code on top */}
      <div className="relative z-2 flex content-center">
        {r.scene ? (
          <Image
            src={r.scene}
            alt=""
            width={1600}
            height={560}
            sizes="100vw"
            quality={90}
            className={`${FADE} block h-auto w-full select-none`}
            draggable={false}
          />
        ) : (
          <div className="h-56 lg:h-72" />
        )}

      </div>
    </section>
  );
}
