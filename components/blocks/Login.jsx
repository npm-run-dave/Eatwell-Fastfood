// components/Login.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginGoogle from "./LoginGoogle";
import FacebookLoginButton from "../blocks/LoginFacebook";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Store user data in localStorage for the header component
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));

        // Also store token in localStorage for API requests
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
        }

        // ✅ Update parent component immediately
        if (onLoginSuccess) onLoginSuccess(data.user);

        // Trigger storage event to update other components
        window.dispatchEvent(new Event("storage"));
      }

      // Optional redirect
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (user) => {
    // Called after Google or Facebook login
    localStorage.setItem("user", JSON.stringify(user));

    // Update parent component immediately
    if (onLoginSuccess) onLoginSuccess(user);

    // Trigger storage event to update other components
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Please sign in to continue
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-2 focus:ring-red-600 outline-none"
              placeholder="you@example.com"
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
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-2 focus:ring-red-600 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-red-700 via-orange-600 to-red-600 px-6 py-3 text-white font-semibold shadow-md hover:from-red-800 hover:via-orange-700 hover:to-yellow-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <span className="w-full border-t border-gray-300"></span>
          <span className="mx-3 text-gray-500">or</span>
          <span className="w-full border-t border-gray-300"></span>
        </div>

        <div className="mt-6 flex space-x-4 justify-center">
          <LoginGoogle onLoginSuccess={handleSocialLogin} />
          <FacebookLoginButton onLoginSuccess={handleSocialLogin} />
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a
            href="/Signup"
            className="text-red-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
