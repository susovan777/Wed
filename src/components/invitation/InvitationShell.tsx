"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { OpenProvider } from "./OpenContext";
import OpeningGate from "@/components/opening/OpeningGate";
import type { Invitation } from "@/types/invitation";

export default function InvitationShell({
  invitation,
  children,
}: {
  invitation: Invitation;
  children: ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const [gateGone, setGateGone] = useState(false);

  return (
    <div style={invitation.theme as CSSProperties}>
      <OpenProvider value={opened}>
        {/* Main invitation page sits underneath and fades in as the gate opens */}
        <motion.main
          className="min-h-dvh bg-cream"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={
            opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }
          }
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </OpenProvider>

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
