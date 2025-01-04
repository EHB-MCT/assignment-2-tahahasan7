import type { Expense, NewExpense } from "../types";
import { supabase } from "./supabase";

export async function fetchUserExpenses(userId: string): Promise<Expense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }

  return data || [];
}

export async function addExpense(
  expense: NewExpense,
  userId: string
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        ...expense,
        user_id: userId,
        amount: Number(expense.amount),
        category: expense.category,
        date: new Date(expense.date).toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding expense:", error);
    throw error;
  }

  return data;
}

export async function updateExpense(
  expense: Expense,
  userId: string
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .update({
      amount: Number(expense.amount),
      category: expense.category,
      description: expense.description,
      date: new Date(expense.date).toISOString(),
    })
    .eq("id", expense.id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating expense:", error);
    throw error;
  }

  return data;
}

export async function deleteExpense(
  expenseId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
}
