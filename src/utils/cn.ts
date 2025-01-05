/**
 * Utility for conditionally joining CSS class names together.
 *
 * @param {...(string | undefined)[]} classes - An array of class names, which may include undefined values.
 * @returns {string} - A single string with valid class names joined by a space.
 */
export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
