import { UserCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthModal } from "../auth/AuthModal";

/**
 * Navbar component that displays the header with the app name, user profile (if authenticated),
 * and options to sign in or sign out.
 *
 * It conditionally renders:
 * - A sign-in button if the user is not authenticated.
 * - A user profile with sign-out button if the user is authenticated.
 *
 * @component
 * @returns {JSX.Element} The Navbar UI element with authentication handling.
 */
export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  /**
   * Handles the sign-out process.
   * Calls the `signOut` function and clears any modal state.
   */
  const handleSignOut = () => {
    signOut();
    // No need to manage modal state after sign out as the auth state will trigger a re-render
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
          </div>

          {/* User Authentication Section */}
          <div className="relative">
            {user ? (
              // Displayed when the user is signed in
              <div className="flex items-center gap-3">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.username || "User Profile"}
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
              // Displayed when the user is not signed in
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                aria-label="Sign In"
              >
                <UserCircle className="w-8 h-8" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
