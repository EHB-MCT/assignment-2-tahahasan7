import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Expense } from "../../types";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { ExpenseModal } from "./ExpenseModal";

/**
 * Props for the ExpenseList component.
 * @typedef {Object} ExpenseListProps
 * @property {Expense[]} expenses - The list of expenses to display.
 * @property {function} [onUpdateExpense] - The function to call when an expense is updated.
 * @property {function} [onDeleteExpense] - The function to call when an expense is deleted.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 */
type ExpenseListProps = {
  expenses: Expense[];
  onUpdateExpense?: (expense: Expense) => void;
  onDeleteExpense?: (expenseId: string) => void;
  isAuthenticated: boolean;
};

/**
 * The ExpenseList component displays a list of expenses in a table format.
 * It allows authenticated users to update or delete individual expenses.
 *
 * @component
 * @param {ExpenseListProps} props - The properties passed to the component.
 * @param {Expense[]} props.expenses - The list of expenses to display.
 * @param {function} [props.onUpdateExpense] - The function to call when an expense is updated.
 * @param {function} [props.onDeleteExpense] - The function to call when an expense is deleted.
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated.
 * @returns {JSX.Element} The rendered ExpenseList component.
 */
export function ExpenseList({
  expenses,
  onUpdateExpense,
  onDeleteExpense,
  isAuthenticated,
}: ExpenseListProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                {isAuthenticated && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(expense.amount)}
                  </td>
                  {isAuthenticated && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingExpense(expense)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteExpense?.(expense.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingExpense && (
        <ExpenseModal
          expense={editingExpense}
          isOpen={true}
          onClose={() => setEditingExpense(null)}
          onSave={(updatedExpense) => {
            onUpdateExpense?.(updatedExpense);
            setEditingExpense(null);
          }}
        />
      )}
    </>
  );
}
