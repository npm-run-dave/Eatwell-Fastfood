"use client";

import { signIn } from "next-auth/react";

export default function FacebookLoginButton() {
  return (
    <button
      onClick={() => signIn("facebook")}
      className=" text-gray-700 font-medium hover:bg-gray-100 transition"
    >
     Facebook
    </button>
  );
}
