import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Is the configured portrait actually on disk?
 *
 * This is a server component, so the check runs at build time and costs nothing
 * at runtime. It means the section renders cleanly with no photo until the file
 * is added, and starts showing it the moment it is — instead of a broken image
 * circle in the meantime. Rebuild (or just reload in dev) after adding it.
 */
function portraitExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), "public", src));
}

/**
 * The one photo on the site.
 *
 * A page that argues "you are hiring one person, not an agency" is stronger
 * when that person has a face. It sits in the differentiation section rather
 * than the hero on purpose: as a hero it would read as a personal-brand page,
 * but next to "you'd otherwise be hiring five people" it makes the claim
 * literal at the exact moment it's being made.
 *
 * Renders nothing if no portrait is configured, so the layout never breaks
 * around a missing file.
 */
export function Portrait({
  d,
  className,
}: {
  d: Dictionary["profile"];
  className?: string;
}) {
  const { portrait, name } = site;
  if (!portrait.src || !portraitExists(portrait.src)) return null;

  return (
    <figure className={cn("flex items-center gap-4", className)}>
      <div className="border-hairline-strong relative h-16 w-16 shrink-0 overflow-hidden rounded-full border">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="64px"
          // Face sits high in a standing shot; a centre crop would decapitate it.
          style={{ objectFit: "cover", objectPosition: portrait.focus }}
          priority={false}
        />
      </div>
      <figcaption>
        <p className="text-ink text-[15px] font-medium">{name}</p>
        <p className="text-faint mt-0.5 text-[13px]">{d.role}</p>
      </figcaption>
    </figure>
  );
}
