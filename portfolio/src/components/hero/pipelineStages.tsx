"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The eight visuals inside the hero panel — one plain sentence becoming a
 * running product.
 *
 * Each is intentionally abstract: enough structure to read as architecture, a
 * schema, a deploy log or a dashboard, with no fake company, fake metric or
 * fake screenshot anywhere. Nothing here claims to be a real project.
 */

export const STAGE_IDS = [
  "idea",
  "architecture",
  "interface",
  "code",
  "ai",
  "data",
  "deploy",
  "live",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

type HeroDict = Dictionary["hero"];

const rise = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: EASE_OUT_EXPO },
  }),
};

function Idea({ d }: { d: HeroDict }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="text-faint font-mono text-[10px] tracking-[0.2em] uppercase">
        {d.pipelineQuoteLabel}
      </p>
      <p className="text-ink max-w-[22ch] text-[clamp(1rem,2.1vw,1.35rem)] leading-snug font-medium">
        {d.pipelineQuote}
        <motion.span
          aria-hidden="true"
          className="bg-accent ml-1 inline-block h-[1.1em] w-[2px] translate-y-[0.15em]"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.5, 0.5, 1],
          }}
        />
      </p>
    </div>
  );
}

function Architecture() {
  // Each tier gets its own hue, so the diagram reads as a system of distinct
  // parts rather than five identical grey rectangles.
  const boxes = [
    { x: 12, y: 18, w: 74, h: 30, label: "Client", c: "#22d3ee" },
    { x: 128, y: 18, w: 74, h: 30, label: "API", c: "#3d7bff" },
    { x: 128, y: 78, w: 74, h: 30, label: "Auth", c: "#fb7185" },
    { x: 244, y: 18, w: 74, h: 30, label: "Database", c: "#34d399" },
    { x: 244, y: 78, w: 74, h: 30, label: "Jobs", c: "#fbbf24" },
  ];
  const links = ["M86 33 H128", "M202 33 H244", "M165 48 V78", "M281 48 V78"];

  return (
    <svg viewBox="0 0 330 130" className="h-full w-full" role="presentation">
      {links.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="rgba(61,123,255,0.65)"
          strokeWidth="1.25"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: 0.35 + i * 0.12,
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      ))}
      {boxes.map((box, i) => (
        <motion.g
          key={box.label}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={rise}
        >
          <rect
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            rx="7"
            fill={`${box.c}14`}
            stroke={`${box.c}66`}
          />
          <text
            x={box.x + box.w / 2}
            y={box.y + box.h / 2 + 3.5}
            textAnchor="middle"
            fill={box.c}
            className="font-mono text-[9px]"
          >
            {box.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function Interface() {
  const blocks = [
    "col-span-4 h-7",
    "col-span-2 h-7",
    "col-span-2 h-16",
    "col-span-2 h-16",
    "col-span-2 h-16",
    "col-span-6 h-10",
    "col-span-3 h-10",
    "col-span-3 h-10",
  ];

  return (
    <div className="grid h-full grid-cols-6 content-center gap-2.5">
      {blocks.map((cls, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={rise}
          className={`${cls} rounded-md border border-white/10 ${
            i === 1
              ? "bg-tone-cyan/25"
              : i === 3
                ? "bg-tone-violet/20"
                : i === 6
                  ? "bg-tone-amber/20"
                  : "bg-white/[0.045]"
          }`}
        />
      ))}
    </div>
  );
}

function Code() {
  const lines: Array<Array<[string, string]>> = [
    [
      ["export async function", "text-tone-violet"],
      ["createOrder(input) {", "text-tone-amber"],
    ],
    [
      ["const order =", "text-muted"],
      ["await db.orders.insert(input)", "text-tone-cyan"],
    ],
    [
      ["await", "text-tone-violet"],
      ["notify(order.customerId)", "text-tone-cyan"],
    ],
    [
      ["return", "text-tone-violet"],
      ["order", "text-ink"],
    ],
    [["}", "text-muted"]],
  ];

  return (
    <div className="flex h-full flex-col justify-center gap-1.5 font-mono text-[11px] leading-relaxed">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={rise}
          className="flex gap-1.5 whitespace-nowrap"
          style={{ paddingLeft: i > 0 && i < 4 ? 16 : 0 }}
        >
          <span className="text-faint w-3 shrink-0 text-right select-none">
            {i + 1}
          </span>
          {line.map(([text, cls]) => (
            <span key={text} className={cls}>
              {text}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function Ai({ d }: { d: HeroDict }) {
  const chips = d.pipelineAi;

  return (
    <div className="flex h-full items-center justify-center gap-6">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
        {[0, 1, 2].map((ring) => (
          <motion.span
            key={ring}
            className="border-tone-violet/45 absolute inset-0 rounded-full border"
            animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: ring * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
        <span className="bg-tone-violet/15 border-tone-violet/60 text-tone-violet relative flex h-11 w-11 items-center justify-center rounded-full border font-mono text-[10px]">
          AI
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {chips.map((chip, i) => (
          <motion.span
            key={chip}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="text-muted rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px]"
          >
            {chip}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function Data() {
  const rows = [
    ["id", "uuid"],
    ["customer", "relation"],
    ["status", "enum"],
    ["total", "decimal"],
    ["created_at", "timestamp"],
  ];

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="text-faint flex justify-between border-b border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[9px] tracking-[0.16em] uppercase">
          <span>orders</span>
          <span>schema</span>
        </div>
        {rows.map(([field, type], i) => (
          <motion.div
            key={field}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="flex items-center justify-between border-b border-white/[0.06] px-3 py-[7px] font-mono text-[10px] last:border-b-0"
          >
            <span className="text-ink/85">{field}</span>
            <span className="text-faint">{type}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Deploy({ d }: { d: HeroDict }) {
  const steps = d.pipelineDeploy;

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={rise}
          className="flex items-center gap-2.5 font-mono text-[11px]"
        >
          <motion.span
            // Emerald, not the stage's categorical rose: a tick beside "Build
            // passed" is a status, and green/red carry meaning no palette
            // decision gets to override.
            className="border-tone-emerald/60 bg-tone-emerald/15 flex h-4 w-4 items-center justify-center rounded-full border"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{
              delay: i * 0.07 + 0.15,
              ...({ type: "spring", stiffness: 400, damping: 18 } as const),
            }}
          >
            <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden="true">
              <path
                d="M1.5 5.2 4 7.5 8.5 2.5"
                fill="none"
                stroke="#34d399"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
          <span className="text-muted">{step}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Live({ d }: { d: HeroDict }) {
  const bars = [38, 62, 45, 78, 56, 88, 70];
  const tiles = d.pipelineTiles;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-tone-emerald h-2 w-2 rounded-full" />
          <span className="text-ink font-mono text-[10px] tracking-wider">
            ORDERS
          </span>
        </div>
        <span className="text-faint font-mono text-[9px] tracking-wider uppercase">
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tiles.map((label, i) => (
          <motion.div
            key={label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2"
          >
            <p className="text-faint font-mono text-[8px] tracking-wider uppercase">
              {label}
            </p>
            {/* Deliberately a shape, not a number — no invented metrics. */}
            <div className="mt-1.5 h-2 w-2/3 rounded-full bg-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-white/10 bg-white/[0.025] p-2.5">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{
              delay: 0.2 + i * 0.05,
              duration: 0.5,
              ease: EASE_OUT_EXPO,
            }}
            className={`flex-1 rounded-sm ${
              i === bars.length - 1
                ? "bg-tone-emerald"
                : i === bars.length - 2
                  ? "bg-tone-emerald/50"
                  : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export const stageVisuals: Record<
  StageId,
  (props: { d: HeroDict }) => React.JSX.Element
> = {
  idea: Idea,
  architecture: Architecture,
  interface: Interface,
  code: Code,
  ai: Ai,
  data: Data,
  deploy: Deploy,
  live: Live,
};
