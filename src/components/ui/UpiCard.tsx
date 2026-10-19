import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";
import CopyUpiButton from "./CopyUpiButton";
import FleurDivider from "./FleurDivider";

export type UpiApp = { name: string; icon?: string };

// Color of the parchment behind the card. Used to cut the notched corners.
const PANEL = "#f5e6c7";
const GOLD = "#e0b96a";

/** One notched corner: a quarter circle in the panel color with a thin gold arc. */
function Notch({ at, className }: { at: string; className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-[1.4rem] ${className}`}
      style={{
        background: `radial-gradient(circle at ${at}, ${PANEL} 0 0.7rem, ${GOLD} 0.7rem 0.78rem, transparent 0.78rem)`,
      }}
    />
  );
}

function AppTile({ app }: { app: UpiApp }) {
  return (
    <li className="flex flex-col items-center gap-1.5">
      <span className="grid size-12 place-items-center overflow-hidden rounded-xl bg-white shadow-[0_2px_6px_rgba(90,50,20,0.2)] lg:size-14">
        {app.icon ? (
          <Image
            src={app.icon}
            alt=""
            width={56}
            height={56}
            className="size-full select-none object-contain p-1.5"
            draggable={false}
          />
        ) : (
          <span className="font-serif text-lg font-semibold text-crimson">
            {app.name.slice(0, 1)}
          </span>
        )}
      </span>
      <span className="font-serif text-[0.78rem] font-medium text-[#4a2a22] lg:text-[0.88rem]">
        {app.name}
      </span>
    </li>
  );
}

/** Row of app tiles. The caller adds the display classes (flex / hidden). */
function AppRow({ apps, className }: { apps: UpiApp[]; className: string }) {
  if (apps.length === 0) return null;
  return (
    <ul className={`items-start justify-center gap-4 lg:gap-5 ${className}`}>
      {apps.map((app) => (
        <AppTile key={app.name} app={app} />
      ))}
    </ul>
  );
}

export default function UpiCard({
  scanTitle,
  scanNote,
  payeeName,
  upiId,
  qr,
  apps,
  buttonLabel,
  payUrl,
}: {
  scanTitle: string;
  scanNote?: string;
  /** Used for the QR image's description. Not shown. */
  payeeName: string;
  upiId: string;
  /** QR code image. A placeholder is shown until it is set. */
  qr?: string;
  apps: UpiApp[];
  buttonLabel: string;
  /** upi://pay?... link opened by the button. */
  payUrl: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[26rem] lg:max-w-[46rem]">
      {/* container-type lets the QR size itself from the card width (cqw) */}
      <div className="relative border border-[#e0b96a] bg-[linear-gradient(180deg,#fbf0d9,#f6e6c6)] px-5 py-6 shadow-[0_4px_16px_rgba(120,70,20,0.15)] [container-type:inline-size] lg:px-8 lg:py-8">
        <Notch at="0 0" className="-left-px -top-px" />
        <Notch at="100% 0" className="-right-px -top-px" />
        <Notch at="0 100%" className="-bottom-px -left-px" />
        <Notch at="100% 100%" className="-bottom-px -right-px" />

        {/* Phone: one column. Desktop: scan on the left, pay on the right. */}
        <div className="grid justify-items-center gap-y-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-8">
          {/* Scan */}
          <div className="flex flex-col items-center text-center">
            <div className="w-[56cqw] max-w-[220px] bg-white p-[3%] shadow-[0_2px_8px_rgba(120,70,20,0.18)] lg:w-[min(24cqw,200px)]">
              <div className="relative aspect-square w-full">
                {qr ? (
                  <Image
                    src={qr}
                    alt={`UPI QR code for ${payeeName}`}
                    fill
                    sizes="(min-width: 1024px) 200px, 56vw"
                    className="select-none object-contain"
                    draggable={false}
                  />
                ) : (
                  // Placeholder until the real QR image is added
                  <div className="grid size-full place-items-center border-2 border-dashed border-[#d3a85a] text-center font-serif text-sm text-[#7a5a3a]">
                    QR code
                    <br />
                    goes here
                  </div>
                )}
              </div>
            </div>
            <p className="mt-3 font-serif text-[1.3rem] font-semibold leading-tight text-[#3a1f1a] lg:text-[1.4rem]">
              {scanTitle}
            </p>
            {scanNote && (
              <p className="mt-0.5 font-serif text-[0.8rem] font-medium text-[#4a2a22] lg:text-[0.9rem]">
                {scanNote}
              </p>
            )}
          </div>

          {/* Vertical divider with the small ornament (desktop only) */}
          <div className="hidden self-stretch lg:flex">
            <FleurDivider vertical />
          </div>

          {/* Pay */}
          <div className="flex w-full flex-col items-center">
            <p className="font-serif text-[1.1rem] font-medium text-[#3a1f1a] lg:text-[1.2rem]">
              UPI ID
            </p>

            <div className="relative mt-2 w-full">
              <p className="rounded-full border border-[#e3cfa6] bg-[#fbf3df] px-12 py-2.5 text-center font-sans text-[0.90rem] text-[#6e4c46] shadow-[inset_0_1px_2px_rgba(120,80,30,0.08)]">
                {upiId}
              </p>
              <span className="absolute right-2 top-1/2 -translate-y-1/2">
                <CopyUpiButton value={upiId} />
              </span>
            </div>

            <a
              href={payUrl}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(180deg,#b3121f,#7d0714)] px-6 py-3 font-serif text-[1.15rem] font-medium text-white shadow-[0_6px_14px_rgba(125,7,20,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(125,7,20,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6e6c6] lg:text-[1.3rem]"
            >
              <Send className="size-5" strokeWidth={1.6} aria-hidden />
              {buttonLabel}
              <ArrowRight className="size-5" strokeWidth={1.8} aria-hidden />
            </a>

            {/* Desktop: app tiles inside the card */}
            <AppRow apps={apps} className="mt-5 hidden lg:flex" />
          </div>
        </div>
      </div>

      {/* Phone: app tiles below the card */}
      <AppRow apps={apps} className="mt-5 flex lg:hidden" />
    </div>
  );
}
