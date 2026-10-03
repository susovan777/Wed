import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InvitationShell from "@/components/invitation/InvitationShell";
import { getAllSlugs, getInvitation } from "@/content/invitations";

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

  return <InvitationShell invitation={invitation} />;
}
