"use client";
import { SessionProvider } from "next-auth/react";
import Widget from "@/components/icons/widget";
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
          <Widget />

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
