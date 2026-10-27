import type { Metadata } from "next";
import { localize } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { translations } from "@/content/invitations/translations";
import { getInvitation } from "@/content/invitations";
import InvitationShell from "@/components/invitation/InvitationShell";
import InvitationSections from "@/components/invitation/InvitationSections";

// The invitation shown at "/". Change this to switch couples.
const SLUG = "sahoo-wedding";

export function generateMetadata(): Metadata {
  const invitation = getInvitation(SLUG);
  if (!invitation) return {};

  return {
    title: invitation.seo.title,
    description: invitation.seo.description,
    robots: { index: false, follow: false },
    icons: {
      icon: "/favicon.png", // Points to public/favicon.png
    },
  };
}

export default function InvitationPage() {
  const invitation = getInvitation(SLUG);
  if (!invitation) notFound();

  const bn = translations[SLUG]?.bn;
  const sections = {
    en: <InvitationSections invitation={invitation} />,
    bn: bn ? (
      <InvitationSections invitation={localize(invitation, bn)} />
    ) : undefined,
  };

  return <InvitationShell invitation={invitation} sections={sections} />;
}
