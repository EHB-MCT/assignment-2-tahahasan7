import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

/**
 * Props for the RegisterForm component.
 *
 * @typedef {Object} RegisterFormProps
 * @property {Function} onClose - Callback function that will be triggered when the form is successfully submitted.
 */
interface RegisterFormProps {
  onClose: () => void;
}

/**
 * RegisterForm component allows users to create a new account by entering a username, email, and password.
 * It communicates with the Supabase backend to handle user registration and profile creation.
 *
 * @component
 * @param {RegisterFormProps} props - The properties passed to the component.
 * @param {Function} props.onClose - Function that is triggered when the user successfully registers and the form should close.
 * @returns {JSX.Element} The rendered RegisterForm component.
 */
export function RegisterForm({ onClose }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
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
