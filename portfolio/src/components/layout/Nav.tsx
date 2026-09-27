"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { localePath } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Nav({ d, locale }: { d: Dictionary["nav"]; locale: Locale }) {
  const links = d.links;
  const home = localePath(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Subscribed rather than stated so the nav doesn't re-render on every pixel.
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  const [activeLink, setActiveLink] = useState("#top");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = links.map((link) => link.href.substring(1));
      let currentSection = "#top";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 150px provides a nice offset just below the header
          if (rect.top <= 150) {
            currentSection = `#${id}`;
          }
        }
      }

      // Automatically select the last section if scrolled to the absolute bottom
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        currentSection = links[links.length - 1].href;
      }

      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-hairline bg-canvas/80 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-20 md:px-10"
      >
        <a
          href={`${home}#top`}
          className="group flex items-center gap-3 py-3 text-[15px] font-medium tracking-tight"
        >
          {site.portrait.src ? (
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              width={48}
              height={48}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ objectPosition: site.portrait.focus }}
            />
          ) : (
            <span className="bg-accent inline-block h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125" />
          )}
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-hairline bg-canvas/40 px-2 py-1.5 backdrop-blur-md lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "block rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors duration-200",
                  activeLink === link.href
                    ? "bg-white/10 text-white"
                    : "text-muted hover:bg-white/5 hover:text-ink",
                )}
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const link = document.createElement("a");
              link.href = "/resume.pdf";
              link.download = "Ayush_Kumar_Singh_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[12px] font-bold tracking-widest text-white uppercase transition-all hover:bg-white/[0.05] hover:border-white/40 sm:inline-flex"
          >
            READ RESUME
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? d.closeMenu : d.openMenu}
            className="border-hairline text-ink flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                className="bg-ink absolute left-0 block h-[1.5px] w-full rounded-full"
                animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              />
              <motion.span
                className="bg-ink absolute left-0 block h-[1.5px] w-full rounded-full"
                animate={
                  open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }
                }
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="border-hairline bg-canvas/95 overflow-hidden border-t backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-ink border-hairline block border-b py-4 text-[17px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setOpen(false);
                    const link = document.createElement("a");
                    link.href = "/resume.pdf";
                    link.download = "Ayush_Kumar_Singh_Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="text-accent block py-4 text-[17px] font-medium uppercase tracking-wider"
                >
                  READ RESUME
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
