import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-10", className)}
    >
      {children}
    </div>
  );
}

/**
 * Standard page section. Vertical rhythm is clamped rather than fixed so
 * spacing scales with the viewport instead of stepping at breakpoints.
 */
export function Section({
  id,
  children,
  className,
  bare = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Skip the container — for sections that manage their own full-bleed layout. */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative pt-6 pb-12 md:pt-8 md:pb-16",
        // The padding itself provides most of the space below the navbar. 
        // We only need a tiny scroll-margin so the content perfectly clears the header.
        id && "scroll-mt-0",
        className,
      )}
    >
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}

/** Small monospace label that opens a section. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-faint font-mono text-[11px] tracking-[0.2em] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Section heading. Sizes are fluid so the type never breaks between breakpoints. */
export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] font-medium",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionLede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-muted max-w-2xl text-[clamp(1rem,1.35vw,1.175rem)] leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}
