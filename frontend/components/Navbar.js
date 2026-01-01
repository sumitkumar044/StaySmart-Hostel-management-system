// "use client";
// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <header className="w-full bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-blue-600">
//           StaySmart
//         </h1>

//         <nav className="space-x-6 text-sm font-medium">
//           <Link href="/" className="text-gray-600 hover:text-blue-600">
//             Home
//           </Link>
//           <Link href="/login" className="text-gray-600 hover:text-blue-600">
//             Login
//           </Link>
//           <Link href="/register" className="text-gray-600 hover:text-blue-600">
//             Register
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled || isOpen
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-xl py-3 border-b border-gray-200 dark:border-white/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            Stay<span className="text-blue-600">Smart</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Login", "Register"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest transition-all"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="border-l border-gray-200 dark:border-white/10 pl-6 flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-900 dark:text-white"
              aria-label="Toggle navigation"
            >
              {/* Hamburger Icon */}
              {!isOpen && (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}

              {/* Close (X) Icon */}
              {isOpen && (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-t border-gray-200 dark:border-white/10">
            <div className="px-6 py-4 flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest"
              >
                Home
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest"
              >
                Register
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
