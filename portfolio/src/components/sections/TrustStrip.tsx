import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

import type { Dictionary } from "@/i18n";
import { tones, type Tone } from "@/lib/tones";

/**
 * The quiet credibility line under the hero.
 *
 * The first place a real client is named (Testimonials names it again,
 * later, with a quote attached). Stated plainly with no metrics attached —
 * because no metrics have been substantiated. A vague "trusted by industry
 * leaders" would be worth less than one true sentence.
 */
// Chips cycle the palette in the same order the categories are listed, so the
// strip reads as a set of distinct things rather than one grey blur.
const CHIP_TONES: Tone[] = ["amber", "emerald", "violet", "cyan", "rose"];

export function TrustStrip({ d }: { d: Dictionary["trust"] }) {
  return (
    <div className="border-hairline hairline-t border-b py-7">
      <Container>
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-muted text-[14px] md:max-w-md">
            {d.text}
          </p>

          <ul className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {d.categories.map((category, i) => {
              const tone = tones[CHIP_TONES[i % CHIP_TONES.length]];
              return (
                <li
                  key={category}
                  className={`${tone.border} ${tone.soft} ${tone.text} rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase`}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
