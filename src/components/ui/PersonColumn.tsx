"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Butterfly from "./Butterfly";
import CartoucheLabel from "./CartoucheLabel";
import PersonModal from "./PersonModal";
import type { PersonDetails } from "@/types/invitation";

export default function PersonColumn({
  photo,
  label,
  button,
  name,
  parents,
  details,
  delay,
  butterfly = false,
  className = "",
}: {
  /** Round portrait with its frame already included. */
  photo: string;
  /** Text on the button, e.g. "Bride". */
  label: string;
  /** Button plate image. */
  button?: string;
  name: string;
  parents?: string;
  details?: PersonDetails;
  delay: number;
  /** Shows the butterfly that lands on this photo. */
  butterfly?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Reveal
      y={30}
      delay={delay}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="relative w-full">
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          width={800}
          height={800}
          sizes="(min-width: 1024px) 26vw, 40vw"
          className="h-auto w-full select-none"
          draggable={false}
        />
        {butterfly && <Butterfly />}
      </div>

      <CartoucheLabel
        image={button}
        className="mt-4 w-full lg:mt-7"
        onClick={() => setOpen(true)}
        buttonRef={triggerRef}
        ariaLabel={`Open ${label} details`}
      >
        {label}
      </CartoucheLabel>

      <PersonModal
        open={open}
        onClose={close}
        returnFocusTo={triggerRef}
        photo={photo}
        label={label}
        button={button}
        name={name}
        parents={parents}
        details={details}
      />
    </Reveal>
  );
}
