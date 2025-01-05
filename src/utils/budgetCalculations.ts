/**
 * Utility functions for budget calculations and warnings
 */

import type { BudgetLimit, Expense } from "../types";

export function calculateSpentAmount(expenses: Expense[], category: string, period: 'monthly' | 'yearly'): number {
  const now = new Date();
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    if (expense.category !== category) return false;
    
    if (period === 'monthly') {
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    } else {
      return expenseDate.getFullYear() === now.getFullYear();
    }
  });

  return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function getBudgetWarningLevel(spent: number, limit: number): 'none' | 'warning' | 'danger' {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return 'danger';
  if (percentage >= 80) return 'warning';
  return 'none';
}