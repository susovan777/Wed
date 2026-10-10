import type { ComponentType } from "react";
import type { Invitation, SectionKey } from "@/types/invitation";
import Hero from "./sections/Hero";
import Countdown from "./sections/Countdown";
import Celebrations from "./sections/Celebrations";
import Story from "./sections/Story";
import BrideGroom from "./sections/BrideGroom";

type SectionProps = { invitation: Invitation };

// Add each new section here as it gets built.
const registry: Partial<Record<SectionKey, ComponentType<SectionProps>>> = {
  hero: Hero,
  countdown: Countdown,
  brideGroom: BrideGroom,
  celebrations: Celebrations,
  story: Story,
};

const defaultOrder: SectionKey[] = [
  "hero",
  "countdown",
  "brideGroom",
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
