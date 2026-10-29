import { useId } from "react";

/*
 * Social icons in their brand colours. Each one draws its own round badge,
 * so size it with a class such as "size-9" (the footer uses "size-full" inside a size-9 link).
 */
type IconProps = { className?: string };

const SIZE = 36;

/** Instagram: the sunset gradient with the white camera outline. */
export function InstagramIcon({ className }: IconProps) {
  const id = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <defs>
        <radialGradient
          id={`${id}-ig`}
          gradientUnits="userSpaceOnUse"
          cx="9.6"
          cy="34.2"
          r="41"
        >
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill={`url(#${id}-ig)`} />
      <rect
        x="9"
        y="9"
        width="14"
        height="14"
        rx="4.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <circle
        cx="16"
        cy="16"
        r="3.4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <circle cx="19.9" cy="12.1" r="1.05" fill="#fff" />
    </svg>
  );
}

/** Facebook: blue badge with the white "f". */
export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle cx="16" cy="16" r="16" fill="#1877f2" />
      <path
        d="M17.6 25v-7.5h2.5l.4-3h-2.9v-1.9c0-.9.3-1.5 1.5-1.5h1.6V8.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3h-2.5v3h2.5V25h3z"
        fill="#fff"
      />
    </svg>
  );
}

/** WhatsApp: green badge with the white chat bubble and phone. */
export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={SIZE}
      height={SIZE}
      aria-hidden
      className={className}
      overflow="visible"
    >
      <circle cx="16" cy="16" r="15.5" fill="#25d366" />
      <path
        d="M16 6.8A9.2 9.2 0 0 0 9.5 22.5L7.4 24.8l4.28-.68A9.2 9.2 0 1 0 16 6.8Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        transform="translate(10.2 10.2) scale(0.48)"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="#fff"
      />
    </svg>
  );
}
