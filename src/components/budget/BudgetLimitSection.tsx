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

const categories: Category[] = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

type BudgetLimitSectionProps = {
  expenses: Array<{
    id: string;
    description: string;
    category: Category;
    amount: number;
    date: string;
  }>;
};

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
