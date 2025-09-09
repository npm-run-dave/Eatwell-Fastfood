"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  // Default avatar for manual login
  const defaultAvatar = "/images/default-avatar.png"; // put this in public/images/

  return (
    <header className="bg-gradient-to-r from-[#020202] to-[#3C2424] text-white shadow-md sticky top-0 z-50">
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

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-base font-medium items-center">
          <li>
            <Link href="/menu" className="hover:text-[#FFA500] transition">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/specials" className="hover:text-[#FFA500] transition">
              Specials
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-[#FFA500] transition">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-[#FFA500] transition">
              Contact
            </Link>
          </li>

          {/* User Avatar + Dropdown */}
          {session?.user && (
            <li className="relative group">
              <button className="focus:outline-none">
                <Image
                  src={session.user.image || defaultAvatar} // fallback
                  alt="profile"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                />
              </button>

              <div className="absolute right-0 mt-0 hidden group-hover:block w-40 bg-white text-black rounded-md shadow-lg py-2">
                <p className="px-4 py-2 text-sm font-medium text-gray-700">
                  {session.user.name || "User"} {/* fallback name */}
                </p>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger + Avatar */}
        <div className="md:hidden flex items-center space-x-4">
          {session?.user && (
            <Image
              src={session.user.image || defaultAvatar}
              alt="profile"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border border-gray-300 object-cover"
            />
          )}

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

      {/* Mobile Nav Dropdown */}
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

          {session?.user && (
            <div className="border-t border-gray-700 pt-2">
              <p className="text-white px-2 py-1">
                {session.user.name || "User"}
              </p>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left text-white px-2 py-1 hover:bg-gray-700 rounded"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
