"use client";

import Reveal from "@/components/motion/Reveal";
import { useCountdown } from "@/hooks/useCountdown";
import CountCard from "./CountCard";

export type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownCards({
  target,
  labels,
}: {
  /** ISO date with offset, e.g. "2027-01-24T19:00:00+05:30". */
  target: string;
  labels: CountdownLabels;
}) {
  const time = useCountdown(target);

  const items = [
    { label: labels.days, value: pad(time.days) },
    { label: labels.hours, value: pad(time.hours) },
    { label: labels.minutes, value: pad(time.minutes) },
    { label: labels.seconds, value: pad(time.seconds) },
  ];

  return (
    <div
      role="group"
      aria-label="Time left until the wedding"
      className="mx-auto flex w-full max-w-160 justify-center gap-2 sm:gap-4"
    >
      {items.map((item, i) => (
        <Reveal
          key={item.label}
          y={30}
          delay={i * 0.12}
          className="min-w-0 max-w-30 flex-1"
        >
          <CountCard value={item.value} label={item.label} />
        </Reveal>
      ))}
    </div>
  );
}
