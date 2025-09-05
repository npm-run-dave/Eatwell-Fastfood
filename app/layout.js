"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />

          <main className="min-h-screen">{children}</main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
