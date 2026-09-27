"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors duration-300 select-none";

const sizes = "h-12 px-6 md:h-[52px] md:px-7";

const variants: Record<Variant, string> = {
  // accent-solid, not accent: white on #3d7bff is only 3.84:1.
  primary: "bg-accent-solid text-white hover:bg-accent",
  secondary:
    "border border-hairline-strong text-ink hover:border-ink/40 hover:bg-white/[0.04]",
  ghost: "text-muted hover:text-ink",
};

/**
 * Magnetic button.
 *
 * The element leans toward the cursor within its own bounds — a small physical
 * cue that it is grabbable. Disabled on touch (no cursor to chase) and under
 * reduced motion, where it falls back to a plain button with identical layout.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const motionEnabled = useMotionEnabled();
  const magnetic = isDesktop && motionEnabled && !disabled;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  // The label trails the button slightly, which reads as weight rather than slide.
  const labelX = useTransform(springX, (value) => value * 0.35);
  const labelY = useTransform(springY, (value) => value * 0.35);

  function handleMove(event: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    // Clamped so the button never detaches from where it visually belongs.
    x.set(Math.max(-14, Math.min(14, offsetX * 0.32)));
    y.set(Math.max(-10, Math.min(10, offsetY * 0.4)));
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(base, sizes, variants[variant], className);

  const inner = (
    <motion.span
      className="pointer-events-none inline-flex items-center gap-2"
      style={magnetic ? { x: labelX, y: labelY } : undefined}
    >
      {children}
    </motion.span>
  );

  const style = magnetic ? { x: springX, y: springY } : undefined;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(classes, disabled && "cursor-not-allowed opacity-60")}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {inner}
    </motion.button>
  );
}

/** Arrow that nudges forward on hover of the parent `.group`. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1",
        className,
      )}
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
