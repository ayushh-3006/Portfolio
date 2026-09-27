"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word entrance for display headlines.
 *
 * Accessibility: the split words are hidden from assistive tech and the
 * original string is exposed once via aria-label, so a screen reader announces
 * a sentence rather than a list of disconnected words.
 *
 * Each word sits in an overflow-hidden wrapper so it rises out of a clean edge
 * instead of fading in place — the effect that makes the headline feel
 * deliberate rather than decorated.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const words = text.split(" ");

  return (
    <Tag className={cn("block", className)} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.045, delayChildren: delay },
          },
        }}
      >
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span
              // Each word rides in its own clipping window so it rises out of a
              // clean edge. Spacing must come from a real text node between the
              // windows (below), not a margin: a margin renders correctly but
              // leaves textContent as "Youbringtheidea", which is what a crawler
              // reads out of the most important heading on the page.
              className="inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  visible: {
                    y: 0,
                    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
