/**
 * Expense management module.
 * Provides functions for CRUD operations on expenses.
 *
 * @module lib/expenses
 */

import type { Expense, NewExpense } from "../types";
import { supabase } from "./supabase";

/**
 * Fetches all expenses for a specific user.
 *
 * @param userId - The ID of the user whose expenses to fetch
 * @returns Promise resolving to an array of expenses
 * @throws Will throw an error if the database query fails
 */
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

/**
 * Adds a new expense for a user.
 *
 * @param expense - The expense data to add
 * @param userId - The ID of the user creating the expense
 * @returns Promise resolving to the created expense
 * @throws Will throw an error if the database insert fails
 */
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

/**
 * Updates an existing expense.
 *
 * @param expense - The updated expense data
 * @param userId - The ID of the user who owns the expense
 * @returns Promise resolving to the updated expense
 * @throws Will throw an error if the database update fails
 */
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

/**
 * Deletes an expense.
 *
 * @param expenseId - The ID of the expense to delete
 * @param userId - The ID of the user who owns the expense
 * @throws Will throw an error if the database delete fails
 */
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
