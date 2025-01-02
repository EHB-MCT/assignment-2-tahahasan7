import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import type { Category, Expense } from "../types";

type ExpenseFormProps = {
  onAddExpense: (expense: Expense) => void;
};

const categories: Category[] = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expense: Expense = {
      id: crypto.randomUUID(),
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount ($)
        </label>
        <input
          type="number"
          id="amount"
          min="0"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        <PlusCircle size={20} />
        Add Expense
      </button>
    </form>
  );
}
