import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

/**
 * LoginForm component allows users to log in using their email and password.
 * It communicates with the Supabase backend to authenticate the user.
 *
 * @component
 * @param {LoginFormProps} props - The properties passed to the component.
 * @param {Function} props.onClose - Function that is triggered when the user successfully logs in and the form should close.
 * @returns {JSX.Element} The rendered LoginForm component.
 */

/**
 * Props for the LoginForm component.
 *
 * @typedef {Object} LoginFormProps
 * @property {Function} onClose - Callback function that will be triggered when the form is successfully submitted.
 */
interface LoginFormProps {
  onClose: () => void;
}
export function LoginForm({ onClose }: LoginFormProps) {
  // State to hold the email, password, error message, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission by calling the Supabase authentication service.
   * If login is successful, the onClose function is called. If there is an error, an error message is displayed.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Attempt to sign in the user with email and password
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      // Handle authentication error
      if (signInError) {
        if (signInError.message === "Invalid login credentials") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(signInError.message);
        }
        return;
      }

      // Close the form on successful login
      if (data?.user) {
        onClose();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Display error message if present */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Email input field */}
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password input field */}
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      {/* Submit button with loading state */}
      <Button type="submit" isLoading={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
