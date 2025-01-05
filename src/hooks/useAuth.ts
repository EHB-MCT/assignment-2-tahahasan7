import { User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
};

/**
 * Custom hook to manage authentication and user profile state using Supabase.
 *
 * @returns {Object} Auth-related state and functions.
 * @property {User | null} user - The current authenticated user, or null if not authenticated.
 * @property {Profile | null} profile - The user's profile data, or null if not loaded.
 * @property {boolean} loading - Indicates whether the authentication state is being initialized.
 * @property {Function} signOut - Signs out the current user.
 * @property {Function} refreshProfile - Refreshes the user's profile data.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const initializingAuth = useRef(true);
  const profileFetchTimeout = useRef<NodeJS.Timeout>();

  /**
   * Resets the user and profile states and clears any pending operations.
   */
  const resetState = () => {
    setUser(null);
    setProfile(null);
    if (profileFetchTimeout.current) {
      clearTimeout(profileFetchTimeout.current);
    }
  };

  /**
   * Fetches and sets the user's profile data.
   * Implements a debounce mechanism to avoid rapid API calls.
   *
   * @param {string} userId - The ID of the user whose profile is being fetched.
   */
  const fetchProfile = async (userId: string) => {
    if (!userId) return;

    if (profileFetchTimeout.current) {
      clearTimeout(profileFetchTimeout.current);
    }

    profileFetchTimeout.current = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Profile fetch error:", error);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching profile:", error);
        setProfile(null);
      }
    }, 100);
  };

  /**
   * Initializes the authentication state by checking the current session.
   */
  useEffect(() => {
    let mounted = true;

    const setupAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            await fetchProfile(session.user.id);
          } else {
            resetState();
          }
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
        resetState();
      } finally {
        if (mounted) {
          setLoading(false);
          initializingAuth.current = false;
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
      if (profileFetchTimeout.current) {
        clearTimeout(profileFetchTimeout.current);
      }
    };
  }, []);

  /**
   * Subscribes to authentication state changes and updates the user and profile states accordingly.
   */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (initializingAuth.current) return;

      switch (event) {
        case "SIGNED_IN":
          if (session?.user) {
            setUser(session.user);
            await fetchProfile(session.user.id);
          }
          break;
        case "SIGNED_OUT":
          resetState();
          break;
        case "USER_UPDATED":
          if (session?.user) {
            setUser(session.user);
          }
          break;
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Signs out the current user and resets authentication state.
   *
   * @async
   * @throws {Error} If the sign-out operation fails.
   */
  const signOut = async () => {
    try {
      resetState();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return {
    user,
    profile,
    loading,
    signOut,
    refreshProfile: () => user && fetchProfile(user.id),
  };
}
