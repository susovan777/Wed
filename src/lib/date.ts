/** All invitation dates are shown in Indian Standard Time, whatever the viewer's time zone. */
export const IST = "Asia/Kolkata";

/** "Wednesday, 23 December 2026" */
export function formatWeddingDate(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
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
