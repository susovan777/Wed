type IconProps = { className?: string };

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function InstagramIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsappIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M3 21l1.6-4.9A9 9 0 1 1 8 19.4L3 21z" />
      <path
        d="M9.2 8.4c.3-.4.8-.4 1.1 0l.9 1.3c.2.3.1.7-.1 1l-.5.5c.6 1.1 1.6 2.1 2.8 2.7l.6-.5c.3-.2.7-.2 1 .1l1.2.9c.4.3.4.8 0 1.1-.8.7-1.8.8-2.8.4-2.4-1-4.3-2.9-5.2-5.3-.2-.8 0-1.4.5-2.2z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
