// export default function Footer() {
//   return (
//     <footer className="bg-blue-600 border-t border-blue-500 mt-auto">
//       <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-white">
//         © {new Date().getFullYear()} Hostel Management System. All rights reserved.
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-50 dark:bg-[#020617] border-t border-gray-200 dark:border-white/10 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Stay<span className="text-blue-600">Smart</span></h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            The world's most trusted hostel management system. Simplified for students, powered by technology.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase text-xs tracking-[0.2em]">Contact</h3>
          <div className="text-gray-500 dark:text-gray-400 text-sm space-y-2 font-medium">
            <p className="hover:text-blue-600 transition-colors">📧 kumarsumit48338@gmail.com</p>
            <p>📍 Bhagwanpur Muzaffarpur ,Bihar</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase text-xs tracking-[0.2em]">Quick Links</h3>
          <div className="flex gap-4">
            {["Home", "FAQ", "Terms"].map(link => (
              <Link key={link} href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">{link}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-white/5 text-center">
        <p className="text-gray-400 dark:text-gray-600 text-[10px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} StaySmart  All rights reserved
        </p>
      </div>
    </footer>
  );
}