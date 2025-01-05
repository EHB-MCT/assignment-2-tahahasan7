import { UserCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthModal } from "../auth/AuthModal";

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    // No need to set modal state here as the auth state change will trigger a re-render
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
          </div>

          <div className="relative">
            {user ? (
              <div className="flex items-center gap-3">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.username || "Profile"}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <UserCircle className="w-8 h-8 text-gray-400" />
                )}
                <span className="text-sm text-gray-600">
                  {profile?.username || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
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
