import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

/** Decorative corner art. Pass the position and size through className. */
export default function CornerImage({
  src,
  y = 0,
  delay = 0.1,
  className = "",
  sizes = "(min-width: 1024px) 14vw, 26vw",
}: {
  src?: string;
  /** Starting vertical offset in px: negative drifts down, positive drifts up. */
  y?: number;
  delay?: number;
  className?: string;
  sizes?: string;
}) {
  if (!src) return null;

  return (
    <Reveal
      y={y}
      delay={delay}
      duration={1.2}
      className={`pointer-events-none absolute ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={600}
        height={600}
        sizes={sizes}
        className="h-auto w-full select-none"
        draggable={false}
      />
    </Reveal>
  );
}
