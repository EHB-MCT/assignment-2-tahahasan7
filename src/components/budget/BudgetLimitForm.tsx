import { useState } from "react";
import type { BudgetPeriod, Category, NewBudgetLimit } from "../../types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

type BudgetLimitFormProps = {
  onAddBudgetLimit: (budgetLimit: NewBudgetLimit) => void;
  existingCategories: Category[];
};

const periods: BudgetPeriod[] = ["monthly", "yearly"];

const periodOptions = periods.map((period) => ({
  value: period,
  label: period.charAt(0).toUpperCase() + period.slice(1),
}));

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
