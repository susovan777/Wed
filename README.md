# Wedding Invitation Website

An animated, mobile-first wedding invitation website with a Bengali-inspired design. It is built as a **reusable template**: one content file describes a couple, and every part of the page reads from it. A new invitation means a new content file and a new set of images, with no component changes.

## Highlights

- **Envelope opening.** The page starts with an animated envelope. Tapping it breaks the seal, opens the invitation and starts the music.
- **Fully responsive.** Every section has its own desktop and phone layout, not just a shrunken desktop one.
- **Smooth animation.** Sections rise in as you scroll, the couple's names reveal with a motion-blur effect, rose petals fall once after the envelope opens, and butterflies land on photos and move their wings.
- **Ten sections**, listed below, each in its own component and each optional.
- **Data driven.** Names, dates, venue, captions, links and wording all live in a content file.
- **RSVP without a backend.** Replies go to a Google Sheet through a small Google Apps Script.
- **Accessible.** Modals trap focus and close with the Escape key. Buttons have labels, and animations are reduced for visitors who prefer less motion.

## Sections

| Section         | What it shows                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Opening gate    | Full-page artwork with an envelope and a seal. Tap to open                                      |
| Hero            | Ganesha mark, couple's names, hashtag, date, city and the couple illustration                   |
| Countdown       | Live days, hours, minutes and seconds to the wedding, on ornate red cards                       |
| Bride and Groom | Two framed portraits. Each button opens a details modal. A butterfly lands on the bride's photo |
| Wedding Events  | Four event cards with date, time and a short line each                                          |
| Our Story       | Introduction, two photos and a four-step timeline                                               |
| Gallery         | A five-photo collage with caption styles. Each photo opens large over a blurred background      |
| Venue           | Venue name, address, a map button and a photo                                                   |
| Send a Gift     | A digital gifting card with a QR code, UPI ID with a copy button, and a pay button              |
| RSVP            | A banner with a button that opens a form (name, attending, blessing)                            |
| Footer          | Thank-you message, couple's names, social links, a developer link and credit                    |

Background music and the falling petals are not sections. They run across the page.

## Tech stack

| Area            | Choice                                               |
| --------------- | ---------------------------------------------------- |
| Framework       | Next.js (App Router) with TypeScript                 |
| Styling         | Tailwind CSS v4, with design tokens in `globals.css` |
| Animation       | Motion (`motion/react`)                              |
| Icons           | lucide-react, plus a few icons drawn as inline SVG   |
| Fonts           | `next/font/google`                                   |
| Package manager | pnpm                                                 |
| RSVP storage    | Google Sheets through Google Apps Script             |

## Project structure

```
src/
  app/
    layout.tsx                  fonts
    globals.css                 theme colors and font mapping
    [slug]/page.tsx             one page per invitation (noindex, pre-rendered)
  content/invitations/
    index.ts                    registry of all invitations
    sample-wedding.ts           one content file per couple
  types/invitation.ts           the data types
  components/
    opening/OpeningGate.tsx     the envelope
    invitation/
      InvitationShell.tsx       gate, page fade-in, theme, petals, music
      InvitationSections.tsx    section registry and order
      OpenContext.tsx           "envelope was opened" flag for animations
      PetalFall.tsx             falling petals
      MusicPlayer.tsx           background music and its button
      sections/                 one file per section
    motion/                     Reveal, BlurText
    ui/                         shared pieces (cards, dividers, modals, buttons, icons)
  hooks/useCountdown.ts
  lib/                          date.ts, eventDate.ts, rsvp.ts
public/invitations/             images and audio
```

## How it works

- **One content file per couple.** The `Invitation` type in `src/types/invitation.ts` describes everything: the opening images, the couple, the wedding date and city, the events, and one optional block per section (`countdown`, `celebrations`, `story`, `gallery`, `brideGroom`, `venue`, `gift`, `rsvp`, `footer`), plus `music`, `seo` and an optional `theme`.
- **Pages are made from the slug.** `src/app/[slug]/page.tsx` looks up the invitation by its slug, builds the page, marks it `noindex` and pre-renders every registered invitation.
- **Sections are rendered from a list.** `InvitationSections.tsx` holds a registry (section key to component) and a default order. A section appears only if it is in the registry and in the order, and only if its content block exists.
- **The opening flow.** The gate's `onOpen` runs inside the tap. That is what lets the music start, because browsers only allow sound after a tap. The first sections' entrance animations wait for the envelope to open.
- **Dates use Indian time.** Dates in the content carry a `+05:30` offset, and everything is shown in IST whatever the visitor's time zone.

## Adding a new invitation

1. Copy `src/content/invitations/sample-wedding.ts` and give the copy a new `slug`.
2. Fill in the couple, date, events, venue and the content blocks you want to show.
3. Register it in `src/content/invitations/index.ts`.
4. Add its images to `public/invitations/` and point the content at them.
5. The invitation is now served at `/<slug>`.

A section whose content block is left out is simply not shown. To change the order for one invitation only, set its `sections` list.

## Adding or reordering sections

1. Build the component in `src/components/invitation/sections/`.
2. Add its key to `SectionKey` in `src/types/invitation.ts`.
3. Add it to the `registry` and to `defaultOrder` in `InvitationSections.tsx`.

The order used in the design is: hero, countdown, brideGroom, celebrations, story, gallery, venue, gift, rsvp, footer.

## Customizing the look

**Colors** are tokens in `src/app/globals.css`, so one invitation can override them through its `theme` field.

| Token                          | Use                                    |
| ------------------------------ | -------------------------------------- |
| `primary`, `crimson`, `maroon` | Reds for headings, buttons and accents |
| `gold`, `gilt`                 | Golds for borders and ornaments        |
| `paper`, `cream`, `ivory`      | Parchment backgrounds                  |
| `forest`, `leaf`, `sage`       | Greens for the story section           |
| `ink`                          | Body text                              |

**Fonts** are loaded in `layout.tsx` and mapped in `globals.css`.

| Utility class | Font                | Used for                           |
| ------------- | ------------------- | ---------------------------------- |
| `font-script` | Great Vibes         | Couple's names and script headings |
| `font-serif`  | Cormorant Garamond  | Headings and most text             |
| `font-sans`   | Inter               | Small labels and some body text    |
| `font-hand`   | Mrs Saint Delafield | Gallery caption handwriting        |
| `font-mono`   | Space Mono          | Gallery caption typewriter text    |

**Shared building blocks**

- `Reveal` fades and lifts content in, either when the envelope opens or when it scrolls into view.
- `BlurText` reveals text letter by letter with a motion-blur look.
- `CornerImage` places corner artwork that drifts into place.
- Several sections use CSS container query units (`cqw`, `cqh`) so their contents scale with the section itself.

## Images

All images and audio go in `public/invitations/`. The design uses images for artwork and photos, and draws frames, cards, buttons, dividers, borders and several ornaments in code so they scale cleanly.

- Artwork such as corners, ornaments, illustrations and frames should be **transparent PNG or WebP**.
- Photos can be JPG or WebP. About 1600 px on the long side is plenty.
- Each section's content block lists which image slots it supports. Most are optional, and a missing image is skipped or replaced by a simple drawn fallback.

## RSVP setup

Replies are saved to a Google Sheet that you own. The form collects a name, whether the guest will attend, and an optional blessing (up to 300 characters).

1. Create a Google Sheet.
2. Open **Extensions > Apps Script** and paste the contents of the RSVP script (`rsvp-apps-script.gs`). Optionally set `NOTIFY_EMAIL` to get an email for every reply.
3. Choose **Deploy > New deployment > Web app**, with **Execute as: Me** and **Who has access: Anyone**. Authorize it when asked.
4. Copy the web app address (it ends in `/exec`) into `rsvp.endpoint` in the content file.
5. Optionally set `rsvp.whatsapp` (digits with country code) to offer a WhatsApp backup if sending fails.

How it behaves:

- The script checks the reply again on its side and saves a row with the time, a hidden id, the name, Yes or No, and the message.
- A hidden trap field and a minimum fill time quietly drop bot replies.
- A guest who replies again from the same browser updates their row instead of adding a second one.
- If you change the script later, create a **new version** in **Manage deployments**. Saving alone does not update the live address.
- All sending happens in one function, `submitRsvp` in `src/lib/rsvp.ts`. To use another service later, change only that function.

## Background music

- Set `music.src` (for example `/invitations/music.mp3`), and optionally `music.volume` (0 to 1) and `music.title`.
- The song loads while the envelope is on screen and starts, fading in, when the envelope is tapped.
- A small button at the bottom right plays or pauses it. The music pauses when the visitor leaves the tab and resumes when they return.
- Keep the file light (a few MB) and use music you are licensed to use. It loops forever.

## Send a Gift (UPI)

- Set `gift.payeeName`, `gift.upiId` and the QR image in `gift.qr`.
- The pay button opens a `upi://pay` link built from the UPI ID and name. On a phone it opens the user's UPI app. On a desktop browser it usually does nothing, so the QR code is the main way to pay there.
- The app tiles (Google Pay, PhonePe, Paytm, BHIM) are decorative. Add each app's official logo through `gift.apps` and follow the brand's usage rules.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari. A few layouts use modern CSS: container query units, `dvh` units and `:has()`. These need roughly Chrome 105, Firefox 121 and Safari 16.4 or newer.

## Notes

- Visitor privacy: the RSVP messages exist only in your Google Sheet and are not shown on the site. A reply is remembered only in the visitor's own browser, so the form can be pre-filled if they come back.
- Photos, music, logos and illustrations must be used under a suitable licence.
- The invitation pages are `noindex`, so search engines are asked not to list them.

## License

Add your preferred license here.
