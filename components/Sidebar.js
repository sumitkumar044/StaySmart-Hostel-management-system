"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ role, isOpen, closeSidebar }) {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Rooms", path: "/admin/rooms" },
    { name: "Fees", path: "/admin/fee" },
    { name: "Complaints", path: "/admin/complaints" },
  ];

  const studentLinks = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Room", path: "/student/rooms" },
    { name: "Fees", path: "/student/fee" },
    { name: "Complaints", path: "/student/complaints" },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <aside
      className={`bg-white border-r shadow-sm p-6 min-h-screen fixed md:relative z-20 top-0 left-0
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-64 w-64"}
      `}
    >
      {/* Cancel button for mobile */}
      <div className="flex justify-end cursor-pointer mb-4">
        <button
          className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
          onClick={closeSidebar}
        >
          ✕
        </button>
      </div>

      <h2 className="text-xl font-bold mb-8 text-blue-600 whitespace-nowrap">
        Hostel System
      </h2>

      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`block px-4 py-2 rounded-lg text-sm font-medium
              ${pathname === link.path
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-blue-50"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
