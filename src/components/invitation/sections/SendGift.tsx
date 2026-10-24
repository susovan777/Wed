import { Gift } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import GiftFrame from "@/components/ui/GiftFrame";
import LotusRule from "@/components/ui/LotusRule";
import UpiCard from "@/components/ui/UpiCard";
import SendGiftDialog from "@/components/ui/SendGiftDialog";
import type { Invitation } from "@/types/invitation";
import SectionHeading from "@/components/ui/SectionHeading";

const TOP_CORNER = "w-[30vw] max-w-[250px] lg:w-[20%] lg:max-w-[300px]";
const BOTTOM_CORNER = "w-[32vw] max-w-[160px] lg:w-[22%] lg:max-w-[360px]";

const DEFAULT_APPS = [
  { name: "Google Pay" },
  { name: "PhonePe" },
  { name: "Paytm" },
  { name: "BHIM" },
];

const DEFAULT_NOTE = {
  title: "Gifting is completely optional.",
  text: "Your presence and blessings are our greatest gift.",
};

export default function SendGift({ invitation }: { invitation: Invitation }) {
  const g = invitation.gift;
  if (!g) return null;

  const corners = g.corners ?? {};
  const note = g.note ?? DEFAULT_NOTE;
  const payUrl =
    g.payUrl ??
    `upi://pay?pa=${encodeURIComponent(g.upiId)}&pn=${encodeURIComponent(g.payeeName)}&cu=INR`;

  return (
    <section
      id="gift"
      aria-labelledby="gift-title"
      className="relative isolate overflow-hidden"
    >
      <GiftFrame bodyClassName="px-[5%] pb-[8vw] pt-8 lg:px-[12%] lg:pb-0 lg:pt-0">
        {/* Heading and message */}
        <Reveal className="mx-auto flex max-w-136 flex-col items-center text-center lg:max-w-3xl">
          <p className="mb-3 font-serif text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#4a2a22] lg:text-[clamp(0.8rem,1.15vw,1rem)]">
            {g.eyebrow ?? "A little gift, a lot of love"}
          </p>
          <SectionHeading
            id="celebrations-title"
            title={g.title ?? "Send a Gift"}
          />
          {/* <LotusRule
            lotus={g.lotus}
            className="mt-3 lg:mt-4"
            lineClass="w-14 lg:w-28"
          /> */}
          {g.message && (
            <p className="mt-5 text-balance font-serif text-[0.95rem] font-medium leading-relaxed text-[#4a2a22] lg:text-[clamp(1rem,1.45vw,1.3rem)]">
              {g.message}
            </p>
          )}
        </Reveal>

        {/* Send a Gift button. The UPI card opens in a popup when it is clicked. */}
        <Reveal y={30} delay={0.15} className="mt-8 lg:mt-10">
          <SendGiftDialog label={g.openLabel ?? "Send a Gift"}>
            <UpiCard
              scanTitle={g.scanTitle ?? "Scan to Pay"}
              scanNote={g.scanNote ?? "UPI · Google Pay · PhonePe · Paytm"}
              payeeName={g.payeeName}
              upiId={g.upiId}
              qr={g.qr}
              apps={g.apps ?? DEFAULT_APPS}
              buttonLabel={g.buttonLabel ?? "Pay Now"}
              payUrl={payUrl}
            />
          </SendGiftDialog>
        </Reveal>

        {/* Optional-gift note: line, gift icon, line, then two lines of text */}
        <Reveal
          y={20}
          delay={0.25}
          className="mt-8 flex flex-col items-center text-center lg:mt-10"
        >
          <div
            aria-hidden
            className="flex w-full max-w-lg items-center justify-center gap-3"
          >
            <span className="h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--color-crimson))]" />
            <Gift className="size-7 shrink-0 text-crimson" strokeWidth={1.6} />
            <span className="h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--color-crimson))]" />
          </div>
          <p className="mt-3 font-serif text-[1.15rem] font-medium text-crimson lg:text-[1.5rem]">
            {note.title}
          </p>
          <p className="mt-1 font-serif text-[0.8rem] font-medium text-[#4a2a22] lg:text-[1.1rem]">
            {note.text}
          </p>
        </Reveal>
      </GiftFrame>

      {/* Corner images sit above the frame and its gold edge */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-[-1%] top-0 z-4 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 12vw, 22vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-[-1%] top-0 z-4 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 12vw, 22vw"
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 left-0 z-4 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 22vw, 32vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 -right-5 z-4 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 22vw, 32vw"
      />
    </section>
  );
}
