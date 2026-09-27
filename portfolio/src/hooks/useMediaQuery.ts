"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reports whether a media query currently matches.
 *
 * Implemented with `useSyncExternalStore` rather than useState + useEffect:
 * matchMedia is exactly the "external store" that API exists for. It also
 * avoids the cascading re-render you get from setting state in an effect on
 * mount, and gives a clean server snapshot.
 *
 * The server snapshot is always `false`, so any component using this must have
 * a sensible "no match" default. Every caller here is mobile-first, which is
 * the right default anyway.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Matches the Tailwind `md` breakpoint. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");
