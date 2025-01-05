import React, { useState } from "react";
import type { BudgetLimit, BudgetPeriod } from "../../types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Select } from "../ui/Select";

/**
 * Props for the BudgetLimitModal component.
 *
 * @typedef {Object} BudgetLimitModalProps
 * @property {BudgetLimit} budgetLimit - The current budget limit that needs to be edited.
 * @property {boolean} isOpen - Determines whether the modal is open or closed.
 * @property {Function} onClose - Callback function to close the modal.
 * @property {Function} onSave - Callback function to save the updated budget limit.
 */
type BudgetLimitModalProps = {
  budgetLimit: BudgetLimit;
  isOpen: boolean;
  onClose: () => void;
  onSave: (budgetLimit: BudgetLimit) => void;
};

const periods: BudgetPeriod[] = ["monthly", "yearly"];

const periodOptions = periods.map((period) => ({
  value: period,
  label: period.charAt(0).toUpperCase() + period.slice(1),
}));

/**
 * BudgetLimitModal component is used for editing an existing budget limit.
 * It allows the user to modify the amount and period for the budget limit.
 *
 * @component
 * @param {BudgetLimitModalProps} props - The properties passed to the component.
 * @param {BudgetLimit} props.budgetLimit - The current budget limit that needs to be edited.
 * @param {boolean} props.isOpen - Determines whether the modal is open or closed.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onSave - Callback function to save the updated budget limit.
 * @returns {JSX.Element} The rendered BudgetLimitModal component.
 */
export function BudgetLimitModal({
  budgetLimit,
  isOpen,
  onClose,
  onSave,
}: BudgetLimitModalProps) {
  const [amount, setAmount] = useState(budgetLimit.amount.toString());
  const [period, setPeriod] = useState<BudgetPeriod>(budgetLimit.period);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...budgetLimit,
      amount: parseFloat(amount),
      period,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Budget Limit">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">Category</span>
          <p className="mt-1 text-sm text-gray-900">{budgetLimit.category}</p>
        </div>

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
          label="Period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as BudgetPeriod)}
          options={periodOptions}
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
