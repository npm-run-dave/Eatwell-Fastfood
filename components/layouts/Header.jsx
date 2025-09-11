// components/Header.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [localUser, setLocalUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const defaultAvatar = "/images/default-avatar.png";

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setLocalUser(JSON.parse(storedUser));
        } else {
          setLocalUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setLocalUser(null);
      }
    };

    loadUser();

    const handleStorageChange = (e) => {
      if (e.key === "user") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("userLoggedIn", loadUser);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setLocalUser(null);

    window.dispatchEvent(new Event("storage"));

    signOut({ callbackUrl: "/" });
  };

  const avatar = session?.user?.image || localUser?.image || defaultAvatar;
  const displayName = session?.user?.name || localUser?.name || "User";

  return (
    <header className="bg-gradient-to-r from-[#020202] to-[#3C2424] text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-3 px-6 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Eat Well Logo"
            width={140}
            height={140}
            className="w-[100px] md:w-[120px] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </Link>

        <ul className="hidden md:flex space-x-8 text-base font-medium items-center">
          <li>
            <Link href="/" className="hover:text-[#FFA500] transition">
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

          {(session || localUser) && (
            <li className="relative group">
              <button className="focus:outline-none flex items-center">
                <Image
                  src={avatar}
                  alt="profile"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                />
                <span className="ml-2 text-sm">{displayName}</span>
              </button>
              <div className="absolute right-0 mt-1 hidden group-hover:block w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                  {displayName}
                </p>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </li>
          )}
        </ul>

        <div className="md:hidden flex items-center space-x-4">
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

      {isOpen && (
        <div className="md:hidden bg-[#3C2424] text-white px-6 py-4 space-y-3">
          <Link
            href="/Menus"
            className="block py-2 hover:text-[#FFA500]"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </Link>
          <Link
            href="/specials"
            className="block py-2 hover:text-[#FFA500]"
            onClick={() => setIsOpen(false)}
          >
            Specials
          </Link>
          <Link
            href="/about"
            className="block py-2 hover:text-[#FFA500]"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block py-2 hover:text-[#FFA500]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {(session || localUser) && (
            <div className="flex items-center space-x-2">
              <Image
                src={avatar}
                alt="profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border border-gray-300 object-cover"
              />
              <span className="text-sm font-medium">{displayName}</span>
            </div>
          )}
          {(session || localUser) && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left py-2 rounded-md text-red-400 hover:text-red-300 "
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
