import { Card } from "../ui/Card";
import { BudgetProgress } from "./BudgetProgress";

// Example data for demonstration
const mockBudgetLimits = [
  {
    id: "1",
    category: "Food",
    amount: 500,
    period: "monthly",
    spent: 350,
  },
  {
    id: "2",
    category: "Transport",
    amount: 200,
    period: "monthly",
    spent: 180,
  },
  {
    id: "3",
    category: "Entertainment",
    amount: 300,
    period: "monthly",
    spent: 320,
  },
];

export function BudgetLimitList() {
  return (
    <Card>
      <div className="p-6 space-y-6">
        {mockBudgetLimits.map((limit) => (
          <div key={limit.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {limit.category}
              </h3>
              <span className="text-sm text-gray-500">
                {limit.period.charAt(0).toUpperCase() + limit.period.slice(1)}
              </span>
            </div>

            <BudgetProgress
              spent={limit.spent}
              limit={limit.amount}
              warningLevel={getWarningLevel(limit.spent, limit.amount)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

function getWarningLevel(
  spent: number,
  limit: number
): "none" | "warning" | "danger" {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return "danger";
  if (percentage >= 80) return "warning";
  return "none";
}
