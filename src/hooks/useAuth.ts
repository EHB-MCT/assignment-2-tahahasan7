/**
 * Authentication hook for managing user authentication state.
 * This hook provides user authentication status, profile data, and authentication methods.
 *
 * @module hooks/useAuth
 */

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * User profile information fetched from the database.
 */
type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
};

/**
 * Custom hook for managing user authentication state.
 *
 * Provides authentication status, profile data, and methods to handle authentication.
 *
 * @returns {Object} Authentication state and methods:
 *   - user {User | null} Current authenticated user or null if not authenticated.
 *   - profile {Profile | null} User profile data or null if not available.
 *   - loading {boolean} Boolean indicating whether authentication state is being loaded.
 *   - signOut {Function} Function to sign out the current user and clear auth state.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and set the user and profile accordingly
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await getProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Fetches user profile data from the database based on the user ID.
   *
   * @param {string} userId - The ID of the user whose profile to fetch.
   * @returns {Promise<void>} Resolves once the profile data has been fetched and state updated.
   */
  async function getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    }
  }

  /**
   * Signs out the current user and clears local authentication state.
   *
   * @returns {Promise<void>} Resolves once the user has been signed out and state has been cleared.
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    user,
    profile,
    loading,
    signOut,
  };
}
