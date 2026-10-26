import type { Invitation } from "@/types/invitation";

export type Lang = "en" | "bn";

/** Same shape as T, but every field (and every array item) is optional. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Objects merge key by key. Lists of objects (events, steps, photos) merge by position
 * (item 0 with item 0, and so on), so a translation only needs the text fields.
 * Lists of plain text (letter paragraphs) are replaced as a whole.
 * A missing item or field keeps the English value.
 */
function merge(base: unknown, over: unknown): unknown {
  if (over === undefined) return base;

  if (Array.isArray(base) && Array.isArray(over)) {
    // A list of plain text (like the letter paragraphs) is replaced as a whole,
    // so the translation can have a different number of items.
    if (over.every((item) => typeof item === "string")) return over;
    return base.map((item, i) => merge(item, over[i]));
  }

  if (isPlainObject(base) && isPlainObject(over)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(over)) {
      out[key] = merge(base[key], over[key]);
    }
    return out;
  }

  return over;
}

/** Returns the invitation with the translated fields laid over the English ones. */
export function localize(
  base: Invitation,
  override?: DeepPartial<Invitation>,
): Invitation {
  return override ? (merge(base, override) as Invitation) : base;
}
