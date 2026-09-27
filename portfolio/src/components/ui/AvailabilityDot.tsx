import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Live availability signal.
 *
 * Small but load-bearing: it answers "is this person actually around?" before
 * the visitor has to ask, and the stated limit does the work that a fake
 * scarcity banner would otherwise be reaching for.
 *
 * The on/off switch stays in config (it's a fact, not copy); the words come
 * from the dictionary so the Hindi page doesn't drop into English here.
 */
export function AvailabilityDot({
  d,
  className,
  showDetail = false,
}: {
  d: Dictionary["profile"];
  className?: string;
  showDetail?: boolean;
}) {
  if (!site.availability.open) return null;

  return (
    <span
      className={cn(
        // flex-wrap with a matching row gap: in a narrow column the label and
        // the detail have to break onto separate lines cleanly rather than
        // colliding around the dot.
        "text-muted inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] tracking-[0.14em] uppercase",
        className,
      )}
    >
      <span className="availability-ping relative inline-flex h-1.5 w-1.5 shrink-0">
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
      </span>
      <span className="text-ink/80">{d.availabilityLabel}</span>
      {showDetail && d.availabilityDetail && (
        <span className="text-faint">— {d.availabilityDetail}</span>
      )}
    </span>
  );
}
