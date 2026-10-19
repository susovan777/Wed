import type { ComponentType } from "react";
import type { Invitation, SectionKey } from "@/types/invitation";
import Hero from "./sections/Hero";
import Countdown from "./sections/Countdown";
import Celebrations from "./sections/Celebrations";
import Story from "./sections/Story";
import BrideGroom from "./sections/BrideGroom";
import Gallery from "./sections/Gallery";
import Venue from "./sections/Venue";
import SendGift from "./sections/SendGift";
import Rsvp from "./sections/Rsvp";
import Footer from "./sections/Footer";

type SectionProps = { invitation: Invitation };

// Add each new section here as it gets built.
const registry: Partial<Record<SectionKey, ComponentType<SectionProps>>> = {
  hero: Hero,
  countdown: Countdown,
  brideGroom: BrideGroom,
  celebrations: Celebrations,
  story: Story,
  gallery: Gallery,
  venue: Venue,
  gift: SendGift,
  rsvp: Rsvp,
  footer: Footer,
};

const defaultOrder: SectionKey[] = [
  "hero",
  "countdown",
  "brideGroom",
  "details",
  "celebrations",
  "story",
  "gallery",
  "venue",
  "gift",
  "rsvp",
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
