import React from "react";

type LoginFormProps = {
  onClose: () => void;
};

export function LoginForm({ onClose }: LoginFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={"email"}
            onChange={(e) => e.target.value}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={"password"}
            onChange={(e) => e.target.value}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors mt-2"
        >
          Close
        </button>
      </form>
    );
  };
}
