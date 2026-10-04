import type { ComponentType } from "react";
import type { Invitation, SectionKey } from "@/types/invitation";
import Hero from "./sections/Hero";
import Countdown from "./sections/Countdown";

type SectionProps = { invitation: Invitation };

// Add each new section here as it gets built.
const registry: Partial<Record<SectionKey, ComponentType<SectionProps>>> = {
  hero: Hero,
  countdown: Countdown,
};

const defaultOrder: SectionKey[] = [
  "hero",
  "countdown",
  "details",
  "celebrations",
  "story",
  "note",
  "footer",
];

export default function InvitationSections({ invitation }: SectionProps) {
  const order = invitation.sections ?? defaultOrder;

  return (
    <>
      {order.map((key) => {
        const Section = registry[key];
        return Section ? <Section key={key} invitation={invitation} /> : null;
      })}
    </>
  );
}
