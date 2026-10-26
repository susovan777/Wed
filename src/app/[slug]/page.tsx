import type { Metadata } from "next";
import { localize } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { translations } from "@/content/invitations/translations";
import { getAllSlugs, getInvitation } from "@/content/invitations";
import InvitationShell from "@/components/invitation/InvitationShell";
import InvitationSections from "@/components/invitation/InvitationSections";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const invitation = getInvitation(slug);
  if (!invitation) return {};

  return {
    title: invitation.seo.title,
    description: invitation.seo.description,
    robots: { index: false, follow: false },
  };
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;
  const invitation = getInvitation(slug);
  if (!invitation) notFound();

  const bn = translations[slug]?.bn;
  const sections = {
    en: <InvitationSections invitation={invitation} />,
    bn: bn ? (
      <InvitationSections invitation={localize(invitation, bn)} />
    ) : undefined,
  };

  return <InvitationShell invitation={invitation} sections={sections} />;

  // return (
  //   <InvitationShell invitation={invitation}>
  //     <InvitationSections invitation={invitation} />
  //   </InvitationShell>
  // );
}
