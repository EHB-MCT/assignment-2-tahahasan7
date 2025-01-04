/**
 * Core type definitions for the application.
 *
 * @module types
 */

/**
 * Valid expense categories.
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
 * Represents a complete expense record.
 */
export type Expense = {
  /** Unique identifier for the expense */
  id: string;
  /** ID of the user who created the expense */
  user_id?: string;
  /** Amount of the expense */
  amount: number;
  /** Category of the expense */
  category: Category;
  /** Description of the expense */
  description: string;
  /** Date of the expense */
  date: string;
  /** Timestamp when the expense was created */
  created_at?: string;
};

/**
 * Represents a new expense being created.
 * Omits system-generated fields from the Expense type.
 */
export type NewExpense = Omit<Expense, "id" | "user_id" | "created_at">;
