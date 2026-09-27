"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Persistent one-tap contact bar for small screens.
 *
 * On mobile the CTA at the top of the page scrolls away and is effectively gone
 * for the rest of the visit. This keeps calling, messaging and emailing one
 * thumb-reach away at every point after the hero — which is where most small
 * business enquiries actually come from.
 *
 * Hidden until past the hero so it never competes with the primary CTA.
 */
export function MobileContactBar({ d }: { d: Dictionary["quickContact"] }) {
  const [shown, setShown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setShown(value > 700);
  });

  const actions = [
    {
      label: d.call,
      href: site.contact.phoneHref,
      icon: (
        <path
          d="M3.2 4.8c0-.9.7-1.6 1.6-1.6h1.3c.5 0 .9.3 1 .8l.5 2c.1.4 0 .8-.3 1l-.9.7c.8 1.6 2.1 2.9 3.7 3.7l.7-.9c.2-.3.6-.4 1-.3l2 .5c.5.1.8.5.8 1v1.3c0 .9-.7 1.6-1.6 1.6C7.6 14.6 3.2 10.2 3.2 4.8Z"
          fill="currentColor"
        />
      ),
    },
    {
      label: d.whatsapp,
      href: site.contact.whatsappHref,
      icon: (
        <path
          d="M9 2.2a6.8 6.8 0 0 0-5.8 10.3l-.9 3.3 3.4-.9A6.8 6.8 0 1 0 9 2.2Zm3.9 9.6c-.2.5-1 .9-1.4.9-.4 0-.8.2-2.6-.6-2.2-1-3.6-3.3-3.7-3.4-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.3.4-.2.2c-.1.1-.2.2 0 .4.1.3.6 1 1.2 1.6.8.7 1.4.9 1.7 1 .2.1.3.1.4 0l.6-.7c.2-.2.3-.1.5-.1l1.4.7c.2.1.4.2.4.3.1.1.1.5 0 .9Z"
          fill="currentColor"
        />
      ),
    },
    {
      label: d.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${site.contact.email}`,
      icon: (
        <path
          d="M2.5 5.2c0-.8.7-1.5 1.5-1.5h10c.8 0 1.5.7 1.5 1.5v7.6c0 .8-.7 1.5-1.5 1.5H4c-.8 0-1.5-.7-1.5-1.5V5.2Zm1.9-.1L9 8.5l4.6-3.4H4.4Z"
          fill="currentColor"
        />
      ),
    },
  ];

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="border-hairline bg-canvas/92 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="grid grid-cols-3">
            {actions.map((action, index) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`text-muted active:text-accent flex min-h-[58px] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  index < actions.length - 1 ? "border-hairline border-r" : ""
                }`}
              >
                <svg
                  viewBox="0 0 18 18"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  {action.icon}
                </svg>
                {action.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
