/**
 * Budget limits management module.
 * Provides functions for CRUD operations on budget limits.
 */

import type { BudgetLimit, NewBudgetLimit } from "../types";
import { supabase } from "./supabase";

/**
 * Fetches all budget limits for a specific user, ordered by category.
 *
 * @param {string} userId - The ID of the user whose budget limits are to be fetched.
 * @returns {Promise<BudgetLimit[]>} - A promise that resolves to an array of budget limits.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function fetchUserBudgetLimits(
  userId: string
): Promise<BudgetLimit[]> {
  const { data, error } = await supabase
    .from("budget_limits")
    .select("*")
    .eq("user_id", userId)
    .order("category");

  if (error) {
    console.error("Error fetching budget limits:", error);
    throw error;
  }

  return data || [];
}

/**
 * Adds a new budget limit for a specific user.
 *
 * @param {NewBudgetLimit} budgetLimit - The budget limit details to add.
 * @param {string} userId - The ID of the user for whom the budget limit is being added.
 * @returns {Promise<BudgetLimit>} - A promise that resolves to the created budget limit.
 * @throws {Error} - Throws an error if the insert operation fails.
 */
export async function addBudgetLimit(
  budgetLimit: NewBudgetLimit,
  userId: string
): Promise<BudgetLimit> {
  const { data, error } = await supabase
    .from("budget_limits")
    .insert([{ ...budgetLimit, user_id: userId }])
    .select()
    .single();

  if (error) {
    console.error("Error adding budget limit:", error);
    throw error;
  }

  return data;
}

/**
 * Updates an existing budget limit for a specific user.
 *
 * @param {BudgetLimit} budgetLimit - The updated budget limit details.
 * @param {string} userId - The ID of the user who owns the budget limit.
 * @returns {Promise<BudgetLimit>} - A promise that resolves to the updated budget limit.
 * @throws {Error} - Throws an error if the update operation fails.
 */
export async function updateBudgetLimit(
  budgetLimit: BudgetLimit,
  userId: string
): Promise<BudgetLimit> {
  const { data, error } = await supabase
    .from("budget_limits")
    .update({
      amount: budgetLimit.amount,
      period: budgetLimit.period,
    })
    .eq("id", budgetLimit.id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating budget limit:", error);
    throw error;
  }

  return data;
}

/**
 * Deletes a budget limit for a specific user.
 *
 * @param {string} budgetLimitId - The ID of the budget limit to delete.
 * @param {string} userId - The ID of the user who owns the budget limit.
 * @returns {Promise<void>} - A promise that resolves when the budget limit is deleted.
 * @throws {Error} - Throws an error if the delete operation fails.
 */
export async function deleteBudgetLimit(
  budgetLimitId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("budget_limits")
    .delete()
    .eq("id", budgetLimitId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting budget limit:", error);
    throw error;
  }
}
