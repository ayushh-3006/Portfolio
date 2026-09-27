import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary.
 *
 * Every animated component composes from here so the site has one consistent
 * physical feel, and so reduced-motion is handled in exactly one place
 * (see `Reveal` and `useMotionEnabled`) rather than being re-decided per file.
 *
 * The rule for this site: motion exists to direct attention and to show
 * causality. If an animation does neither, it doesn't ship.
 */

export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];
export const EASE_OUT_SOFT: [number, number, number, number] = [
  0.22, 0.61, 0.36, 1,
];

export const softSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

/** Standard entrance: a short rise, never a long slide. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Parent for staggered lists. Children should use `fadeUp` or `fadeIn`. */
export function stagger(childDelay = 0.06, initialDelay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: childDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/** Shared viewport config so reveals trigger at a consistent point. */
export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;
