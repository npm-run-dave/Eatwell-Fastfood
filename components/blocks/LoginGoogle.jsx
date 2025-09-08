"use client";

import { signIn } from "next-auth/react";

export default function LoginGoogle() {
  return (
    <button
      onClick={() => signIn("google")}
      className=" text-gray-700 font-medium hover:bg-gray-100 transition"
    >
      Google
    </button>
  );
}
