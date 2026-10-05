import { GraduationCap, Heart, Send } from "lucide-react";
import type { StoryIcon as StoryIconKey } from "@/types/invitation";

export default function StoryIcon({
  name,
  className = "size-4.5",
}: {
  name?: StoryIconKey;
  className?: string;
}) {
  switch (name) {
    case "cap":
      return (
        <GraduationCap className={className} strokeWidth={1.4} aria-hidden />
      );
    case "heart":
      return <Heart className={className} strokeWidth={1.4} aria-hidden />;
    case "plane":
      return <Send className={className} strokeWidth={1.4} aria-hidden />;
    case "rings":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <circle cx="8" cy="15.5" r="4.2" />
          <circle cx="16" cy="15.5" r="4.2" />
          <path d="M6.7 6.5L8 4.8l1.3 1.7z" />
          <path d="M14.7 6.5L16 4.8l1.3 1.7z" />
        </svg>
      );
    default:
      return null;
  }
}
