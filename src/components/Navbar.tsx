import { UserCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const user = null; // Replace this with actual user state or context

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
          </div>

          <div className="relative">
            {user || null ? (
              <div className="flex items-center gap-3">
                (
                <img className="w-8 h-8 rounded-full" />
                ) : (
                <UserCircle className="w-8 h-8 text-gray-400" />)
                <span className="text-sm text-gray-600"></span>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <UserCircle className="w-8 h-8" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
