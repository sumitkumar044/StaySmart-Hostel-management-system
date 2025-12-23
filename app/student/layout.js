"use client";
import { useState } from "react";
import StudentNavBar from "@/components/StudentNavBar";
import Sidebar from "@/components/Sidebar";

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      
      {/* ✅ FULL WIDTH NAVBAR */}
      <StudentNavBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar
          role="student"
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
