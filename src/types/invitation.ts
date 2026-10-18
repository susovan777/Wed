import type { OpeningAssets } from "@/components/opening/OpeningGate";

/** Sections the main page can render, in the order they appear. */
export type SectionKey =
  | "hero"
  | "countdown"
  | "details"
  | "celebrations"
  | "story"
  | "brideGroom"
  | "gallery"
  | "venue"
  | "gift"
  | "rsvp"
  | "note"
  | "footer";

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

/* OLD Story Types */
// export type StoryIcon = "cap" | "heart" | "plane" | "rings";
// export type StoryStep = {
//   title: string;
//   text: string;
//   /** Round photo for this chapter. */
//   image?: string;
//   icon?: StoryIcon;
// };

export type StoryIcon = "chat" | "heart" | "ring" | "hearts";

export type StoryStep = {
  title: string;
  text: string;
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

export type GalleryCaption = {
  /** tape: a label strip. brush: handwriting on a brush stroke. note: small typewriter text. */
  style: "tape" | "brush" | "note";
  text: string;
  /**
   * tape: "top" (default) or "bottom"
   * brush: "tl", "tr", "bl" (default) or "br" (the photo corner it overlaps)
   * note: "left" (default), "right", "top" or "bottom"
   */
  place?: "top" | "bottom" | "left" | "right" | "tl" | "tr" | "bl" | "br";
};

export type GalleryPhoto = {
  src: string;
  /** Describes the photo for screen readers. Optional. */
  alt?: string;
  caption?: GalleryCaption;
};

export type RsvpFormText = {
  /** Heading inside the form. */
  title?: string;
  intro?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  attendLabel?: string;
  yesLabel?: string;
  noLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  thanksYes?: { title: string; text: string };
  thanksNo?: { title: string; text: string };
};

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

  /* OLD Story */
  // story?: {
  //   /** Small label above the heading. Defaults to "Our Story". */
  //   eyebrow?: string;
  //   /** Use \n for line breaks. */
  //   title: string;
  //   intro?: string;
  //   /** Couple illustration beside the heading. */
  //   image?: string;
  //   /** Text on the closing ribbon. */
  //   closing?: string;
  //   background?: string;
  //   corners?: {
  //     topLeft?: string;
  //     topRight?: string;
  //     bottomLeft?: string;
  //     bottomRight?: string;
  //   };
  //   steps: StoryStep[];
  // };

  story?: {
    /** Defaults to "Our Story". */
    title?: string;
    subtitle?: string;
    /** The paragraph under the subtitle. */
    intro?: string;
    /** Lotus with the gold flourish, shown above the title. */
    ornament?: string;
    /** [0] is the left photo, also shown on phones. [1] is the right photo, desktop only. */
    photos?: { src: string; tilt?: number }[];
    background?: string;
    /** Gold border around the section. On by default; set false to turn it off. */
    frame?: boolean;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    /** River scene along the bottom (desktop, and phones unless bottomMobile is set). */
    bottom?: string;
    bottomMobile?: string;
    steps: StoryStep[];
  };

  gallery?: {
    /** Defaults to "Our Gallery". */
    title?: string;
    subtitle?: string;
    /** Small lotus under the heading. */
    lotus?: string;
    background?: string;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    photos: GalleryPhoto[];
    /** Blue butterflies on the photos. On by default; set false to turn them off. */
    butterflies?: boolean;
    /** Handwritten line under the collage. */
    footer?: string;
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

  venue?: {
    /** Defaults to "The Venue". */
    title?: string;
    /** Venue name, shown large under the heading. */
    name: string;
    /** Use \n for a line break. */
    address: string;
    /** Opens when the button is clicked (a Google Maps link). */
    mapUrl: string;
    /** Defaults to "View on Map". */
    buttonLabel?: string;
    /** Small lotus under the heading. */
    lotus?: string;
    /** The venue photo. Transparent PNG/WebP if it has torn paper edges. */
    image?: string;
    imageAlt?: string;
    background?: string;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
  };

  gift?: {
    /** Small line above the title. Defaults to "A little gift, a lot of love". */
    eyebrow?: string;
    /** Defaults to "Send a Gift". */
    title?: string;
    message?: string;
    /** Small lotus used in the dividers. */
    lotus?: string;
    payeeName: string;
    upiId: string;
    /** QR code image. A placeholder shows until you add it. */
    qr?: string;
    /** Under the QR code. Defaults to "Scan to Pay". */
    scanTitle?: string;
    /** Small line under that. Defaults to "UPI · Google Pay · PhonePe · Paytm". */
    scanNote?: string;
    /** The two lines at the bottom. Defaults to the wording in your design. */
    note?: { title: string; text: string };
    /** Defaults to "Open in UPI App". */
    buttonLabel?: string;
    /** Optional. By default the button link is built from upiId and payeeName. */
    payUrl?: string;
    /** App tiles under the UPI ID. A tile shows the app's first letter if it has no icon. */
    apps?: { name: string; icon?: string }[];
    /** The three points at the bottom. The wording from your design is used if you leave this out. */
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
  };

  rsvp?: {
    /** The banner heading. Defaults to "Kindly RSVP". Change it freely. */
    title?: string;
    message?: string;
    /** Defaults to "Confirm Your Presence". */
    buttonLabel?: string;
    /** Small gold lotus in the divider. A drawn one is used if you leave this out. */
    lotus?: string;
    /** The drummer and banana-leaf illustrations at each side. */
    art?: { left?: string; right?: string };
    background?: string;
    /** The Google Apps Script web app URL (it ends in /exec). */
    endpoint: string;
    /** Optional. Digits with country code, e.g. "919876543210". Adds a WhatsApp backup if sending fails. */
    whatsapp?: string;
    /** Wording inside the form. Anything you leave out uses the default. */
    form?: RsvpFormText;
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
