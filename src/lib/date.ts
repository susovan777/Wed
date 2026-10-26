import type { Lang } from "./i18n";

/** All invitation dates are shown in Indian Standard Time, whatever the viewer's time zone. */
export const IST = "Asia/Kolkata";

function isValid(iso: string) {
  return !Number.isNaN(new Date(iso).getTime());
}

/**
 * "Wednesday, 23 December 2026"
 * Bengali: "বুধবার, ২৩ ডিসেম্বর ২০২৬"
 */
export function formatWeddingDate(iso: string, lang: Lang = "en"): string {
  if (!isValid(iso)) return iso; // not a date: show it as written, never crash

  const parts = new Intl.DateTimeFormat(lang === "bn" ? "bn-IN" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: IST,
  }).formatToParts(new Date(iso));

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${pick("weekday")}, ${pick("day")} ${pick("month")} ${pick("year")}`;
}

/**
 * The wedding date as shown on the page. Uses `dateLabel` (for example the Bengali
 * calendar date) when the invitation has one, otherwise the formatted `date`.
 */
export function weddingDateText(
  wedding: { date: string; dateLabel?: string },
  lang: Lang = "en",
): string {
  return wedding.dateLabel || formatWeddingDate(wedding.date, lang);
}
