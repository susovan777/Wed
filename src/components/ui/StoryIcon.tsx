import { Heart, MessageCircleMore } from "lucide-react";
import type { StoryIcon as StoryIconKey } from "@/types/invitation";

const HEART =
  "M12 20.5C5 15.5 3 12 3 9C3 6.5 5 5 7 5C9 5 11 6.2 12 8C13 6.2 15 5 17 5C19 5 21 6.5 21 9C21 12 19 15.5 12 20.5Z";

export default function StoryIcon({
  name,
  className = "size-6",
}: {
  name?: StoryIconKey;
  className?: string;
}) {
  switch (name) {
    case "chat":
      return (
        <MessageCircleMore
          className={className}
          strokeWidth={1.5}
          aria-hidden
        />
      );

    case "heart":
      return <Heart className={className} strokeWidth={1.5} aria-hidden />;

    // Solitaire ring: a band with a diamond on top
    case "ring":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <circle cx="12" cy="15.5" r="5.5" />
          <path d="M9 6.2L10.5 3.5h3L15 6.2l-3 3z" />
          <path d="M9 6.2h6" />
        </svg>
      );

    // Two interlocked hearts
    case "hearts":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <g transform="translate(0.5 5) scale(0.78)">
            <path d={HEART} />
          </g>
          <g transform="translate(6.5 0) scale(0.78)">
            <path d={HEART} />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
