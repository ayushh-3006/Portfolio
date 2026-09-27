"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n";

export function Problems({ d: _ }: { d: Dictionary["problems"] }) {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-8 items-center">
        {/* LEFT SIDE */}
        <div>
          <Reveal>
            <Eyebrow>ABOUT ME</Eyebrow>
            <p className="mt-5 text-[11px] tracking-[0.15em] text-accent font-mono uppercase">
              FULL-STACK · MERN · AI · DEVOPS
            </p>
            <SectionTitle className="mt-4">Hi, I&apos;m Ayush Kumar Singh.</SectionTitle>
            <p className="mt-6 text-muted text-[clamp(1rem,1.35vw,1.125rem)] leading-relaxed">
              I&apos;m a Computer Science student and Full Stack Developer focused on building modern web applications, backend systems, and AI-powered products. I enjoy turning ideas into clean, functional software that solves real problems.
            </p>
            <p className="mt-4 text-muted text-[clamp(1rem,1.35vw,1.125rem)] leading-relaxed">
              I work with the MERN stack, Java, REST APIs, databases, and Generative AI. Currently, I&apos;m strengthening my backend, DevOps, and system design skills while exploring open source and building real-world projects.
            </p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-hairline bg-surface/20 hover:bg-surface/40 transition-colors duration-300 rounded-xl border p-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-faint font-mono">
                  01 — BUILD
                </p>
                <p className="mt-3 text-[14px] text-ink font-medium">
                  React · Node.js · MERN
                </p>
              </div>
              
              <div className="border-hairline bg-surface/20 hover:bg-surface/40 transition-colors duration-300 rounded-xl border p-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-faint font-mono">
                  02 — ENGINEER
                </p>
                <p className="mt-3 text-[14px] text-ink font-medium">
                  REST APIs · JWT · MongoDB · SQL
                </p>
              </div>

              <div className="border-hairline bg-surface/20 hover:bg-surface/40 transition-colors duration-300 rounded-xl border p-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-faint font-mono">
                  03 — SOLVE
                </p>
                <p className="mt-3 text-[14px] text-ink font-medium">
                  DSA · Java · Problem Solving
                </p>
              </div>

              <div className="border-hairline bg-surface/20 hover:bg-surface/40 transition-colors duration-300 rounded-xl border p-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-faint font-mono">
                  04 — EXPLORE
                </p>
                <p className="mt-3 text-[14px] text-ink font-medium">
                  AI Applications · Groq · Deployment
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative mt-10 min-h-[400px] md:min-h-[480px] lg:mt-0 flex items-center justify-center">
          {/* Card 1 */}
          <motion.div 
            initial={{ rotate: -6, opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 w-[260px] md:w-[320px] bg-[#171717] border border-white/5 shadow-2xl rounded-sm p-8 pb-10 -rotate-3 left-0 md:left-4 top-4 md:top-12"
          >
            {/* Tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/5 backdrop-blur-md -rotate-2"></div>
            
            <p className="font-serif text-[17px] md:text-[20px] text-ink leading-snug italic">
              &quot;Build software that solves real problems — not just software that looks good.&quot;
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-[0.15em] text-faint font-mono">
              — ENGINEERING PHILOSOPHY
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ rotate: 6, opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[260px] md:w-[320px] bg-[#202020] border border-white/5 shadow-2xl shadow-black/50 rounded-sm p-8 pb-10 rotate-3 right-[-20px] md:right-[-40px] top-[140px] md:top-[160px]"
          >
            {/* Tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/5 backdrop-blur-md rotate-3"></div>
            
            <p className="font-serif text-[17px] md:text-[20px] text-ink leading-snug italic">
              &quot;Learn deeply. Build consistently. Keep improving.&quot;
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-[0.15em] text-faint font-mono">
              — PERSONAL PHILOSOPHY
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
