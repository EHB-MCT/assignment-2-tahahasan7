import { BudgetLimitSection } from "./components/budget/BudgetLimitSection";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <ExpenseSummary expenses={[]} />

            <BudgetLimitSection />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ExpenseForm
                  onAddExpense={console.log}
                  isAuthenticated={false}
                />
              </div>
              <div className="lg:col-span-2">
                <ExpenseList
                  expenses={[]}
                  onUpdateExpense={console.log}
                  onDeleteExpense={console.log}
                  isAuthenticated={false}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
