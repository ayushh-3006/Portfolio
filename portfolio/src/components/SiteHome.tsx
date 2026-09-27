import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { Nav } from "@/components/layout/Nav";
import { CapabilityMap } from "@/components/sections/CapabilityMap";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Projects } from "@/components/sections/Projects";
import { WhyMe } from "@/components/sections/WhyMe";
import { StructuredData } from "@/components/StructuredData";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { getDictionary, type Locale } from "@/i18n";

/**
 * The page, in one language.
 *
 * Both locale routes render this with a different dictionary, so the two
 * versions can never drift structurally — there is exactly one layout.
 *
 * Section order follows the buyer's progression, not a feature list:
 * attention → recognition → capability → reassurance → credibility →
 * method → differentiation → proof of craft (Testimonials) → value → action.
 *
 * Problems comes before Services deliberately. A visitor has to see their own
 * situation described before they will care what anyone can build.
 */
export function SiteHome({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);

  return (
    /*
     * `lang` sits on this wrapper rather than <html>, because both locales
     * share one root layout and a layout cannot know which route rendered it
     * without middleware. Per the HTML spec a `lang` on any element governs
     * its subtree, so screen readers switch voice correctly here; search
     * engines get the language from the hreflang alternates and og:locale in
     * `lib/metadata.ts`.
     */
    <div lang={locale} className="flex min-h-dvh flex-col">
      <StructuredData locale={locale} dict={d} />
      <ScrollProgress />
      <Nav d={d.nav} locale={locale} />
      <main id="main" className="flex-1">
        <Hero d={d.hero} profile={d.profile} locale={locale} />
        <TrustStrip d={d.trust} />
        <Problems d={d.problems} />
        <Projects d={d.projects} />
        <CapabilityMap d={d.capabilities} />
        <WhyMe d={d.whyMe} />
        <Contact d={d.contact} profile={d.profile} locale={locale} />
      </main>
      <Footer d={d.footer} profile={d.profile} locale={locale} />
      <MobileContactBar d={d.quickContact} />
    </div>
  );
}
