import type { Invitation } from "@/types/invitation";
import { sahooWedding } from "./sahoo-wedding";

// To add a new invitation: create its content file and add it to this list.
const all: Invitation[] = [sahooWedding];

const bySlug = new Map(all.map((invitation) => [invitation.slug, invitation]));

export function getInvitation(slug: string): Invitation | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return all.map((invitation) => invitation.slug);
}
