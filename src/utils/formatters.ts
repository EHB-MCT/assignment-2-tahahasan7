/**
 * Utility functions for formatting data.
 *
 * @module utils/formatters
 */

/**
 * Currency formatter instance for formatting values in EUR.
 * Uses German locale ("de-DE") for formatting.
 */
const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

/**
 * Formats a numeric value as a currency string in EUR.
 *
 * @param {number} amount - The numeric amount to format.
 * @returns {string} - The formatted currency string (e.g., "123,45 €").
 */
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

/**
 * Formats an ISO date string into a human-readable format.
 *
 * @param {string} dateString - The ISO date string to format (e.g., "2024-01-01").
 * @returns {string} - The formatted date string (e.g., "Jan 1, 2024").
 */
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};
