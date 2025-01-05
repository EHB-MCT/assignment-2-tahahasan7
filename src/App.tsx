import { useEffect, useState } from "react";
import { BudgetLimitSection } from "./components/budget/BudgetLimitSection";
import { ExpenseForm } from "./components/expense/ExpenseForm";
import { ExpenseList } from "./components/expense/ExpenseList";
import { ExpenseSummary } from "./components/expense/ExpenseSummary";
import { Navbar } from "./components/navigation/Navbar";
import { useAuth } from "./hooks/useAuth";
import {
  addExpense,
  deleteExpense,
  fetchUserExpenses,
  updateExpense,
} from "./lib/expenses";
import type { Expense, NewExpense } from "./types";

const LOCAL_STORAGE_KEY = "localExpenses";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [localExpenses, setLocalExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localExpenses));
  }, [localExpenses]);

  useEffect(() => {
    if (user) {
      loadExpenses();
    } else {
      setExpenses([]);
    }
  }, [user]);

  const loadExpenses = async () => {
    if (!user) return;
    try {
      const userExpenses = await fetchUserExpenses(user.id);
      setExpenses(userExpenses);
      setError(null);
    } catch (err) {
      setError("Failed to load expenses");
      console.error("Error loading expenses:", err);
    }
  };

  const handleAddExpense = async (newExpense: NewExpense) => {
    if (user) {
      try {
        const expense = await addExpense(newExpense, user.id);
        setExpenses((prev) => [expense, ...prev]);
        setError(null);
      } catch (err) {
        setError("Failed to add expense");
        console.error("Error adding expense:", err);
      }
    } else {
      const localExpense: Expense = {
        id: crypto.randomUUID(),
        ...newExpense,
      };
      setLocalExpenses((prev) => [localExpense, ...prev]);
    }
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    if (user) {
      try {
        const expense = await updateExpense(updatedExpense, user.id);
        setExpenses((prev) =>
          prev.map((e) => (e.id === expense.id ? expense : e))
        );
        setError(null);
      } catch (err) {
        setError("Failed to update expense");
        console.error("Error updating expense:", err);
      }
    } else {
      setLocalExpenses((prev) =>
        prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
      );
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (user) {
      try {
        await deleteExpense(expenseId, user.id);
        setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
        setError(null);
      } catch (err) {
        setError("Failed to delete expense");
        console.error("Error deleting expense:", err);
      }
    } else {
      setLocalExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    }
  };

  const displayedExpenses = user ? expenses : localExpenses;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-6">
            <ExpenseSummary expenses={displayedExpenses} />

            <BudgetLimitSection expenses={displayedExpenses} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ExpenseForm
                  onAddExpense={handleAddExpense}
                  isAuthenticated={!!user}
                />
              </div>
              <div className="lg:col-span-2">
                <ExpenseList
                  expenses={displayedExpenses}
                  onUpdateExpense={handleUpdateExpense}
                  onDeleteExpense={handleDeleteExpense}
                  isAuthenticated={!!user}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
