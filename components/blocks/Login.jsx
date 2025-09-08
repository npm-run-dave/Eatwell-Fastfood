"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import LoginGoogle from "./LoginGoogle";
import FacebookLoginButton from "../blocks/LoginFacebook";

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); 
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.replace("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="mt-2 text-center text-gray-600">Please sign in to continue</p>

        {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-red-600 focus:ring-red-600"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-red-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-red-700 via-orange-600 to-red-600 px-6 py-3 text-white font-semibold shadow-md hover:from-red-800 hover:via-orange-700 hover:to-yellow-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="w-full border-t border-gray-300"></span>
          <span className="mx-3 text-gray-500">or</span>
          <span className="w-full border-t border-gray-300"></span>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => signIn("google")}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            <LoginGoogle />
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            <FacebookLoginButton />
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/Signup" className="text-red-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
