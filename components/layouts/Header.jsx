"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LoginButton from "../blocks/LoginButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#7A0C0C] text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-3 px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Logo.png"
            alt="Eat Well Logo"
            width={140}
            height={140}
            className="w-[100px] md:w-[120px] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-base font-medium items-center">
          <li>
            <Link
              href="/menu"
              className="hover:text-[#FFA500] transition"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/specials"
              className="hover:text-[#FFA500] transition"
            >
              Specials
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-[#FFA500] transition"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-[#FFA500] transition"
            >
              Contact
            </Link>
          </li>
          {/* Google login/logout dropdown */}
          <LoginButton />
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#7A0C0C] border-t border-gray-700 px-6 py-4 space-y-4">
          <Link
            href="/menu"
            className="block hover:text-[#FFA500] transition"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </Link>
          <Link
            href="/specials"
            className="block hover:text-[#FFA500] transition"
            onClick={() => setIsOpen(false)}
          >
            Specials
          </Link>
          <Link
            href="/about"
            className="block hover:text-[#FFA500] transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block hover:text-[#FFA500] transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {/* Google login/logout dropdown */}
          <LoginButton />
        </div>
      )}
    </header>
  );
}
