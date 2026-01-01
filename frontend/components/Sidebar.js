// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Sidebar({ role, isOpen, closeSidebar }) {
//   const pathname = usePathname();

//  const adminLinks = [
//   { name: "Dashboard", path: "/admin/dashboard" },
//   { name: "Rooms", path: "/admin/rooms" },
//   { name: "Room Requests", path: "/admin/rooms/requests" },
//   { name: "Fees", path: "/admin/fee" },
//   { name: "Complaints", path: "/admin/complaints" },
//   { name: "All Students", path: "/admin/students" },   // 🔥 NEW
// ];


// const studentLinks = [
//   { name: "Dashboard", path: "/student/dashboard" },
//   { name: "Room", path: "/student/rooms" },
//   { name: "Fees", path: "/student/fee" },
//   { name: "Complaints", path: "/student/complaints" },
//   { name: "My Room", path: "/student/rooms/my-room" }, // ✅ FIX
// ];


//   const links = role === "admin" ? adminLinks : studentLinks;
//     const sidebarTitle = role === "admin" ? "Admin" : "Student";

//   // ✅ mobile-only auto close
//   const handleLinkClick = () => {
//     if (window.innerWidth < 768) {
//       closeSidebar();
//     }
//   };

//   return (
//     <aside
//       className={`bg-white border-r shadow-sm p-6 fixed md:relative z-20 top-0 left-0 min-h-screen
//         transition-transform duration-300
//         ${isOpen ? "translate-x-0 w-64" : "-translate-x-64 w-64"}
//       `}
//     >
//       {/* ❌ Cancel Button (ONLY MOBILE) */}
      

//       <h2 className="text-xl font-bold mb-8 text-blue-600 flex justify-between mb-4">
//         {sidebarTitle}
//         {/* <span className="flex justify-end mb-4  "> */}
//         <button
//           onClick={closeSidebar}
//           className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer inline"
//         >
//           ✕
//         </button>
//       {/* </span> */}
//       </h2>

//       <nav className="space-y-3">
//         {links.map((link) => (
//           <Link
//             key={link.path}
//             href={link.path}
//             onClick={handleLinkClick}
//             className={`block px-4 py-2 rounded-lg text-sm font-medium cursor-pointer
//               ${
//                 pathname === link.path
//                   ? "bg-blue-100 text-blue-700"
//                   : "text-gray-600 hover:bg-blue-50"
//               }`}
//           >
//             {link.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ role, isOpen, closeSidebar }) {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Rooms", path: "/admin/rooms" },
    { name: "Room Requests", path: "/admin/rooms/requests" },
    { name: "Fees", path: "/admin/fee" },
    { name: "Complaints", path: "/admin/complaints" },
    { name: "All Students", path: "/admin/students" },
  ];

  const studentLinks = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Room", path: "/student/rooms" },
    { name: "Fees", path: "/student/fee" },
    { name: "Complaints", path: "/student/complaints" },
    { name: "My Room", path: "/student/rooms/my-room" },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;
  const sidebarTitle = role === "admin" ? "Admin" : "Student";

  // ✅ mobile-only auto close
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <aside
      className={`
        /* Base Colors */
        bg-white dark:bg-[#0a0a0a] 
        /* Border & Shadow */
        border-r border-gray-200 dark:border-white/10 shadow-sm 
        /* Positioning */
        p-6 fixed md:relative z-20 top-0 left-0 min-h-screen
        /* Transitions */
        transition-all duration-300
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-64 w-64"}
      `}
    >
      <h2 className="text-xl font-bold mb-8 text-blue-600 flex justify-between items-center">
        {sidebarTitle}
        <button
          onClick={closeSidebar}
          className="text-gray-400 hover:text-gray-800 dark:hover:text-white text-xl cursor-pointer"
        >
          ✕
        </button>
      </h2>

      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={handleLinkClick}
            className={`block px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors
              ${
                pathname === link.path
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}