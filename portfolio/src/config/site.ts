/**
 * Single source of truth for every personal fact on this site.
 *
 * Rule: nothing factual about Ayush may be hardcoded in a component. If a
 * number, claim, or contact detail appears on the page, it comes from here or
 * from `src/i18n/dictionaries`. That keeps the site honest and makes it
 * one place.
 */

export const site = {
  name: "Ayush Kumar Singh",
  url: "https://ayushkumarsingh.vercel.app", // Replace with your actual production domain

  /**
   * The file lives in `public/`. `focus` is the object-position used when the
   * image is cropped — the face sits above centre in a standing shot, so a
   * plain "center" crop would cut the head off.
   */
  portrait: {
    src: "/ayush.jpeg" as string | null,
    alt: "Ayush Kumar Singh",
    /** Square source, square container — centre is correct. Only matters if a
     *  non-square image is swapped in. */
    focus: "50% 50%",
  },

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/ayushh-3006",
    },
    {
      label: "Twitter",
      href: "https://x.com/Ayushkumar7974",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ayushkumarsingh-dev/",
    },
    {
      label: "Email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=ayushkumarsingh3006@gmail.com",
    },
    {
      label: "Resume",
      href: "/resume.pdf",
    },
  ] as { label: string; href: string }[],

  contact: {
    email: "ayushkumarsingh3006@gmail.com",
    phoneDisplay: "+91 7974 248 187",
    phoneHref: "tel:+917974248187",
    whatsappHref: "https://wa.me/917974248187",
  },

  location: {
    country: "IN",
  },

  availability: {
    /** Master switch. The words themselves live in the dictionaries. */
    open: true,
  },

  analytics: {
    gaId: "", // Google Analytics Measurement ID (leave empty to disable)
  },
} as const;

export type Site = typeof site;
