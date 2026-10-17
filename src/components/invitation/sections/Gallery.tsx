import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CornerImage from "@/components/ui/CornerImage";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Invitation } from "@/types/invitation";
import GalleryCollage from "@/components/ui/GalleryCollage";

// Line-art corners on top, lotus corners at the bottom
const TOP_CORNER = "w-[30vw] max-w-[110px] lg:w-[14%] lg:max-w-[220px]";
const BOTTOM_CORNER = "w-[30vw] max-w-[130px] lg:w-[8%] lg:max-w-[130px]";

export default function Gallery({ invitation }: { invitation: Invitation }) {
  const g = invitation.gallery;
  if (!g || g.photos.length === 0) return null;

  const corners = g.corners ?? {};

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative isolate overflow-hidden"
    >
      {g.background && (
        <Image
          src={g.background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 select-none object-cover object-center"
        />
      )}

      <CornerImage
        src={corners.topLeft}
        y={-20}
        className={`left-0 top-0 z-1 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 14vw, 24vw"
      />
      <CornerImage
        src={corners.topRight}
        y={-20}
        className={`right-0 top-0 z-1 ${TOP_CORNER}`}
        sizes="(min-width: 1024px) 14vw, 24vw"
      />
      <CornerImage
        src={corners.bottomLeft}
        y={20}
        className={`bottom-0 left-0 z-1 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 8vw, 18vw"
      />
      <CornerImage
        src={corners.bottomRight}
        y={20}
        className={`bottom-0 right-0 z-1 ${BOTTOM_CORNER}`}
        sizes="(min-width: 1024px) 8vw, 18vw"
      />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-4 pb-14 pt-10 lg:px-8 lg:pb-16 lg:pt-12">
        <SectionHeading
          id="gallery-title"
          title={g.title ?? "Our Gallery"}
          subtitle={g.subtitle}
          lotus={g.lotus}
        />

        <div className="mt-8 lg:mt-10">
          <GalleryCollage photos={g.photos} butterflies={g.butterflies !== false} />
        </div>

        {g.footer && (
          <Reveal y={20}>
            <p className="mt-6 text-center font-hand leading-none text-[#3a2420] [font-size:clamp(2.2rem,7vw,3.6rem)] lg:mt-8">
              {g.footer}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
