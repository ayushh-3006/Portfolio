"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * `reducedMotion="user"` makes Motion honour the OS preference natively:
 * transform and layout animations are suppressed from the first frame, with no
 * flash of movement while a hook resolves. This is the reason no individual
 * component needs to reason about reduced motion for its entrance.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionConfig>
  );
}
