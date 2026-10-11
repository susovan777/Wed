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

export type StoryIcon = "cap" | "heart" | "plane" | "rings";

export type StoryStep = {
  title: string;
  text: string;
  /** Round photo for this chapter. */
  image?: string;
  icon?: StoryIcon;
};

export type PersonDetails = {
  /** Heading in the modal. Defaults to the person's full name. */
  title?: string;
  /** Line under the heading. Defaults to the person's `parents`. */
  subtitle?: string;
  /** A short paragraph. Use \n\n for a new paragraph. */
  about?: string;
  /** Small label and value pairs, shown in two columns. */
  facts?: { label: string; value: string }[];
};

/** Sections the main page can render, in the order they appear. */
export type SectionKey =
  | "hero"
  | "countdown"
  | "details"
  | "celebrations"
  | "story"
  | "brideGroom"
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

  countdown?: {
    /** Defaults to "Countdown". */
    title?: string;
    /** Defaults to "Counting down to our special day". */
    subtitle?: string;
    /** Defaults to Days / Hours / Minutes / Seconds. */
    labels?: { days: string; hours: string; minutes: string; seconds: string };
    background?: string;
    divider?: string;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    lotus?: string;
    flourish?: string;
  };

  celebrations?: {
    /** Defaults to "The Wedding Events". */
    title?: string;
    subtitle?: string;
    /** Shown after the time when an event has no end time. Defaults to "Onwards". */
    onwardsLabel?: string;
    /** Small lotus under the heading. */
    lotus?: string;
    background?: string;
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

  story?: {
    /** Small label above the heading. Defaults to "Our Story". */
    eyebrow?: string;
    /** Use \n for line breaks. */
    title: string;
    intro?: string;
    /** Couple illustration beside the heading. */
    image?: string;
    /** Text on the closing ribbon. */
    closing?: string;
    background?: string;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    steps: StoryStep[];
  };

  brideGroom?: {
    /** Portrait frame image (2:3) used as the details card. */
    modalFrame?: string;
    /** Defaults to "Bride & Groom". */
    title?: string;
    /** Use \n for a line break. */
    subtitle?: string;
    /** Pink lotus with the gold flourish, shown above the title. */
    ornament?: string;
    /** Faint line-art parchment, optional. */
    background?: string;
    /** Transparent plate image for the Bride / Groom labels. */
    button?: string;
    /** Tile images repeated across the full width, not stretched. */
    borders?: { top?: string; bottom?: string };
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    /** `photo` is the round portrait with its frame already included. */
    bride: { photo: string; label?: string; details?: PersonDetails };
    groom: { photo: string; label?: string; details?: PersonDetails };
    /** Butterfly that lands on the bride's photo. On by default; set false to turn it off. */
    butterfly?: boolean;
  };

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
