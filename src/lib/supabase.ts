/**
 * Supabase client configuration and initialization.
 * This module sets up the Supabase client using environment variables
 * and exports a singleton instance for use throughout the application.
 *
 * @module lib/supabase
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Singleton instance of the Supabase client.
 *
 * This client is configured with the application's Supabase URL and anonymous key,
 * and is used for database operations and authentication.
 *
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
