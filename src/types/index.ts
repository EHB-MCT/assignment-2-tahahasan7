export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Entertainment"
  | "Shopping"
  | "Health"
  | "Other";

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
