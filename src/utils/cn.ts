/**
 * Utility for conditionally joining CSS class names together
 */
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
