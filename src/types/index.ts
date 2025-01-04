export type Expense = {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
};

export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Entertainment"
  | "Shopping"
  | "Health"
  | "Other";