import type { Metadata } from "next";
import { site } from "@/config/site";
import { getDictionary, localePath, locales, type Locale } from "@/i18n";

/**
 * Per-locale metadata.
 *
 * The `languages` map emits hreflang alternates, which is what tells a search
 * engine these two URLs are the same page in different languages rather than
 * duplicate content competing with each other.
 */
export function buildMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  const path = localePath(locale);

  const languages = Object.fromEntries(
    locales.map((code) => [code, localePath(code)]),
  );

  return {
    title: { default: d.meta.title, template: `%s — ${site.name}` },
    description: d.meta.description,
    keywords: d.meta.keywords,
    alternates: {
      canonical: path,
      languages: { ...languages, "x-default": localePath("en") },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: d.meta.title,
      description: d.meta.description,
      locale: locale === "hi" ? "hi_IN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
    },
  };
}
