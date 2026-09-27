import Link from "next/link";
import { localeMeta, localePath, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * English / हिन्दी toggle.
 *
 * Real links to real URLs, not a client-side state swap — so each language is
 * bookmarkable, shareable and crawlable, and the switch works with JavaScript
 * disabled. `hrefLang` tells crawlers what sits on the other end.
 *
 * The active locale is rendered as a non-interactive span: a link to the page
 * you are already on is noise for keyboard and screen-reader users.
 */
export function LanguageSwitch({
  current,
  className,
  label,
}: {
  current: Locale;
  className?: string;
  label: string;
}) {
  return (
    <div
      className={cn(
        "border-hairline flex items-center rounded-full border p-0.5",
        className,
      )}
      role="group"
      aria-label={label}
    >
      {locales.map((locale) => {
        const meta = localeMeta[locale];
        const isActive = locale === current;

        if (isActive) {
          return (
            <span
              key={locale}
              aria-current="true"
              className="bg-ink/10 text-ink rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider"
            >
              {meta.shortLabel}
            </span>
          );
        }

        return (
          <Link
            key={locale}
            href={localePath(locale)}
            hrefLang={meta.htmlLang}
            lang={meta.htmlLang}
            aria-label={meta.label}
            className="text-muted hover:text-ink rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors"
          >
            {meta.shortLabel}
          </Link>
        );
      })}
    </div>
  );
}
