import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import type { Category, NewExpense } from "../../types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

/**
 * Props for the ExpenseForm component.
 * @typedef {Object} ExpenseFormProps
 * @property {function} onAddExpense - The function to call when an expense is added.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 */
type ExpenseFormProps = {
  onAddExpense: (expense: NewExpense) => void;
  isAuthenticated: boolean;
};

/**
 * Available categories for the expense form.
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
 * Options for the category dropdown, mapping each category to a label and value.
 */
const categoryOptions = categories.map((cat) => ({
  value: cat,
  label: cat,
}));

/**
 * The ExpenseForm component allows users to input a new expense.
 * It includes fields for the amount, category, and description of the expense,
 * and calls `onAddExpense` when the form is submitted.
 *
 * @component
 * @param {ExpenseFormProps} props - The properties passed to the component.
 * @param {function} props.onAddExpense - The function to call when an expense is added.
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated.
 * @returns {JSX.Element} The rendered ExpenseForm component.
 */
export function ExpenseForm({
  onAddExpense,
  isAuthenticated,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [description, setDescription] = useState("");

  /**
   * Handles form submission.
   * Validates the form and calls `onAddExpense` with the newly created expense.
   * Clears the form fields after submission.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expense: NewExpense = {
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    };

    onAddExpense(expense);
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

        {!isAuthenticated && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You are not signed in. Your expenses will not be saved.
                </p>
              </div>
            </div>
          </div>
        )}

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

        <Input
          type="text"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Add Expense
        </Button>
      </form>
    </Card>
  );
}
