import { site } from "@/config/site";
import { localeMeta, type Dictionary, type Locale } from "@/i18n";

/**
 * JSON-LD for search engines.
 *
 * Person and ProfessionalService, because the buyer is hiring both a named
 * individual and a service. `areaServed: Worldwide` matters: without it, a
 * business with an Indian address gets read as a local-only supplier.
 *
 * Every value traces back to `config/site.ts` or the dictionary — structured
 * data is exactly where an invented review count or rating would be both
 * tempting and a policy violation, so there are none.
 */
export function StructuredData({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const url = site.url;
  const pageUrl = locale === "en" ? url : `${url}/${locale}`;

  const person = {
    "@type": "Person",
    "@id": `${url}#person`,
    name: site.name,
    jobTitle: dict.profile.role,
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phoneDisplay,
    url,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.location.country,
    },
    sameAs: site.socials.map((social) => social.href),
    knowsLanguage: Object.values(localeMeta).map((meta) => meta.htmlLang),
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": `${url}#service`,
    name: `${site.name} — ${dict.profile.role}`,
    description: dict.meta.description,
    url: pageUrl,
    inLanguage: localeMeta[locale].htmlLang,
    provider: { "@id": `${url}#person` },
    areaServed: { "@type": "Place", name: "Worldwide" },
    availableLanguage: Object.values(localeMeta).map((meta) => meta.htmlLang),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.projects.eyebrow,
      itemListElement: dict.projects.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
        },
      })),
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, service],
  };

  return (
    <script
      type="application/ld+json"
      // Content is built from local constants only — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
