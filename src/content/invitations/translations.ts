import type { Invitation } from "@/types/invitation";
import type { DeepPartial } from "@/lib/i18n";
import { sahooWeddingBn } from "./sahoo-wedding.bn";

/** Bengali text for each invitation, by slug. A couple with no entry here gets no language button. */
export const translations: Record<string, { bn?: DeepPartial<Invitation> }> = {
  "sahoo-wedding": { bn: sahooWeddingBn },
};
