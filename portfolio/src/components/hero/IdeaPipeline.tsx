"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import type { Dictionary, Locale } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { stageTones, toneFor } from "@/lib/tones";
import { STAGE_IDS, stageVisuals } from "./pipelineStages";

const STAGE_MS = 2600;

/**
 * The hero visual: one sentence from a client becoming a running product.
 *
 * Why a single framed panel rather than a sprawling node graph — the brief
 * asked for "an idea transforming into a real product" without clutter, and a
 * graph of eight simultaneous nodes is clutter by construction. Showing one
 * stage at a time in one frame reads as a sequence, which is the actual idea.
 *
 * Cost control: the loop only runs while the panel is on screen, and stops
 * entirely under reduced motion, where it renders the finished product instead.
 */
export function IdeaPipeline({
  d,
  locale,
}: {
  d: Dictionary["hero"];
  locale: Locale;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  const stages = useMemo(
    () => STAGE_IDS.map((id) => ({ id, label: d.pipelineStages[id] })),
    [d],
  );

  // Don't burn frames animating a panel nobody is looking at.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motionEnabled || !visible) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % stages.length),
      STAGE_MS,
    );
    return () => window.clearInterval(timer);
  }, [motionEnabled, visible, stages.length]);

  /*
   * Reduced motion jumps to the finished product — the panel still shows the
   * payoff, it just doesn't perform the journey.
   *
   * Derived rather than pushed into state from an effect: writing state in an
   * effect costs an extra render and, more importantly, would briefly paint
   * stage 1 before correcting itself, which is the exact flash of motion the
   * preference exists to prevent.
   */
  const activeIndex = motionEnabled ? index : stages.length - 1;
  const stage = stages[activeIndex];
  const tone = toneFor(stageTones, stage.id);
  const StageVisual = stageVisuals[stage.id];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Accent bloom behind the panel — the only glow in the hero. */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full blur-[80px]"
        animate={{ backgroundColor: `${tone.hex}1f` }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      />

      <div
        aria-hidden="true"
        className="border-hairline-strong bg-elevated relative overflow-hidden rounded-2xl border shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]"
      >
        {/* Window chrome. Signals "software" without a laptop mockup. */}
        <div className="border-hairline flex items-center gap-3 border-b px-4 py-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="h-2 w-2 rounded-full bg-white/15" />
            ))}
          </div>
          <div className="flex items-baseline gap-2 font-mono text-[10px]">
            <span className="text-faint tracking-[0.16em] uppercase">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <motion.span
              className="tracking-[0.12em] uppercase"
              animate={{ color: tone.hex }}
              transition={{ duration: 0.5 }}
            >
              {stage.label}
            </motion.span>
          </div>
        </div>

        {/* Stage body. Fixed height so the panel never jumps between stages. */}
        <div className="relative h-[248px] px-5 py-4 sm:h-[264px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              className="h-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <StageVisual d={d} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress rail. The active stage is named in the chrome above, so the
            bars stay unlabelled — eight labels at this width collide. */}
        <div className="border-hairline flex items-center gap-1.5 border-t px-4 py-3.5">
          {stages.map((item, i) => {
            const isActive = i === activeIndex;
            const isDone = i < activeIndex;
            return (
              <div
                key={item.id}
                className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  className="h-full origin-left"
                  style={{ backgroundColor: toneFor(stageTones, item.id).hex }}
                  initial={false}
                  animate={{ scaleX: isDone || isActive ? 1 : 0 }}
                  transition={{
                    duration: isActive && motionEnabled ? STAGE_MS / 1000 : 0.3,
                    ease: isActive ? "linear" : "easeOut",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* The panel is decorative to assistive tech; this carries its meaning. */}
      <p className="sr-only" lang={locale}>
        {d.pipelineDescription}: {stages.map((s) => s.label).join(", ")}.
      </p>
    </div>
  );
}
