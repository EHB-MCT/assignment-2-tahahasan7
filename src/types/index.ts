/**
 * Core type definitions for the application.
 */

export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Entertainment"
  | "Shopping"
  | "Health"
  | "Other";

export type BudgetPeriod = "monthly" | "yearly";

export type Expense = {
  id: string;
  user_id?: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  created_at?: string;
};

export type NewExpense = Omit<Expense, "id" | "user_id" | "created_at">;

export type BudgetLimit = {
  id: string;
  user_id: string;
  category: Category;
  amount: number;
  period: BudgetPeriod;
  created_at?: string;
};

export type NewBudgetLimit = Omit<BudgetLimit, "id" | "user_id" | "created_at">;
