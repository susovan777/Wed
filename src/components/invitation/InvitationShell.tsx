"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import PetalFall from "./PetalFall";
import { OpenProvider } from "./OpenContext";
import type { Invitation } from "@/types/invitation";
import type { CSSProperties, ReactNode } from "react";
import OpeningGate from "@/components/opening/OpeningGate";
import MusicPlayer, { type MusicHandle } from "./MusicPlayer";

export default function InvitationShell({
  invitation,
  children,
}: {
  invitation: Invitation;
  children: ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const [gateGone, setGateGone] = useState(false);
  const musicRef = useRef<MusicHandle>(null);

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

        {/* Falling petals animation */}
        <PetalFall />

        {invitation.music?.src && (
          <MusicPlayer
            ref={musicRef}
            src={invitation.music.src}
            volume={invitation.music.volume}
            title={invitation.music.title}
            visible={opened}
          />
        )}
      </OpenProvider>

      {!gateGone && (
        <OpeningGate
          assets={invitation.opening}
          onOpen={() => {
            musicRef.current?.start();
            setOpened(true);
          }}
          onOpened={() => setGateGone(true)}
        />
      )}
    </div>
  );
}
