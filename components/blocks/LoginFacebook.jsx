"use client";

import { signIn } from "next-auth/react";

export default function FacebookLoginButton() {
  return (
    <button
      onClick={() => signIn("facebook")}
      className=" text-gray-700 font-medium hover:bg-gray-100 transition border py-1 px-3 border-gray-300 rounded-lg"
    >
      Facebook
    </button>
  );
}
