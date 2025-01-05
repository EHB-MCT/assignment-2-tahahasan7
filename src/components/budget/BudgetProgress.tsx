import { AlertTriangle, CheckCircle } from "lucide-react";
import type { BudgetLimit } from "../../types";
import { formatCurrency } from "../../utils/formatters";

/**
 * Props for the BudgetProgress component.
 * @typedef {Object} BudgetProgressProps
 * @property {number} spent - The amount of money already spent in the category.
 * @property {BudgetLimit} limit - The budget limit for the category.
 * @property {"none" | "warning" | "danger"} warningLevel - The current warning level of the budget.
 */
type BudgetProgressProps = {
  spent: number;
  limit: BudgetLimit;
  warningLevel: "none" | "warning" | "danger";
};

/**
 * The BudgetProgress component displays the progress of a budget limit.
 * It shows how much has been spent, the current budget status (within limit, near limit, or over budget),
 * and a progress bar indicating the percentage spent of the budget.
 *
 * @component
 * @param {BudgetProgressProps} props - The properties passed to the component.
 * @param {number} props.spent - The amount of money spent in the category.
 * @param {BudgetLimit} props.limit - The budget limit for the category.
 * @param {"none" | "warning" | "danger"} props.warningLevel - The warning level indicating how close the user is to exceeding the budget.
 * @returns {JSX.Element} The rendered BudgetProgress component.
 */
export function BudgetProgress({
  spent,
  limit,
  warningLevel,
}: BudgetProgressProps) {
  const percentage = Math.min((spent / limit.amount) * 100, 100);

  const barColors = {
    none: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const textColors = {
    none: "text-green-700",
    warning: "text-yellow-700",
    danger: "text-red-700",
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium text-gray-700">
          {formatCurrency(spent)} / {formatCurrency(limit.amount)}
        </div>
        <div
          className={`text-sm font-medium ${textColors[warningLevel]} flex items-center gap-1`}
        >
          {warningLevel === "danger" && (
            <>
              <AlertTriangle className="h-4 w-4" />
              Over Budget!
            </>
          )}
          {warningLevel === "warning" && (
            <>
              <AlertTriangle className="h-4 w-4" />
              Near Limit
            </>
          )}
          {warningLevel === "none" && (
            <>
              <CheckCircle className="h-4 w-4" />
              Within Budget
            </>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${barColors[warningLevel]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
