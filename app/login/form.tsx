"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      console.error("Error fetching login result:", error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-50">
      {/* Container */}
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-7xl md:flex overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-14">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Login</h1>
          <p className="text-gray-500 mb-6">How do I get started?</p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Login form"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full mt-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  👁️
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500 rounded"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-green-500 hover:underline">
                Forgot Password
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-full flex items-center justify-center ${
                loading
                  ? "bg-green-400"
                  : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
              } transition duration-200`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
          <div className="w-4/6 mx-auto">
            <Image
              src="/forest_bg.png"
              alt="Forest Background"
              className="object-cover rounded-3xl"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
