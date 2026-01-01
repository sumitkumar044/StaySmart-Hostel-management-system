"use client";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function AdminNavbar({ toggleSidebar }) {
  const router = useRouter();

  function handleLogout() {
    localStorage.clear();
    router.push("/login");
  }

  return (
    <header className="w-full bg-white dark:bg-[#020617] border-b border-blue-100 dark:border-white/10 shadow-sm transition-colors font-sans">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile toggle button */}
          <button
            onClick={toggleSidebar}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-white/5 p-2 rounded-lg transition cursor-pointer"
          >
            <Menu size={22} />
          </button>

          {/* Logo text – no italic / tight tracking */}
          <h1 className="text-lg font-semibold text-blue-700 dark:text-white">
            StaySmart
          </h1>
        </div>

        {/* Center label – no uppercase/tracking-widest */}
        <div className="hidden md:block text-blue-800 dark:text-gray-300 text-sm font-medium">
          Admin panel
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
