import Reveal from "@/components/motion/Reveal";
import OrnamentDivider from "./OrnamentDivider";

/** Uppercase title, a short line-lotus-line rule, and an optional subtitle. */
export default function SectionHeading({
  id,
  title,
  subtitle,
  lotus,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  /** Small lotus image (transparent). A diamond is shown if omitted. */
  lotus?: string;
}) {
  return (
    <Reveal className="flex flex-col items-center text-center">
      <h2
        id={id}
        className="font-serif text-[clamp(2.1rem,9vw,3.1rem)] font-semibold leading-tight tracking-[0.03em] text-crimson"
      >
        {title}
      </h2>

      <OrnamentDivider className="mt-3 lg:mt-4" />

      {subtitle && (
        <p className="mt-4 max-w-176 font-serif text-base font-medium text-[#5a2b2b] lg:text-xl">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
