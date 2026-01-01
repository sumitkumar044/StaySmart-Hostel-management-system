"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function StudentNavBar({ toggleSidebar }) {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "");
      } catch {
        setUserName("");
      }
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    router.push("/login");
  }

  return (
    <header className="h-16 w-full bg-white dark:bg-[#020617] border-b border-blue-100 dark:border-white/10 shadow-sm flex items-center justify-between px-6 transition-colors font-sans">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-blue-600 dark:text-blue-400 text-xl hover:bg-blue-50 dark:hover:bg-white/5 p-2 cursor-pointer rounded-lg transition"
        >
          <Menu size={22} />
        </button>

        {/* Logo text – no italic / tight tracking */}
        <h1 className="text-lg font-semibold text-blue-700 dark:text-white">
          StaySmart
        </h1>
      </div>

      {/* Center text – normal style */}
      <div className="hidden md:block text-blue-800 dark:text-gray-300 text-sm font-medium">
        {userName ? `Welcome, ${userName}` : "Student portal"}
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
    </header>
  );
}
