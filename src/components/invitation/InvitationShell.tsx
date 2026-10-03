"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import OpeningGate from "@/components/opening/OpeningGate";
import type { Invitation } from "@/types/invitation";

export default function InvitationShell({
  invitation,
}: {
  invitation: Invitation;
}) {
  const [opened, setOpened] = useState(false);
  const [gateGone, setGateGone] = useState(false);

  return (
    <div style={invitation.theme as CSSProperties}>
      {/* Main invitation page sits underneath and fades in as the gate opens */}
      <motion.main
        className="flex min-h-dvh items-center justify-center bg-[#f6ecd9] text-[#7a0c12]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={
          opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-serif text-2xl">
          {invitation.couple.bride.name} & {invitation.couple.groom.name}
        </p>
      </motion.main>

      {!gateGone && (
        <OpeningGate
          assets={invitation.opening}
          onOpen={() => setOpened(true)}
          onOpened={() => setGateGone(true)}
        />
      )}
    </div>
  );
}
