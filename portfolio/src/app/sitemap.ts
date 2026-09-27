import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { localePath, locales } from "@/i18n/config";

/**
 * Both language versions, each declaring the other as an alternate.
 *
 * Without the `alternates.languages` map a crawler can read `/` and `/hi` as
 * competing near-duplicates instead of one page in two languages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${site.url}${localePath(locale)}`]),
  );

  return locales.map((locale) => ({
    url: `${site.url}${localePath(locale)}`.replace(/\/$/, "") || site.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
