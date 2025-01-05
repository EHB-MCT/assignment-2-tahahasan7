/**
 * Core type definitions for the application.
 */

/**
 * Represents the various categories an expense can belong to.
 */
export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Entertainment"
  | "Shopping"
  | "Health"
  | "Other";

/**
 * Represents the time period for a budget limit, either monthly or yearly.
 */
export type BudgetPeriod = "monthly" | "yearly";

/**
 * Represents an individual expense record.
 *
 * @typedef {Object} Expense
 * @property {string} id - The unique identifier for the expense.
 * @property {string} [user_id] - The ID of the user who created the expense (optional).
 * @property {number} amount - The monetary amount of the expense.
 * @property {Category} category - The category the expense belongs to.
 * @property {string} description - A description of the expense.
 * @property {string} date - The date the expense occurred (ISO format).
 * @property {string} [created_at] - The timestamp of when the expense was created (optional, ISO format).
 */
export type Expense = {
  id: string;
  user_id?: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  created_at?: string;
};

/**
 * Represents a new expense being created, excluding system-generated properties.
 *
 * @typedef {Object} NewExpense
 * @see Expense
 */
export type NewExpense = Omit<Expense, "id" | "user_id" | "created_at">;

/**
 * Represents the budget limit configuration for a user and a category.
 *
 * @typedef {Object} BudgetLimit
 * @property {string} id - The unique identifier for the budget limit.
 * @property {string} user_id - The ID of the user who owns the budget limit.
 * @property {Category} category - The category the budget applies to.
 * @property {number} amount - The maximum allowed spending amount for the category.
 * @property {BudgetPeriod} period - The time period for the budget (monthly or yearly).
 * @property {string} [created_at] - The timestamp of when the budget limit was created (optional, ISO format).
 */
export type BudgetLimit = {
  id: string;
  user_id: string;
  category: Category;
  amount: number;
  period: BudgetPeriod;
  created_at?: string;
};

/**
 * Represents a new budget limit being created, excluding system-generated properties.
 *
 * @typedef {Object} NewBudgetLimit
 * @see BudgetLimit
 */
export type NewBudgetLimit = Omit<BudgetLimit, "id" | "user_id" | "created_at">;
