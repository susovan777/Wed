import Image from "next/image";

/** Small gold corner flourish, drawn for the top-left. Mirrored for the other corners. */
function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={`pointer-events-none absolute size-7 text-[#d3b98a] lg:size-8 ${className}`}
    >
      <path d="M2 30V12Q2 2 12 2H30" />
      <path d="M7 30V14Q7 7 14 7H30" opacity="0.55" />
      <path d="M12 12C12 9 14.5 8 16.5 9.5C18 11 17 13.5 14.5 13.5" />
      <path
        d="M20 4.5C22 2 25 2.5 26 4.5C24 6 21.5 6 20 4.5Z"
        fill="currentColor"
        stroke="none"
        opacity="0.45"
      />
      <path
        d="M4.5 20C2 22 2.5 25 4.5 26C6 24 6 21.5 4.5 20Z"
        fill="currentColor"
        stroke="none"
        opacity="0.45"
      />
    </svg>
  );
}

export default function EventCard({
  title,
  date,
  time,
  description,
  image,
}: {
  title: string;
  date: string;
  time: string;
  description?: string;
  image?: string;
}) {
  return (
    <article className="relative flex h-full flex-col items-center rounded-2xl border border-[#e6d6b9] bg-[linear-gradient(180deg,rgba(255,251,243,0.8),rgba(250,238,218,0.7))] px-5 pb-8 pt-9 text-center shadow-[0_2px_12px_rgba(150,110,60,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(150,110,60,0.18)]">
      <CornerOrnament className="left-2 top-2" />
      <CornerOrnament className="right-2 top-2 -scale-x-100" />
      <CornerOrnament className="bottom-2 left-2 -scale-y-100" />
      <CornerOrnament className="bottom-2 right-2 rotate-180" />

      {/* Fixed height so the titles line up across cards */}
      <div className="relative h-32 w-full lg:h-36">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 44vw, 80vw"
            className="select-none object-contain"
            draggable={false}
          />
        )}
      </div>

      <h3 className="mt-5 font-serif text-[1.7rem] font-semibold leading-tight text-crimson">
        {title}
      </h3>
      <p className="mt-2 font-serif text-[1.05rem] font-medium text-[#5a2b2b]">
        {date}
      </p>
      <p className="mt-1 font-serif text-[1.05rem] font-medium text-[#5a2b2b]">
        {time}
      </p>
      {description && (
        <p className="mt-4 whitespace-pre-line text-balance font-serif text-[1.05rem] font-medium leading-snug text-[#4a2a2a]">
          {description}
        </p>
      )}
    </article>
  );
}
