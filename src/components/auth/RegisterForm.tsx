import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

/**
 * Props for the RegisterForm component.
 * @typedef {Object} RegisterFormProps
 * @property {Function} onClose - A function to call when the registration form is closed.
 */
interface RegisterFormProps {
  onClose: () => void;
}

/**
 * The RegisterForm component allows users to sign up by providing their
 * email, password, and username. It handles the creation of a new user in
 * Supabase, checks if the username is available, and creates a profile for
 * the user after successful registration.
 *
 * @component
 * @param {RegisterFormProps} props - The properties passed to the component.
 * @param {Function} props.onClose - A function to call when the registration form is closed.
 * @returns {JSX.Element} The rendered RegisterForm component.
 */
export function RegisterForm({ onClose }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission to register a new user.
   * - Checks if the username already exists.
   * - Registers the user with Supabase.
   * - Creates a user profile in the "profiles" table.
   * - Signs the user in after registration.
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check if username exists
      const { data: existingUser, error: checkError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username.trim())
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }

      if (existingUser) {
        setError("Username is already taken");
        setLoading(false);
        return;
      }

      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            username: username.trim(),
            avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              username.trim()
            )}`,
          },
        ]);

        if (profileError) throw profileError;

        // Sign in the user immediately after registration
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) throw signInError;

        onClose();
      }
    } catch (err: any) {
      if (err.message?.includes("duplicate key")) {
        setError("Username is already taken");
      } else {
        setError(err.message || "An error occurred during registration");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Input
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength={3}
        pattern="[a-zA-Z0-9_-]+"
        title="Username can only contain letters, numbers, underscores, and hyphens"
      />

      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <p className="mt-1 text-sm text-gray-500">
        Password must be at least 6 characters long
      </p>

      <Button type="submit" isLoading={loading} className="w-full">
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
