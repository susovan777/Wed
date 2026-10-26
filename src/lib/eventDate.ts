import { IST } from "./date";
import type { Lang } from "./i18n";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isValid(iso: string) {
  return !Number.isNaN(new Date(iso).getTime());
}

function parts(
  iso: string,
  options: Intl.DateTimeFormatOptions,
  locale = "en-US",
) {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: IST,
  }).formatToParts(new Date(iso));
}

function pick(list: Intl.DateTimeFormatPart[], type: string) {
  return list.find((part) => part.type === type)?.value ?? "";
}

/** "22 Nov 2026". Bengali: "২২ নভেম্বর ২০২৬". */
export function formatEventDate(iso: string, lang: Lang = "en"): string {
  if (!isValid(iso)) return iso; // not a date: show it as written, never crash

  if (lang === "bn") {
    const p = parts(
      iso,
      { day: "numeric", month: "short", year: "numeric" },
      "bn-IN",
    );
    return `${pick(p, "day")} ${pick(p, "month")} ${pick(p, "year")}`;
  }

  const p = parts(iso, { day: "numeric", month: "numeric", year: "numeric" });
  const month = MONTHS[Number(pick(p, "month")) - 1] ?? "";
  return `${pick(p, "day")} ${month} ${pick(p, "year")}`;
}

/**
 * The event date as shown on the card. Uses `dateLabel` (for example the Bengali
 * calendar date) when the event has one, otherwise the formatted `startsAt`.
 */
export function eventDateText(
  event: { startsAt: string; dateLabel?: string },
  lang: Lang = "en",
): string {
  return event.dateLabel || formatEventDate(event.startsAt, lang);
}

/** Bengali time of day, the way it is spoken: "বিকেল ৪:০০". */
function bengaliTime(iso: string): string {
  const p = parts(iso, {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const hour24 = Number(pick(p, "hour")) % 24;
  const minute = Number(pick(p, "minute"));
  const hour12 = hour24 % 12 || 12;

  const period =
    hour24 < 4
      ? "রাত"
      : hour24 < 6
        ? "ভোর"
        : hour24 < 12
          ? "সকাল"
          : hour24 < 15
            ? "দুপুর"
            : hour24 < 18
              ? "বিকেল"
              : hour24 < 20
                ? "সন্ধ্যা"
                : "রাত";

  const hourText = new Intl.NumberFormat("bn-IN", {
    useGrouping: false,
  }).format(hour12);
  const minuteText = new Intl.NumberFormat("bn-IN", {
    useGrouping: false,
    minimumIntegerDigits: 2,
  }).format(minute);

  return `${period} ${hourText}:${minuteText}`;
}

/** "4:00 PM". Bengali: "বিকেল ৪:০০". */
export function formatEventTime(iso: string, lang: Lang = "en"): string {
  if (!isValid(iso)) return "";
  if (lang === "bn") return bengaliTime(iso);

  const p = parts(iso, { hour: "numeric", minute: "2-digit", hour12: true });
  return `${pick(p, "hour")}:${pick(p, "minute")} ${pick(p, "dayPeriod").toUpperCase()}`;
}
