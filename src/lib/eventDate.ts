import { IST } from "./date";

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

function parts(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: IST,
  }).formatToParts(new Date(iso));
}

function pick(list: Intl.DateTimeFormatPart[], type: string) {
  return list.find((part) => part.type === type)?.value ?? "";
}

/** "22 Nov 2026" */
export function formatEventDate(iso: string): string {
  const p = parts(iso, { day: "numeric", month: "numeric", year: "numeric" });
  const month = MONTHS[Number(pick(p, "month")) - 1] ?? "";
  return `${pick(p, "day")} ${month} ${pick(p, "year")}`;
}

/** "4:00 PM" */
export function formatEventTime(iso: string): string {
  const p = parts(iso, { hour: "numeric", minute: "2-digit", hour12: true });
  return `${pick(p, "hour")}:${pick(p, "minute")} ${pick(p, "dayPeriod").toUpperCase()}`;
}
