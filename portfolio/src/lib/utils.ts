/** Minimal class joiner. Avoids pulling in clsx/tailwind-merge for what is
 *  genuinely a three-line problem. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
