export type Attending = "yes" | "no";

export type RsvpPayload = {
  /** Stays the same if the guest updates their reply, so the sheet updates the same row. */
  id: string;
  name: string;
  attending: Attending;
  message: string;
  /** Hidden trap field. Real guests leave it empty. */
  company: string;
};

export type StoredReply = {
  id: string;
  name: string;
  attending: Attending;
  message: string;
};

/**
 * "ok": the script confirmed it saved.
 * "sent": it was delivered but the browser would not let us read the answer, so it is unconfirmed.
 * "error": it could not be sent.
 */
export type SubmitResult = "ok" | "sent" | "error";

// A "simple" request (plain text, no custom headers) avoids the browser's preflight check,
// which Google Apps Script does not answer.
const HEADERS = { "Content-Type": "text/plain;charset=utf-8" };
const TIMEOUT_MS = 15000;

async function post(endpoint: string, body: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(endpoint, {
      method: "POST",
      headers: HEADERS,
      body,
      signal: controller.signal,
      ...init,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sends the reply to the Google Apps Script web app.
 * To use another service later (Formspree, your own API), change only this function.
 */
export async function submitRsvp(
  endpoint: string,
  payload: RsvpPayload,
): Promise<SubmitResult> {
  const body = JSON.stringify(payload);

  let response: Response;
  try {
    response = await post(endpoint, body);
  } catch {
    // The reply may have arrived even though the browser blocked reading the answer.
    // Send once more without reading it. The script updates by id, so this
    // never creates a duplicate row.
    try {
      await post(endpoint, body, { mode: "no-cors" });
      return "sent";
    } catch {
      return "error";
    }
  }

  try {
    const data = await response.json();
    return data?.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}

// ---- Remembering the guest's reply in this browser ----

const keyFor = (slug: string) => `rsvp:${slug}`;
export const RSVP_EVENT = "rsvp-changed";

export function readReplyRaw(slug: string): string | null {
  try {
    return localStorage.getItem(keyFor(slug));
  } catch {
    return null;
  }
}

export function readReply(slug: string): StoredReply | null {
  const raw = readReplyRaw(slug);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (
      value &&
      typeof value.id === "string" &&
      typeof value.name === "string" &&
      (value.attending === "yes" || value.attending === "no")
    ) {
      return {
        id: value.id,
        name: value.name,
        attending: value.attending,
        message: typeof value.message === "string" ? value.message : "",
      };
    }
  } catch {
    // ignore a damaged value
  }
  return null;
}

export function saveReply(slug: string, reply: StoredReply) {
  try {
    localStorage.setItem(keyFor(slug), JSON.stringify(reply));
    window.dispatchEvent(new Event(RSVP_EVENT));
  } catch {
    // storage may be blocked (private mode); the reply was still sent
  }
}

export function subscribeReply(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(RSVP_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(RSVP_EVENT, callback);
  };
}

/** wa.me link with a ready message. `number` is digits with country code, e.g. 919876543210. */
export function whatsappLink(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
