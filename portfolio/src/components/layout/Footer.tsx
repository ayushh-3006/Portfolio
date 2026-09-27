import { Container } from "@/components/ui/Section";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { localePath } from "@/i18n";

export function Footer({
  d,
  profile,
  locale,
}: {
  d: Dictionary["footer"];
  profile: Dictionary["profile"];
  locale: Locale;
}) {
  return (
    <footer className="border-hairline border-t py-12 lg:pb-12">
      {/* Extra bottom padding on mobile so the fixed contact bar never covers
          the footer links. */}
      <Container className="pb-20 lg:pb-0">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="text-ink flex items-center gap-2.5 text-[15px] font-medium">
              <span className="bg-accent inline-block h-2 w-2 rounded-full" />
              {site.name}
            </p>
            <p className="text-faint mt-3 max-w-xs text-[13px] leading-relaxed">
              {d.tagline}
            </p>
            <p className="text-faint mt-2 max-w-xs text-[13px] leading-relaxed">
              {profile.locationLabel}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="text-faint font-mono text-[10px] tracking-[0.18em] uppercase">
                {d.contactHeading}
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={site.contact.phoneHref}
                    className="text-muted hover:text-ink text-[14px] transition-colors"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${site.contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink text-[14px] transition-colors"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink text-[14px] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-faint font-mono text-[10px] tracking-[0.18em] uppercase">
                {d.elsewhereHeading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-ink text-[14px] transition-colors"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-hairline mt-12 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-faint text-[12px]">
            © {new Date().getFullYear()} {site.name}. {d.rights}
          </p>
          <a
            href={`${localePath(locale)}#top`}
            className="text-faint hover:text-muted text-[12px] transition-colors"
          >
            {d.backToTop} ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
