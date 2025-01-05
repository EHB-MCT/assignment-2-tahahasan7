import React, { useState } from "react";
import type { Category, Expense } from "../../types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Select } from "../ui/Select";

/**
 * Props for the ExpenseModal component.
 * @typedef {Object} ExpenseModalProps
 * @property {Expense} expense - The expense object to edit.
 * @property {boolean} isOpen - Indicates if the modal is open.
 * @property {function} onClose - The function to call when the modal is closed.
 * @property {function} onSave - The function to call when the expense is saved.
 */
type ExpenseModalProps = {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
};

/**
 * Categories for the expense types.
 * @constant
 * @type {Category[]}
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
 * Category options for the Select component.
 * @constant
 * @type {Object[]}
 */
const categoryOptions = categories.map((cat) => ({
  value: cat,
  label: cat,
}));

/**
 * The ExpenseModal component displays a modal for editing an expense.
 * It includes input fields for amount, category, description, and date.
 * On submission, the edited expense is passed to the onSave callback.
 *
 * @component
 * @param {ExpenseModalProps} props - The properties passed to the component.
 * @param {Expense} props.expense - The expense object to edit.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - The function to call when the modal is closed.
 * @param {function} props.onSave - The function to call when the expense is saved.
 * @returns {JSX.Element} The rendered ExpenseModal component.
 */
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

  /**
   * Handles the form submission, calling the onSave callback with the updated expense.
   * @param {React.FormEvent} e - The form submission event.
   */
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
