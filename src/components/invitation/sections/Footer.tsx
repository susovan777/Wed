import Image from "next/image";
import { Globe, Heart } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/ui/FooterIcons";
import type { Invitation } from "@/types/invitation";

const ICON_CIRCLE =
  "grid size-9 place-items-center rounded-full bg-[#2d3b29] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#3d4f38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d3b29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ede0d3]";

/** A full web address is used as is. Digits become a wa.me link. */
function whatsappHref(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

export default function Footer({ invitation }: { invitation: Invitation }) {
  const f = invitation.footer;
  if (!f) return null;

  const { bride, groom, hashtag } = invitation.couple;
  const social = f.social ?? {};
  const developer = f.developer;

  const links = [
    {
      label: "Instagram",
      href: social.instagram,
      Icon: InstagramIcon,
    },
    {
      label: "Facebook",
      href: social.facebook,
      Icon: FacebookIcon,
    },
    {
      label: "WhatsApp",
      href: social.whatsapp ? whatsappHref(social.whatsapp) : undefined,
      Icon: WhatsappIcon,
    },
  ].filter((link) => Boolean(link.href));

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#1a120b]">
      {/* ── Background Layer & Dark Overlay Mask ── */}
      {f.background && (
        <div className="absolute inset-0 z-0">
          <Image
            src={f.background}
            alt=""
            fill
            sizes="100vw"
            className="w-full select-none object-cover object-center"
            priority={false}
          />
          {/* Dark gradient mask: darker in the middle to emphasize the text */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/70"
          />
        </div>
      )}

      {/* ── Foreground Content Area (Guaranteed above background via z-10) ── */}
      <div className="relative z-10">
        <Reveal className="mx-auto flex max-w-176 flex-col items-center px-5 pb-[clamp(2rem,6vw,9rem)] pt-12 text-center lg:pt-16">
          {/* Eyebrow: Bright warm gold */}
          <p className="font-serif text-base font-semibold uppercase tracking-[0.25em] text-[#e8c37c] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] lg:text-[1.15rem]">
            {f.eyebrow ?? "With love"}
          </p>

          {/* Message: Crisp warm cream / white text for high contrast */}
          {f.message && (
            <p className="mt-3.5 max-w-xl text-balance font-serif text-[1.15rem] leading-relaxed text-[#fcf8f2] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] lg:text-base">
              {f.message}
            </p>
          )}

          {/* Names: Luminous gold/rose calligraphy tone matching the monogram */}
          <p className="mt-4 font-script leading-tight text-[#ffc896] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-[clamp(2.5rem,8vw,3.6rem)]">
            {bride.name} &amp; {groom.name}
          </p>

          {/* Divider: Golden lines with red-gold heart */}
          <div aria-hidden className="mt-3 flex items-center gap-3">
            <span className="h-px w-20 bg-[#e8c37c]/60 lg:w-28" />
            <Heart className="size-4 fill-current text-[#e63946] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
            <span className="h-px w-20 bg-[#e8c37c]/60 lg:w-28" />
          </div>

          {/* Monogram Logo */}
          {f.logo && (
            <Image
              src={f.logo}
              alt=""
              width={110}
              height={220}
              className="mt-6 h-auto select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] lg:mt-8"
              draggable={false}
            />
          )}
        </Reveal>
      </div>

      {/* ── Bottom Bar: Quote, social links, hashtag, and credits ── */}
      <div className="relative z-10 bg-[#ede0d3]">
        <div className="mx-auto grid max-w-310 items-center gap-4 px-6 py-5 lg:grid-cols-3 lg:gap-6 lg:px-10">
          <ul className="order-1 flex items-center justify-center gap-3 lg:order-2">
            {links.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={ICON_CIRCLE}
                >
                  <Icon className="size-[1.15rem]" />
                </a>
              </li>
            ))}

            {developer?.url && (
              <>
                <li aria-hidden className="mx-1 h-5 w-px bg-[#2d3b29]/30" />
                <li>
                  <a
                    href={developer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Developer portfolio: ${developer.name}`}
                    title="Developer portfolio"
                    className="grid size-9 place-items-center rounded-full border-[1.5px] border-[#2d3b29] text-[#2d3b29] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2d3b29] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d3b29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ede0d3]"
                  >
                    <Globe
                      className="size-[1.15rem]"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </a>
                </li>
              </>
            )}
          </ul>

          {f.quote && (
            <p className="order-2 text-center font-serif text-[1.05rem] italic text-[#4a3f38] lg:order-1 lg:text-left">
              “{f.quote}”
            </p>
          )}

          {hashtag && (
            <p className="order-3 text-center font-serif text-[1rem] text-[#3f3a36] lg:text-right">
              {hashtag}
            </p>
          )}
        </div>

        {developer && (
          <p className="border-t border-[#d9c7b6]/60 px-6 py-3 text-center font-sans text-[0.75rem] text-[#6b5f55]">
            Designed and developed by{" "}
            {developer.url ? (
              <a
                href={developer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#4a3f38] underline-offset-2 hover:underline"
              >
                {developer.name}
              </a>
            ) : (
              <span className="font-medium text-[#4a3f38]">
                {developer.name}
              </span>
            )}
          </p>
        )}
      </div>
    </footer>
  );
}
