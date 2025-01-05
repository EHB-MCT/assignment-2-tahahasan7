import React from "react";
import { cn } from "../../utils/cn";

/**
 * Select component that renders a dropdown list of options with optional label and error message.
 *
 * @component
 * @param {string} [label] - The label for the select input.
 * @param {string} [error] - An optional error message to display below the select input.
 * @param {Array} options - A list of options where each option has a `value` and `label`.
 * @param {string} [className] - Optional custom className for additional styling of the select element.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} props - Additional properties for the select element such as `onChange` or `disabled`.
 * @returns {JSX.Element} A styled select input element with its options.
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export function Select({
  label,
  error,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={cn(
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
