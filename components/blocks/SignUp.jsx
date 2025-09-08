"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false); // Show OTP popup
  const [loading, setLoading] = useState(false); // Loading state

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !email || !password) {
      setMessage("❌ All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "Failed to send OTP"}`);
      } else {
        setOtpStep(true); // Show OTP popup
        setMessage("✅ OTP sent! Please check your email.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong while sending OTP.");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("❌ Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "OTP verification failed"}`);
      } else {
        setMessage("✅ Account created successfully! Redirecting...");
        setName("");
        setEmail("");
        setPassword("");
        setOtp("");
        setOtpStep(false);

        // Redirect to home after 1 second
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong while verifying OTP.");
    }
    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-700 via-orange-700 to-red-900 relative">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md z-10 relative">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="mt-2 text-center text-gray-600">Join us and start your journey</p>

        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        {!otpStep ? (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-2 focus:ring-red-600 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-red-700 via-orange-600 to-red-600 px-6 py-3 text-white font-semibold shadow-md hover:from-red-800 hover:via-orange-700 hover:to-yellow-700 transition flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : "Sign Up"}
            </button>
          </form>
        ) : (
          // OTP Popup
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm">
              <h3 className="text-xl font-semibold text-center mb-4">Verify OTP</h3>
              <p className="text-center text-gray-700 mb-4">
                Enter the OTP sent to <strong>{email}</strong>
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-4"
                placeholder="Enter OTP"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-red-700 via-orange-600 to-red-600 px-4 py-2 text-white font-semibold flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : "Verify & Create Account"}
              </button>
              <button
                onClick={() => setOtpStep(false)}
                className="w-full mt-3 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/Login" className="text-red-600 font-semibold hover:underline">Sign In</a>
        </p>
      </div>
    </section>
  );
}
