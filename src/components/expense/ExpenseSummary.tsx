import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import type { Expense } from "../../types";
import { formatCurrency } from "../../utils/formatters";

/**
 * Props for the ExpenseSummary component.
 * @typedef {Object} ExpenseSummaryProps
 * @property {Expense[]} expenses - The list of expenses to summarize.
 */
type ExpenseSummaryProps = {
  expenses: Expense[];
};

/**
 * The ExpenseSummary component displays a summary of the total expenses,
 * expenses for the current month, and the average expense.
 *
 * It calculates:
 * - Total expenses: Sum of all expenses.
 * - This month: Sum of expenses that occurred in the current month.
 * - Average expense: The average value of the expenses.
 *
 * @component
 * @param {ExpenseSummaryProps} props - The properties passed to the component.
 * @param {Expense[]} props.expenses - The list of expenses to summarize.
 * @returns {JSX.Element} The rendered ExpenseSummary component.
 */
export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  // Calculate the total expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Get today's date and filter expenses for the current month
  const today = new Date();
  const thisMonth = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  });

  // Calculate the total expenses for this month
  const monthlyTotal = thisMonth.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Calculate the average expense
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">This Month</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(monthlyTotal)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Average Expense</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(averageExpense)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
