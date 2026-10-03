"use client";

import { useState } from "react";
import { motion } from "motion/react";
import OpeningGate, { OpeningAssets } from "../opening/OpeningGate";

// Temporary: these will come from the invitation content file later.
const assets: OpeningAssets = {
  background: "/invitations/bg.png",
  envelope: "/invitations/envelop.png",
  flowerBorder: "/invitations/flower-border.png",
  subhoBibaha: "/invitations/subho-bibaha.png",
};

export default function InvitationShell() {
  const [opened, setOpened] = useState(false);
  const [gateGone, setGateGone] = useState(false);

  return (
    <>
      {/* Main invitation page sits underneath and fades in as the gate opens */}
      <motion.main
        className="flex min-h-dvh items-center justify-center bg-[#f6ecd9] text-[#7a0c12]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={
          opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-serif text-2xl">Main invitation page</p>
      </motion.main>

      {!gateGone && (
        <OpeningGate
          assets={assets}
          onOpen={() => setOpened(true)}
          onOpened={() => setGateGone(true)}
        />
      )}
    </>
  );
}
