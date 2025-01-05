import { useState } from "react";
import type { BudgetPeriod, Category, NewBudgetLimit } from "../../types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

/**
 * Props for the BudgetLimitForm component.
 *
 * @typedef {Object} BudgetLimitFormProps
 * @property {Function} onAddBudgetLimit - Callback function that will be triggered when a budget limit is successfully added.
 * @property {Category[]} existingCategories - List of available categories for the budget limit.
 */
type BudgetLimitFormProps = {
  onAddBudgetLimit: (budgetLimit: NewBudgetLimit) => void;
  existingCategories: Category[];
};

const periods: BudgetPeriod[] = ["monthly", "yearly"];

const periodOptions = periods.map((period) => ({
  value: period,
  label: period.charAt(0).toUpperCase() + period.slice(1),
}));

/**
 * BudgetLimitForm component allows users to set a budget limit by selecting an amount, category, and period.
 * It communicates with the parent component to add the new budget limit.
 *
 * @component
 * @param {BudgetLimitFormProps} props - The properties passed to the component.
 * @param {Function} props.onAddBudgetLimit - Function that is triggered when the form is submitted with the new budget limit.
 * @param {Category[]} props.existingCategories - The list of categories available for the budget limit.
 * @returns {JSX.Element} The rendered BudgetLimitForm component.
 */
export function BudgetLimitForm({
  onAddBudgetLimit,
  existingCategories,
}: BudgetLimitFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [period, setPeriod] = useState<BudgetPeriod>("monthly");

  const categoryOptions = existingCategories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const budgetLimit: NewBudgetLimit = {
      amount: parseFloat(amount),
      category,
      period,
    };

    onAddBudgetLimit(budgetLimit);
    setAmount("");
    setCategory("Food");
    setPeriod("monthly");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <h2 className="text-lg font-semibold mb-4">Set Budget Limit</h2>

        <Input
          type="number"
          label="Amount (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />

        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          options={categoryOptions}
        />

        <Select
          label="Period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as BudgetPeriod)}
          options={periodOptions}
        />

        <Button type="submit" className="w-full">
          Set Budget Limit
        </Button>
      </form>
    </Card>
  );
}
