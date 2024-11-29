"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FormEvent, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

export default function Form() {
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      setError(result.error); // Show error if login fails
    } else {
      // Navigate to the dashboard on success
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-md w-full max-w-sm"
    >
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {error && <ErrorMessage message={error} />}{" "}
      {/* Display error if exists */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          type="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}
