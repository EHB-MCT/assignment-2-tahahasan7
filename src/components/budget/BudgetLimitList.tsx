import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { BudgetLimit, Expense } from "../../types";
import {
  calculateSpentAmount,
  getBudgetWarningLevel,
} from "../../utils/budgetCalculations";
import { Card } from "../ui/Card";
import { BudgetLimitModal } from "./BudgetLimitModal";
import { BudgetProgress } from "./BudgetProgress";

/**
 * Props for the BudgetLimitList component.
 *
 * @typedef {Object} BudgetLimitListProps
 * @property {BudgetLimit[]} budgetLimits - The list of budget limits to display.
 * @property {Expense[]} expenses - The list of expenses to calculate spending.
 * @property {Function} onUpdateBudgetLimit - Callback function to update a budget limit.
 * @property {Function} onDeleteBudgetLimit - Callback function to delete a budget limit.
 */
type BudgetLimitListProps = {
  budgetLimits: BudgetLimit[];
  expenses: Expense[];
  onUpdateBudgetLimit: (budgetLimit: BudgetLimit) => void;
  onDeleteBudgetLimit: (budgetLimitId: string) => void;
};

/**
 * BudgetLimitList component displays a list of budget limits with options to edit or delete them.
 * It also shows the progress of spending compared to each budget limit.
 *
 * @component
 * @param {BudgetLimitListProps} props - The properties passed to the component.
 * @param {BudgetLimit[]} props.budgetLimits - The list of budget limits to display.
 * @param {Expense[]} props.expenses - The list of expenses to calculate spending.
 * @param {Function} props.onUpdateBudgetLimit - Function to update a budget limit.
 * @param {Function} props.onDeleteBudgetLimit - Function to delete a budget limit.
 * @returns {JSX.Element} The rendered BudgetLimitList component.
 */
export function BudgetLimitList({
  budgetLimits,
  expenses,
  onUpdateBudgetLimit,
  onDeleteBudgetLimit,
}: BudgetLimitListProps) {
  const [editingLimit, setEditingLimit] = useState<BudgetLimit | null>(null);

  if (budgetLimits.length === 0) {
    return (
      <Card>
        <div className="p-6 text-center text-gray-500">
          No budget limits set yet.
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <div className="p-6 space-y-6">
          {budgetLimits.map((limit) => {
            const spent = calculateSpentAmount(
              expenses,
              limit.category,
              limit.period
            );
            const warningLevel = getBudgetWarningLevel(spent, limit.amount);

            return (
              <div key={limit.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {limit.category}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {limit.period.charAt(0).toUpperCase() +
                        limit.period.slice(1)}
                    </span>
                    <button
                      onClick={() => setEditingLimit(limit)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteBudgetLimit(limit.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <BudgetProgress
                  spent={spent}
                  limit={limit}
                  warningLevel={warningLevel}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {editingLimit && (
        <BudgetLimitModal
          budgetLimit={editingLimit}
          isOpen={true}
          onClose={() => setEditingLimit(null)}
          onSave={(updatedLimit) => {
            onUpdateBudgetLimit(updatedLimit);
            setEditingLimit(null);
          }}
        />
      )}
    </>
  );
}
