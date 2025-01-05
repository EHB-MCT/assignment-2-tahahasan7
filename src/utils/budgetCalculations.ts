/**
 * Utility functions for budget calculations and warnings.
 */

import type { Expense } from "../types";

/**
 * Calculates the total amount spent in a specific category for a given time period.
 *
 * @param {Expense[]} expenses - The list of expenses to analyze.
 * @param {string} category - The category to filter expenses by.
 * @param {"monthly" | "yearly"} period - The time period to consider: "monthly" or "yearly".
 * @returns {number} - The total amount spent in the specified category and period.
 */
export function calculateSpentAmount(
  expenses: Expense[],
  category: string,
  period: "monthly" | "yearly"
): number {
  const now = new Date();
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    if (expense.category !== category) return false;

    if (period === "monthly") {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    } else {
      return expenseDate.getFullYear() === now.getFullYear();
    }
  });

  return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * Determines the budget warning level based on the amount spent and the budget limit.
 *
 * @param {number} spent - The total amount spent.
 * @param {number} limit - The budget limit.
 * @returns {"none" | "warning" | "danger"} - The warning level:
 *   - "none": Spending is within safe limits.
 *   - "warning": Spending has reached or exceeded 80% of the limit.
 *   - "danger": Spending has reached or exceeded 100% of the limit.
 */
export function getBudgetWarningLevel(
  spent: number,
  limit: number
): "none" | "warning" | "danger" {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return "danger";
  if (percentage >= 80) return "warning";
  return "none";
}
