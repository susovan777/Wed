import { useSyncExternalStore } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Time left until an ISO date. Shows zeros on the server, then ticks every second. */
export function useCountdown(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();

  const totalSeconds = useSyncExternalStore(
    subscribe,
    () => Math.max(0, Math.floor((target - Date.now()) / 1000)),
    () => 0,
  );

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
