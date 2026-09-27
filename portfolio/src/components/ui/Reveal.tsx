"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Static registry of motion-wrapped tags.
 *
 * `motion.create()` returns a new component type per call, so calling it during
 * render would hand React a different type every pass and force a remount,
 * losing animation state and DOM focus. Everything is created once here, at
 * module scope, and looked up by name.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  article: motion.article,
} as const;

export type RevealTag = keyof typeof TAGS;

type BaseProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
};

/**
 * Standard scroll-triggered entrance. Reduced motion is handled globally by
 * MotionConfig, so this needs no branch of its own.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: BaseProps & { delay?: number }) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct <RevealItem> children so content arrives in reading order
 * rather than all at once.
 *
 * Exported as its own name rather than `Reveal.Group`. Static properties on a
 * "use client" component do not survive the server/client boundary — Next
 * replaces the module's exports with reference proxies, and the attached
 * property comes back undefined at render time.
 */
export function RevealGroup({
  children,
  className,
  gap = 0.06,
  delay = 0,
  as = "div",
}: BaseProps & { gap?: number; delay?: number }) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className, as = "div" }: BaseProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
