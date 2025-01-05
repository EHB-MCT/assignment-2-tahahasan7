import type { Category } from "../../types";
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

export function BudgetLimitSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BudgetLimitForm existingCategories={categories} />
        </div>
        <div>
          <BudgetLimitList />
        </div>
      </div>
    </div>
  );
}
