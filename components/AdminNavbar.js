"use client"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNavbar({ toggleSidebar }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleLogout() {
    router.push("/login");
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log("Search query:", query);
  }

  return (
    <header className="h-16 w-full bg-white border-b border-blue-100 shadow-sm flex items-center justify-between px-6">
      
      {/* Left: Sidebar toggle + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-blue-600 text-xl hover:bg-blue-50 cursor-pointer p-2 rounded-lg transition"
        >
          ☰
        </button>

        <h1 className="text-lg font-semibold text-blue-700 tracking-wide">
          StaySmart
        </h1>
      </div>

      {/* Middle: Admin Panel label */}
      <div className="hidden md:block text-blue-800 font-medium">
        Admin Panel
      </div>

      {/* Right: Search + Logout */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1.5 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black placeholder-gray-400 text-sm"
          />
            <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 cursor-pointer rounded-r-md text-sm font-medium transition ml-2 "
          >
            Search
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
