import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to gain from indexing the enquiry endpoint, and the admin
      // panel must never surface in results. `/admin` also sets
      // `robots: noindex` in its own metadata — robots.txt stops polite
      // crawlers reaching it, the meta tag stops any that get there anyway.
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
