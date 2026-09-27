"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Whether bespoke, JS-driven motion should run — the hero pipeline loop, the
 * magnetic buttons, the cursor spotlight.
 *
 * Entrance animations do NOT use this. Those are handled globally by
 * `<MotionConfig reducedMotion="user">` in `providers.tsx`, which suppresses
 * transforms from the very first frame. This hook is for the cases where the
 * right answer isn't "animate less" but "render a different, static thing".
 *
 * Resolves to `true` on the server (nothing is matching a media query there),
 * which is correct: the loops it gates are ambient, and CSS handles the
 * reduced-motion case for anything that paints before hydration.
 */
export function useMotionEnabled(): boolean {
  return !useMediaQuery("(prefers-reduced-motion: reduce)");
}
