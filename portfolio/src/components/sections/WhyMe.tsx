import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  Eyebrow,
  Section,
  SectionLede,
  SectionTitle,
} from "@/components/ui/Section";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

/**
 * Differentiation.
 *
 * Every claim here is structural — true because of how a one-person engagement
 * works, not because of a statistic that would need proving. That is the whole
 * design: a buyer can verify each of these from the shape of the deal itself,
 * which is why none of them need a number attached.
 */
export function WhyMe({
  d,
}: {
  d: Dictionary["whyMe"];
}) {
  return (
    <Section id="why">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal className="max-w-3xl">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <SectionTitle className="mt-5">{d.title}</SectionTitle>
          <SectionLede className="mt-6">{d.lede}</SectionLede>
          {d.kicker && (
            <p className="text-ink mt-5 text-[17px] font-medium">{d.kicker}</p>
          )}
        </Reveal>

        <RevealGroup as="ul" gap={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {d.items.map((item) => (
            <RevealItem
              as="li"
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-white/5 bg-surface/30 p-8 transition-colors hover:bg-surface/50"
            >
              <div>
                <h3 className="text-ink text-[1.25rem] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
                  {item.body}
                </p>
              </div>

              <div className="mt-10 border-t border-white/5 pt-6">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${site.contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.15em] text-faint transition-colors hover:text-ink uppercase"
                >
                  HIRE ME
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 transition-transform duration-300 group-hover:bg-white/10 group-hover:translate-x-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
