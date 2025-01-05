/**
 * Budget limits management module.
 * Provides functions for CRUD operations on budget limits.
 */

import type { BudgetLimit, NewBudgetLimit } from "../types";
import { supabase } from "./supabase";

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
