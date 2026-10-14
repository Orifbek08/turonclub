import { InviteFlow } from "@/components/invite/InviteFlow";
import { invite } from "@content/invite";

/** Faqat content/invite.ts dagi kodlar ochiladi, qolganlari — 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(invite.links).map((code) => ({ code }));
}

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <InviteFlow source={invite.links[code] ?? code} />;
}
