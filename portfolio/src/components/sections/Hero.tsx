"use client";

import { motion } from "motion/react";
import { IdeaPipeline } from "@/components/hero/IdeaPipeline";
import { AvailabilityDot } from "@/components/ui/AvailabilityDot";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";

const enter = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: EASE_OUT_EXPO },
  }),
};

/**
 * The hero has one job: in five seconds, say what this is, who it's for, and
 * why it matters — then give two ways forward.
 *
 * The headline is a promise, not an introduction. "Hi, I'm Ayush" would spend
 * the most valuable line on the page telling the visitor something they
 * didn't come for.
 */
export function Hero({
  d,
  profile,
  locale,
}: {
  d: Dictionary["hero"];
  profile: Dictionary["profile"];
  locale: Locale;
}) {
  return (
    // Vertical rhythm here is tuned so the primary CTA clears the fold on a
    // 1280x720 laptop — the most common screen a decision-maker will open this
    // on. A hero that pushes its own CTA below the fold is a broken hero.
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="grid-field grid-drift absolute inset-0 -z-20 opacity-60"
      />
      {/* Fades the grid out toward the next section so there's no hard seam. */}
      <div
        aria-hidden="true"
        className="from-canvas absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t to-transparent"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.div
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={enter}
            >
              <AvailabilityDot d={profile} showDetail />
            </motion.div>

            <h1 className="mt-6 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.02] font-medium">
              <SplitText text={d.headlineA} delay={0.25} />
              {/* Separates the two lines in textContent so a crawler reads
                  "idea. I turn" rather than "idea.I turn". The two SplitTexts
                  are block-level, so this adds nothing visually. */}{" "}
              <SplitText
                text={d.headlineB}
                delay={0.45}
                className="text-muted"
              />
            </h1>

            <motion.p
              custom={0.85}
              initial="hidden"
              animate="visible"
              variants={enter}
              className="text-muted mt-6 max-w-xl text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-relaxed"
            >
              {d.lede}
            </motion.p>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={enter}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#projects">
                {d.ctaPrimary}
                <ArrowRight />
              </Button>
              <Button href="#contact" variant="secondary">
                {d.ctaSecondary}
              </Button>
            </motion.div>

            <motion.p
              custom={1.15}
              initial="hidden"
              animate="visible"
              variants={enter}
              className="text-faint mt-5 flex flex-wrap items-center gap-x-1 text-[13px]"
            >
              {d.preferToTalk}
              {/* Vertical padding here is not decoration: these are real
                  conversion links, and a 16px-tall tap target on a phone is a
                  missed call. */}
              <a
                href={site.contact.phoneHref}
                className="text-muted hover:text-ink inline-block py-1.5 underline decoration-white/20 underline-offset-4 transition-colors"
              >
                {site.contact.phoneDisplay}
              </a>
              {/* Hidden once the row wraps, where a lone separator would be
                  stranded at the end of a line. */}
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${site.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink inline-block py-1.5 underline decoration-white/20 underline-offset-4 transition-colors"
              >
                {site.contact.email}
              </a>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: EASE_OUT_EXPO }}
          >
            <IdeaPipeline d={d} locale={locale} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
