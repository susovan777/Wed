"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import PetalFall from "./PetalFall";
import { OpenProvider } from "./OpenContext";
import type { Invitation } from "@/types/invitation";
import type { Lang } from "@/lib/i18n";
import type { CSSProperties, ReactNode } from "react";
import OpeningGate from "@/components/opening/OpeningGate";
import MusicPlayer, { type MusicHandle } from "./MusicPlayer";
import LanguageToggle from "./LanguageToggle";

const STORAGE_KEY = "invite-lang";

export default function InvitationShell({
  invitation,
  sections,
}: {
  invitation: Invitation;
  /** The page, already rendered once per language. `bn` is left out when there is no translation. */
  sections: { en: ReactNode; bn?: ReactNode };
}) {
  const [opened, setOpened] = useState(false);
  const [gateGone, setGateGone] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const musicRef = useRef<MusicHandle>(null);

  const hasBn = Boolean(sections.bn);

  // Remember the guest's choice
  useEffect(() => {
    try {
      if (hasBn && localStorage.getItem(STORAGE_KEY) === "bn") setLang("bn");
    } catch {}
  }, [hasBn]);

  // The html tag drives the Bengali fonts in globals.css (also covers modals)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const changeLang = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const page = lang === "bn" && sections.bn ? sections.bn : sections.en;

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
          {/* key restarts the scroll animations after a language change */}
          <Fragment key={lang}>{page}</Fragment>
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

        {opened && hasBn && (
          <LanguageToggle lang={lang} onChange={changeLang} />
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
