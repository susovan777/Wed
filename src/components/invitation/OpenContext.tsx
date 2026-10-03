"use client";

import { createContext, useContext } from "react";

const OpenContext = createContext(false);

/** Provided by InvitationShell. `true` as soon as the envelope is clicked. */
export const OpenProvider = OpenContext.Provider;

export function useOpened() {
  return useContext(OpenContext);
}
