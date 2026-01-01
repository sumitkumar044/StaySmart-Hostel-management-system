"use client";
import { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ MOBILE PE DEFAULT CLOSE logic maintain rakha hai
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // bg-gradient ko dark mode compatible banaya hai
    <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-300">
      
      {/* ✅ FULL WIDTH NAVBAR - Same prop name toggleSidebar */}
      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Body Section */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar - Same logic */}
        <Sidebar
          role="admin"
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Content Area with a subtle gradient background for light mode only */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-blue-50/50 to-white dark:from-transparent dark:to-transparent">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}