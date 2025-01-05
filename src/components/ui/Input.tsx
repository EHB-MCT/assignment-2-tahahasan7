import React from "react";
import { cn } from "../../utils/cn";

/**
 * Input component for rendering a text input field with optional label and error message.
 * The component supports validation error states and can accept additional styles via `className`.
 *
 * @component
 * @param {string} [label] - The label text to display above the input field.
 * @param {string} [error] - The error message to display below the input field if there is an issue.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Other props are forwarded to the `<input>` element.
 * @returns {JSX.Element} A styled input field with optional label and error message.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {/* Render label if provided */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {/* Render input field with conditional error styles */}
      <input
        className={cn(
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {/* Render error message if provided */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
