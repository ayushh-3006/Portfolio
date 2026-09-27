/**
 * Categorical colour.
 *
 * Each service, capability and problem gets a fixed hue, keyed by the stable
 * `id` in the dictionaries. The ids are identical across locales, so a card is
 * the same colour on the English and Hindi pages — and the same idea keeps its
 * colour wherever it reappears (AI is violet in the services grid, in the
 * capability map and in the hero pipeline).
 *
 * Blue is deliberately scarce here. It belongs to interaction — CTAs, links,
 * focus rings — so using it as decoration anywhere else would blunt the one
 * signal the page relies on to get clicked.
 *
 * Class strings are written out in full because Tailwind scans source text and
 * cannot resolve a class name assembled at runtime.
 */

export type Tone = "cyan" | "violet" | "amber" | "emerald" | "rose" | "blue";

type ToneStyle = {
  /** Label / index text. */
  text: string;
  /** Small solid marks: bullets, dots, rules. */
  bg: string;
  /** Hairline borders and chips. */
  border: string;
  /** Tinted fill for chips and badges. */
  soft: string;
  /** Group-hover fill. Written out in full: Tailwind cannot generate a variant
   *  it never sees as literal text, so `group-hover:${tone.bg}` silently
   *  produces no CSS at all. */
  hoverBg: string;
  /** Raw colour, for gradients and inline SVG that can't take a class. */
  hex: string;
};

export const tones: Record<Tone, ToneStyle> = {
  cyan: {
    text: "text-tone-cyan",
    bg: "bg-tone-cyan",
    border: "border-tone-cyan/40",
    soft: "bg-tone-cyan/12",
    hoverBg: "group-hover:bg-tone-cyan",
    hex: "#22d3ee",
  },
  violet: {
    text: "text-tone-violet",
    bg: "bg-tone-violet",
    border: "border-tone-violet/40",
    soft: "bg-tone-violet/12",
    hoverBg: "group-hover:bg-tone-violet",
    hex: "#a78bfa",
  },
  amber: {
    text: "text-tone-amber",
    bg: "bg-tone-amber",
    border: "border-tone-amber/40",
    soft: "bg-tone-amber/12",
    hoverBg: "group-hover:bg-tone-amber",
    hex: "#fbbf24",
  },
  emerald: {
    text: "text-tone-emerald",
    bg: "bg-tone-emerald",
    border: "border-tone-emerald/40",
    soft: "bg-tone-emerald/12",
    hoverBg: "group-hover:bg-tone-emerald",
    hex: "#34d399",
  },
  rose: {
    text: "text-tone-rose",
    bg: "bg-tone-rose",
    border: "border-tone-rose/40",
    soft: "bg-tone-rose/12",
    hoverBg: "group-hover:bg-tone-rose",
    hex: "#fb7185",
  },
  blue: {
    text: "text-accent",
    bg: "bg-accent",
    border: "border-accent/40",
    soft: "bg-accent/12",
    hoverBg: "group-hover:bg-accent",
    hex: "#3d7bff",
  },
};

/** Services grid, keyed by `services.items[].id`. */
export const serviceTones: Record<string, Tone> = {
  web: "cyan",
  ai: "violet",
  business: "amber",
  mobile: "emerald",
  automation: "rose",
  custom: "blue",
};

/** Capability map, keyed by `capabilities.groups[].id`. Matches the services
 *  above wherever the two overlap, so AI stays violet in both. */
export const capabilityTones: Record<string, Tone> = {
  languages: "cyan",
  frontend: "violet",
  backend: "amber",
  database: "emerald",
  ai: "rose",
  tools: "blue",
};

/** Problem → solution list, keyed by `problems.items[].id`. */
export const problemTones: Record<string, Tone> = {
  spreadsheets: "amber",
  manual: "emerald",
  idea: "violet",
  ai: "cyan",
  fit: "rose",
  scale: "blue",
};

/** Hero pipeline stages, keyed by `STAGE_IDS`. The sequence walks warm → cool
 *  so the panel visibly changes temperature as an idea becomes a product. */
export const stageTones: Record<string, Tone> = {
  idea: "amber",
  architecture: "cyan",
  interface: "violet",
  code: "blue",
  ai: "violet",
  data: "emerald",
  deploy: "rose",
  live: "emerald",
};

export function toneFor(map: Record<string, Tone>, id: string): ToneStyle {
  return tones[map[id] ?? "blue"];
}
