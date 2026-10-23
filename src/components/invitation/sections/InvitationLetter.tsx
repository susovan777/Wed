import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import GiftFrame from "@/components/ui/GiftFrame";
import LotusRule from "@/components/ui/LotusRule";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Invitation } from "@/types/invitation";

const TOP_CORNER = "w-[40vw] max-w-[250px] lg:w-[22%] lg:max-w-[300px]";
const BOTTOM_CORNER = "w-[48vw] max-w-[200px] lg:w-[25%] lg:max-w-[360px]";

// Left-side art (desktop only). Change these if it touches the text or the frame.
const ART = "bottom-[7%] left-[2%] w-[29%] max-w-[420px]";

/** Text between **double stars** is shown bold and red. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-crimson">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function InvitationLetter({
  invitation,
}: {
  invitation: Invitation;
}) {
  const l = invitation.letter;
  if (!l) return null;

  const corners = l.corners ?? {};
  const BODY =
    "font-fancy text-[1rem] font-bold leading-[1.65] text-[#694a4ae6] lg:text-[clamp(1.25rem,1.3vw,1.18rem)]";

  return (
    <section
      id="letter"
      aria-labelledby="letter-title"
      className="relative isolate overflow-hidden"
    >
      <GiftFrame bodyClassName="px-[5%] pb-[10vw] pt-8 lg:pl-[34%] lg:pr-[9%] lg:pb-0 lg:pt-0">
        {/* Ornament, banner and heading */}
        <Reveal className="mx-auto flex max-w-136 flex-col items-center text-center lg:max-w-3xl">
          {l.ornament && (
            <Image
              src={l.ornament}
              alt=""
              width={300}
              height={120}
              className="mb-2 h-auto w-[min(22vw,100px)] select-none lg:w-[min(10vw,120px)]"
              draggable={false}
            />
          )}

          {/* Maroon banner, drawn in code */}
          <div className="relative rounded-2xl border border-gilt bg-[linear-gradient(180deg,#8f0f1f,#5c0813)] px-6 py-2.5 shadow-[0_6px_14px_rgba(92,8,19,0.35)] lg:px-10 lg:py-3">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-1 rounded-xl border border-gilt/50"
            />
            <p className="relative text-balance font-serif text-[1.05rem] font-semibold text-ivory lg:text-[clamp(1.1rem,1.9vw,1.7rem)]">
              {l.invocation}
            </p>
          </div>

          <SectionHeading
            id="letter-title"
            title={l.title ?? "A Humble Invitation"}
          />
        </Reveal>

        {/* Letter */}
        <Reveal
          y={30}
          delay={0.15}
          className="mx-auto mt-6 max-w-136 text-center lg:mt-7 lg:max-w-none lg:text-left"
        >
          {l.salutation && <p className={BODY}>{l.salutation}</p>}

          {l.paragraphs.map((p, i) =>
            p.trim() === "---" ? (
              <LotusRule
                key={i}
                lotus={l.lotus}
                className="my-5 lg:my-6"
                lineClass="w-14 lg:w-28"
              />
            ) : (
              <p key={i} className={`${BODY} mt-3 whitespace-pre-line`}>
                <Rich text={p} />
              </p>
            ),
          )}
        </Reveal>

        {/* Sign-off */}
        <Reveal
          y={20}
          delay={0.25}
          className="mx-auto mt-6 max-w-136 text-center lg:mt-7 lg:max-w-none lg:text-right"
        >
          {l.closing && <p className={BODY}>{l.closing}</p>}
          {l.signature && (
            <p className="font-serif text-[1.1rem] font-semibold text-crimson lg:text-[clamp(1.1rem,1.6vw,1.4rem)]">
              {l.signature}
            </p>
          )}
          {l.contact && (
            <p className={`${BODY} mt-4 text-center`}>{l.contact}</p>
          )}
        </Reveal>
      </GiftFrame>

      {/* Left-side art, desktop only, under the corner images */}
      <CornerImage
        src={l.art}
        y={20}
        className={`z-3 hidden lg:block ${ART}`}
        sizes="(min-width: 1024px) 29vw, 1px"
      />

      {/* Corner images sit above the frame and its gold edge */}
      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-[-1%] -top-6 z-4 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 12vw, 22vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-[-1%] -top-6 z-4 ${TOP_CORNER}`}
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
        className={`bottom-0 right-0 z-4 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 22vw, 32vw"
      />
    </section>
  );
}
