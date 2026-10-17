import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import EventCard from "@/components/ui/EventCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatEventDate, formatEventTime } from "@/lib/eventDate";
import type { Invitation } from "@/types/invitation";

const CORNER_SIZE = "w-[35vw] max-w-[190px] lg:w-[14%] lg:max-w-[240px]";

export default function Celebrations({
  invitation,
}: {
  invitation: Invitation;
}) {
  const c = invitation.celebrations ?? {};
  const corners = c.corners ?? {};
  const onwards = c.onwardsLabel ?? "Onwards";
  const events = invitation.events;

  return (
    <section
      id="celebrations"
      aria-labelledby="celebrations-title"
      className="relative isolate overflow-hidden"
    >
      {c.background && (
        <Image
          src={c.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}

      {/* Corner art */}
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

      <div className="relative z-2 mx-auto max-w-310 px-4 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          id="celebrations-title"
          title={c.title ?? "Wedding Events"}
          subtitle={c.subtitle}
          lotus={c.lotus}
        />

        {/* 1 column on phones, 2 on tablets, up to 4 on large screens */}
        <div
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 xl:grid-cols-[repeat(var(--cols),minmax(0,1fr))] xl:gap-6"
          style={{ "--cols": Math.min(events.length, 4) } as CSSProperties}
        >
          {events.map((event, i) => (
            <Reveal
              key={event.id}
              y={30}
              delay={(i % 4) * 0.12}
              className="h-full"
            >
              <EventCard
                title={event.title}
                date={formatEventDate(event.startsAt)}
                time={
                  event.endsAt
                    ? `${formatEventTime(event.startsAt)} – ${formatEventTime(event.endsAt)}`
                    : `${formatEventTime(event.startsAt)} ${onwards}`
                }
                description={event.description}
                image={event.image}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
