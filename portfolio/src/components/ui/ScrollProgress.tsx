"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline reading-progress bar under the nav.
 *
 * On a single long page this answers "how much more is there?" — the question
 * that otherwise makes people bail halfway. Two pixels of accent, no chrome.
 *
 * Purely decorative, so it's hidden from assistive tech: a screen reader user
 * already knows their position in the document.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-accent pointer-events-none fixed inset-x-0 top-0 z-60 h-[2px] origin-left"
    />
  );
}
