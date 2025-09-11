"use client";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Chatbot from "@/components/blocks/Chatbot";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />

          <main className="min-h-screen">{children}</main>
          <Chatbot />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
