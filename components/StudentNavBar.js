"use client";
import { useRouter } from "next/navigation";
export default function StudentNavBar({ toggleSidebar }) {
    const router=useRouter()
   function handleLogout(){
    router.push("/login")
   }
  return (
    <header className="h-16 w-full bg-white border-b border-blue-100 shadow-sm flex items-center justify-between px-6">
      
      {/* Left : Toggle + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-blue-600 text-xl hover:bg-blue-50 p-2 cursor-pointer rounded-lg transition"
        >
          ☰
        </button>

        <h1 className="text-lg font-semibold text-blue-700 tracking-wide">
          StaySmart
        </h1>
      </div>

      {/* Center : Page Title */}
      <div className="hidden md:block text-blue-800 font-medium">
        Student Portal
      </div>

      {/* Right : Logout */}
      <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition">
        Logout
      </button>
    </header>
  );
}
