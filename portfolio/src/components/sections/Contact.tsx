import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionTitle } from "@/components/ui/Section";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";

/**
 * Contact.
 *
 * Three routes out — form, phone, email — because different buyers convert
 * through different channels: founders type, small business owners call.
 * Making someone use the channel you prefer is a good way to lose them.
 */
export function Contact({
  d,
  profile,
}: {
  d: Dictionary["contact"];
  profile: Dictionary["profile"];
  locale: Locale;
}) {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(167,139,250,0.10),transparent_70%),radial-gradient(50%_90%_at_15%_10%,rgba(34,211,238,0.07),transparent_70%),radial-gradient(50%_90%_at_85%_10%,rgba(251,191,36,0.06),transparent_70%)]"
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center rounded-[2.5rem] border border-white/10 bg-surface/40 px-6 py-16 md:p-20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Subtle top glare effect for the box */}
        <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Subtle bottom glare */}
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Reveal>
          <SectionTitle>{d.title}</SectionTitle>
          <p className="text-muted mt-6 text-[clamp(1.0625rem,1.5vw,1.1875rem)] leading-relaxed">
            {d.lede}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${site.contact.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#7C3AED] px-8 py-4 font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-all hover:bg-[#6D28D9] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>{site.contact.email}</span>
          </a>
        </Reveal>

        <Reveal delay={0.12} className="mt-16">
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:bg-white/10 hover:text-ink"
                  aria-label={social.label}
                >
                  {social.label === "LinkedIn" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ) : social.label === "GitHub" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  ) : social.label === "Twitter" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ) : social.label === "Email" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ) : social.label === "Resume" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-6" />
                      <path d="m9 15 3 3 3-3" />
                    </svg>
                  ) : (
                    <span className="text-[11px] font-medium tracking-wider">
                      {(social as { label: string }).label.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
