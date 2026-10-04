import type { OpeningAssets } from "@/components/opening/OpeningGate";

export type Person = {
  /** Name shown on the page, e.g. "Ananya". */
  name: string;
  banglaName?: string;
  /** Optional full name, used in details and meta text. */
  fullName?: string;
  /** e.g. "Mr. Subir Sen & Mrs. Mala Sen". */
  parents?: string;
};

export type Venue = {
  name: string;
  address: string;
  /** Google Maps link used by the Get Directions button. */
  mapUrl: string;
};

export type InvitationEvent = {
  /** URL-safe id, also used for the calendar download, e.g. "gaye-holud". */
  id: string;
  title: string;
  /** ISO 8601 with offset, e.g. "2027-01-23T11:00:00+05:30". */
  startsAt: string;
  endsAt?: string;
  venue: Venue;
  description?: string;
  dressCode?: string;
  /** Illustration shown on the event card. */
  image?: string;
};

export type StoryStep = {
  title: string;
  text: string;
  image?: string;
};

/** Sections the main page can render, in the order they appear. */
export type SectionKey =
  | "hero"
  | "countdown"
  | "details"
  | "celebrations"
  | "story"
  | "note"
  | "footer";

export type Invitation = {
  /** Matches the URL: /<slug>. */
  slug: string;

  /** CSS variable overrides applied to the page wrapper, e.g. { "--color-primary": "#8a0b10" }. */
  theme?: Record<`--${string}`, string>;

  opening: OpeningAssets;

  couple: {
    bride: Person;
    groom: Person;
    hashtag?: string;
  };

  wedding: {
    /** ISO 8601 with offset. Drives the countdown. */
    date: string;
    city: string;
  };

  hero: {
    /** Full-bleed background (desktop, and mobile unless backgroundMobile is set). */
    background: string;
    backgroundMobile?: string;
    /** Couple illustration: right side on desktop, bottom on mobile. */
    couple: string;
    /** Ganesha mark at the top. */
    ganesha: string;
    /** Line under the mark, e.g. "|| Shri Ganeshay Namah ||". */
    invocation: string;
    /** e.g. "Are getting married". */
    tagline: string;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
  };

  invite: {
    blessing?: string;
    message: string;
  };

  events: InvitationEvent[];
  story?: StoryStep[];
  note?: string;

  music?: {
    src: string;
    title?: string;
  };

  seo: {
    title: string;
    description: string;
  };

  /** Optional per-invitation order and visibility. Defaults to every section. */
  sections?: SectionKey[];
};
