import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  Eyebrow,
  Section,
  SectionLede,
  SectionTitle,
} from "@/components/ui/Section";
import type { Dictionary } from "@/i18n";
import { capabilityTones, toneFor } from "@/lib/tones";

/**
 * "I've built across the stack" — what stands in for a portfolio grid.
 *
 * Deliberately static where the neighbouring sections are interactive. After
 * two sections of things that respond to you, a plain, dense, confident list
 * reads as substance. Making this one clickable too would turn a credibility
 * claim into another toy.
 */
export function CapabilityMap({ d }: { d: Dictionary["capabilities"] }) {
  return (
    <Section id="capabilities" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(167,139,250,0.10),transparent_70%),radial-gradient(50%_90%_at_15%_10%,rgba(34,211,238,0.07),transparent_70%),radial-gradient(50%_90%_at_85%_10%,rgba(251,191,36,0.06),transparent_70%)]"
      />
      <Reveal className="mx-auto flex flex-col items-center text-center">
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">{d.title}</SectionTitle>
        <SectionLede className="mx-auto mt-6">{d.lede}</SectionLede>
      </Reveal>

      <RevealGroup
        as="ul"
        gap={0.1}
        className="mx-auto mt-20 flex max-w-5xl flex-col gap-10 md:gap-14"
      >
        {d.groups.map((group) => {
          const tone = toneFor(capabilityTones, group.id);
          return (
            <RevealItem
              as="li"
              key={group.id}
              className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-12"
            >
              <div className="shrink-0 text-center md:w-44 md:pt-3 md:text-right">
                <h3 className="text-[18px] font-semibold tracking-wide text-ink/90">
                  {group.label}
                </h3>
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group relative cursor-default overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[15.5px] font-medium text-ink transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  >
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      aria-hidden="true"
                    />
                    {/* Slightly larger accent dot */}
                    <span className={`inline-block w-2 h-2 rounded-full ${tone.bg} mr-3 opacity-60 transition-opacity group-hover:opacity-100 shadow-[0_0_8px_${tone.hex}]`} />
                    <span className="relative z-10">{item}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
