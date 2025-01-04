/**
 * Authentication hook for managing user authentication state.
 * Provides user authentication status, profile data, and authentication methods.
 *
 * @module hooks/useAuth
 */

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * User profile information from the database.
 */
type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
};

/**
 * Custom hook for managing authentication state.
 *
 * @returns Object containing authentication state and methods
 *   - user: Current authenticated user or null
 *   - profile: User profile data or null
 *   - loading: Boolean indicating if auth state is being loaded
 *   - signOut: Function to sign out the current user
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await getProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Fetches user profile data from the database.
   *
   * @param userId - The ID of the user whose profile to fetch
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
   * Signs out the current user.
   * Clears local auth state and profile data.
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
