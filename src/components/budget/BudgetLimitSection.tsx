import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  addBudgetLimit,
  deleteBudgetLimit,
  fetchUserBudgetLimits,
  updateBudgetLimit,
} from "../../lib/budgetLimits";
import type { BudgetLimit, Category, NewBudgetLimit } from "../../types";
import { BudgetLimitForm } from "./BudgetLimitForm";
import { BudgetLimitList } from "./BudgetLimitList";

/**
 * A list of available categories for budget limits.
 * @type {Category[]}
 */
const categories: Category[] = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

/**
 * Props for the BudgetLimitSection component.
 * @typedef {Object} BudgetLimitSectionProps
 * @property {Array<{ id: string; description: string; category: Category; amount: number; date: string }>} expenses - The list of user expenses.
 */
type BudgetLimitSectionProps = {
  expenses: Array<{
    id: string;
    description: string;
    category: Category;
    amount: number;
    date: string;
  }>;
};

/**
 * The BudgetLimitSection component displays the user's budget limits and expenses.
 * It allows the user to add, update, and delete budget limits.
 *
 * @component
 * @param {BudgetLimitSectionProps} props - The properties passed to the component.
 * @param {Array} props.expenses - A list of expenses associated with the user.
 * @returns {JSX.Element} The rendered BudgetLimitSection component.
 */
export function BudgetLimitSection({ expenses }: BudgetLimitSectionProps) {
  const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadBudgetLimits();
    } else {
      setBudgetLimits([]);
    }
  }, [user]);

  /**
   * Loads the user's budget limits from the database.
   */
  const loadBudgetLimits = async () => {
    if (!user) return;
    try {
      const limits = await fetchUserBudgetLimits(user.id);
      setBudgetLimits(limits);
      setError(null);
    } catch (err) {
      setError("Failed to load budget limits");
      console.error("Error loading budget limits:", err);
    }
  };

  /**
   * Handles adding a new budget limit.
   * Checks if a limit for the category and period already exists.
   * @param {NewBudgetLimit} newBudgetLimit - The new budget limit to be added.
   */
  const handleAddBudgetLimit = async (newBudgetLimit: NewBudgetLimit) => {
    if (!user) return;

    // Check if a limit for this category and period already exists
    const existingLimit = budgetLimits.find(
      (limit) =>
        limit.category === newBudgetLimit.category &&
        limit.period === newBudgetLimit.period
    );

    if (existingLimit) {
      setError(
        `A ${newBudgetLimit.period} budget limit for ${newBudgetLimit.category} already exists`
      );
      return;
    }

    try {
      const budgetLimit = await addBudgetLimit(newBudgetLimit, user.id);
      setBudgetLimits((prev) => [...prev, budgetLimit]);
      setError(null);
    } catch (err) {
      setError("Failed to add budget limit");
      console.error("Error adding budget limit:", err);
    }
  };

  /**
   * Handles updating an existing budget limit.
   * @param {BudgetLimit} updatedLimit - The updated budget limit to be saved.
   */
  const handleUpdateBudgetLimit = async (updatedLimit: BudgetLimit) => {
    if (!user) return;

    try {
      const budgetLimit = await updateBudgetLimit(updatedLimit, user.id);
      setBudgetLimits((prev) =>
        prev.map((limit) => (limit.id === budgetLimit.id ? budgetLimit : limit))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update budget limit");
      console.error("Error updating budget limit:", err);
    }
  };

  /**
   * Handles deleting a budget limit.
   * @param {string} budgetLimitId - The ID of the budget limit to be deleted.
   */
  const handleDeleteBudgetLimit = async (budgetLimitId: string) => {
    if (!user) return;

    try {
      await deleteBudgetLimit(budgetLimitId, user.id);
      setBudgetLimits((prev) =>
        prev.filter((limit) => limit.id !== budgetLimitId)
      );
      setError(null);
    } catch (err) {
      setError("Failed to delete budget limit");
      console.error("Error deleting budget limit:", err);
    }
  };

  if (!user) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please sign in to set and view budget limits.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BudgetLimitForm
            onAddBudgetLimit={handleAddBudgetLimit}
            existingCategories={categories}
          />
        </div>
        <div>
          <BudgetLimitList
            budgetLimits={budgetLimits}
            expenses={expenses}
            onUpdateBudgetLimit={handleUpdateBudgetLimit}
            onDeleteBudgetLimit={handleDeleteBudgetLimit}
          />
        </div>
      </div>
    </div>
  );
}
