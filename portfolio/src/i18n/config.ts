/**
 * Locale configuration.
 *
 * English lives at `/`, Hindi at `/hi`. Route-based rather than a client-side
 * toggle so both versions are statically rendered, independently crawlable and
 * linkable — a language switcher that only swaps strings in the browser is
 * invisible to search engines, which defeats half the reason to translate.
 */

export const locales = ["en", "hi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Path prefix for a locale. The default locale is unprefixed. */
export function localePath(locale: Locale, hash = ""): string {
  const base = locale === defaultLocale ? "/" : `/${locale}`;
  return hash ? `${base}${hash}` : base;
}

export const localeMeta: Record<
  Locale,
  { label: string; shortLabel: string; htmlLang: string }
> = {
  en: { label: "English", shortLabel: "EN", htmlLang: "en" },
  hi: { label: "हिन्दी", shortLabel: "हिं", htmlLang: "hi" },
};
