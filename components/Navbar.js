"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          StaySmart
        </h1>

        <nav className="space-x-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link href="/register" className="text-gray-600 hover:text-blue-600">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
