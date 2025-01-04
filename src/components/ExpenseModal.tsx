import React, { useState } from "react";
import type { Category, Expense } from "../types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Modal } from "./ui/Modal";
import { Select } from "./ui/Select";

type ExpenseModalProps = {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
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

const categoryOptions = categories.map((cat) => ({
  value: cat,
  label: cat,
}));

export function ExpenseModal({
  expense,
  isOpen,
  onClose,
  onSave,
}: ExpenseModalProps) {
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState<Category>(expense.category);
  const [description, setDescription] = useState(expense.description);
  const [date, setDate] = useState(expense.date.split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...expense,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toISOString(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Expense">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Input
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
