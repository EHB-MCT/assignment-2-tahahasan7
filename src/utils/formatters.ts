/**
 * Utility functions for formatting data.
 *
 * @module utils/formatters
 */

/**
 * Currency formatter instance for EUR
 */
const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

/**
 * Formats a number as a currency string in EUR.
 *
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "123,45 €")
 */
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

/**
 * Formats a date string into a human-readable format.
 *
 * @param dateString - ISO date string to format
 * @returns Formatted date string (e.g., "Jan 1, 2024")
 */
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};
