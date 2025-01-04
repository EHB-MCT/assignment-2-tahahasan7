/**
 * Supabase client configuration and initialization.
 * This module sets up the Supabase client with environment variables
 * and exports a singleton instance for use throughout the application.
 *
 * @module lib/supabase
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Singleton Supabase client instance.
 * Used for all database operations and authentication.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
