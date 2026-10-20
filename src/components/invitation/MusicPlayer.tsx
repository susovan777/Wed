"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { Music } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type MusicHandle = {
  /** Call this from inside the envelope's click. Browsers only allow sound after a tap. */
  start: () => void;
};

const FADE_IN_MS = 2000;
const FADE_OUT_MS = 600;

function Equalizer({ animate }: { animate: boolean }) {
  return (
    <span aria-hidden className="flex h-5 items-end gap-0.75">
      {[0.9, 1.15, 0.75].map((seconds, i) => (
        <motion.span
          key={i}
          className="block h-full w-0.75 origin-bottom rounded-full bg-white"
          animate={
            animate ? { scaleY: [0.3, 1, 0.5, 0.9, 0.3] } : { scaleY: 0.5 }
          }
          transition={{
            duration: seconds,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}

export default function MusicPlayer({
  ref,
  src,
  volume = 0.6,
  title,
  visible,
}: {
  ref?: Ref<MusicHandle>;
  src: string;
  /** 0 to 1. */
  volume?: number;
  /** Shown as a tooltip on the button. */
  title?: string;
  /** Show the button. Pass true once the envelope has been opened. */
  visible: boolean;
}) {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const resumeRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  // const fadeTo = useCallback(
  //   (target: number, ms: number, done?: () => void) => {
  //     const audio = audioRef.current;
  //     if (!audio) return;
  //     if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

  //     const from = audio.volume;
  //     const startedAt = performance.now();
  //     const step = (now: number) => {
  //       const t = Math.min(1, (now - startedAt) / ms);
  //       audio.volume = from + (target - from) * t; // iPhones ignore volume changes, which is harmless
  //       if (t < 1) {
  //         fadeRef.current = requestAnimationFrame(step);
  //       } else {
  //         fadeRef.current = null;
  //         done?.();
  //       }
  //     };
  //     fadeRef.current = requestAnimationFrame(step);
  //   },
  //   [],
  // );

  const fadeTo = useCallback(
    (target: number, ms: number, done?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

      const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
      const goal = clamp01(target);
      const from = clamp01(audio.volume);
      let startedAt: number | null = null;

      const step = (now: number) => {
        // The first frame counts as time zero, so progress can never be negative.
        if (startedAt === null) startedAt = now;
        const t = clamp01((now - startedAt) / ms);
        audio.volume = clamp01(from + (goal - from) * t); // iPhones ignore volume changes, which is harmless
        if (t < 1) {
          fadeRef.current = requestAnimationFrame(step);
        } else {
          fadeRef.current = null;
          done?.();
        }
      };
      fadeRef.current = requestAnimationFrame(step);
    },
    [],
  );

  // No awaiting before play(): it has to run inside the tap that triggered it.
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    const attempt = audio.play();
    if (attempt) {
      attempt
        .then(() => fadeTo(volume, FADE_IN_MS))
        .catch(() => setPlaying(false));
    } else {
      fadeTo(volume, FADE_IN_MS);
    }
  }, [fadeTo, volume]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, FADE_OUT_MS, () => audio.pause());
  }, [fadeTo]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else pause();
  };

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        if (audioRef.current?.paused) play();
      },
    }),
    [play],
  );

  // Pause when the guest switches tab or app, and resume when they come back
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        if (!audio.paused) {
          resumeRef.current = true;
          audio.pause();
        }
      } else if (resumeRef.current) {
        resumeRef.current = false;
        play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [play]);

  // Stop the fade and the sound if this component goes away
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audio?.pause();
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <AnimatePresence>
        {visible && (
          <motion.button
            key="music-button"
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause music" : "Play music"}
            title={title}
            className="fixed bottom-4 right-4 z-40 flex h-12 min-w-12 items-center justify-center gap-2 rounded-xl border border-[#d89aa6]/40 bg-[linear-gradient(180deg,#8a2338,#651626)] px-3 font-sans text-sm font-medium text-white shadow-[0_6px_16px_rgba(60,10,20,0.4)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt lg:bottom-6 lg:right-6 lg:px-5"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {playing ? (
              <Equalizer animate={!reduce} />
            ) : (
              <Music className="size-5" strokeWidth={1.8} aria-hidden />
            )}
            <span className="hidden lg:inline">
              {playing ? "Pause music" : "Play music"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
