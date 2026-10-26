import type { OpeningAssets } from "@/components/opening/OpeningGate";

/** Sections the main page can render, in the order they appear. */
export type SectionKey =
  | "hero"
  | "countdown"
  | "letter"
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
  /** Text shown instead of the formatted date, e.g. the Bengali calendar date. */
  dateLabel?: string;
  endsAt?: string;
  venue: Venue;
  description?: string;
  dressCode?: string;
  /** Illustration shown on the event card. */
  image?: string;
};

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
  /** Set by a translation, so sections can format dates and numbers in the right language. */
  lang?: "en" | "bn";

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
    /** Text shown instead of the formatted date (hero), e.g. the Bengali calendar date. */
    dateLabel?: string;
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

  letter?: {
    /** Maroon banner at the top, e.g. "॥ With the Divine Blessings of Lord Prajapati ॥". */
    invocation: string;
    /** Defaults to "A Humble Invitation". */
    title?: string;
    salutation?: string;
    /** One item per paragraph. Text between **double stars** is shown bold and red.
     *  An item that is just "---" draws a lotus divider. */
    paragraphs: string[];
    /** e.g. "With warm regards,". */
    closing?: string;
    signature?: string;
    contact?: string;
    /** Small lotus above the banner. */
    ornament?: string;
    /** Small lotus in the dividers. */
    lotus?: string;
    /** Left-side illustration (desktop only), like the temple and kalash in your design. */
    art?: string;
    corners?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
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
    /** Text on the button that opens the QR card. Defaults to "Send a Gift". */
    openLabel?: string;
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

  footer?: {
    /** Small line at the top. Defaults to "With love". */
    eyebrow?: string;
    /** The thank-you line under it. */
    message?: string;
    /** Shown in the bottom bar, in quote marks. */
    quote?: string;
    /** Faint lotus line art at each side. */
    art?: { left?: string; right?: string };
    background?: string;
    logo?: string;
    /** Leave a link out and its icon is hidden. WhatsApp can be a full link or just a number with country code. */
    social?: {
      instagram?: string;
      facebook?: string;
      whatsapp?: string;
    };
    /** The credit line at the very bottom, and the portfolio icon beside the social icons. */
    developer?: {
      name: string;
      /** Your portfolio address. Without it, the name shows as plain text and the icon is hidden. */
      url?: string;
      /** Text before the name at the very bottom. Defaults to "Designed and developed by". */
      credit?: string;
    };
  };

  note?: string;

  music?: {
    /** Path to the song, e.g. "/invitations/music.mp3". */
    src: string;
    /** Shown as a tooltip on the button. */
    title?: string;
    /** 0 to 1. Defaults to 0.6. */
    volume?: number;
  };

  seo: {
    title: string;
    description: string;
  };

  /** Optional per-invitation order and visibility. Defaults to every section. */
  sections?: SectionKey[];
};
