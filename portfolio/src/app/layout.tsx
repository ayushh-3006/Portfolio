import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/config/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // No `h-full` on <html> and no min-h-full on <body>: combined with an
    // overflow rule on the body that makes *body* the scroll container, which
    // freezes window.scrollY and silently kills every scroll-linked effect.
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/*
          Motion serialises each entrance's initial state (opacity: 0 plus a
          transform) into the server-rendered HTML, so with scripting off the
          page would render almost entirely blank. For a page whose whole job
          is conversion, invisible content is the worst possible failure.
          A <noscript> stylesheet only applies when scripting is unavailable,
          which is exactly the condition we need to correct for.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
              [style*="opacity"]{opacity:1 !important}
              [style*="transform"]{transform:none !important}
            </style>`,
          }}
        />
      </head>
      <body className="bg-canvas text-ink">
        <a
          href="#main"
          className="focus:bg-accent-solid sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
      {/* Skipped entirely with no measurement ID set — see `site.analytics`. */}
      {site.analytics.gaId && <GoogleAnalytics gaId={site.analytics.gaId} />}
    </html>
  );
}
