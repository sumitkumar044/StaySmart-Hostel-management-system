"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent dark:from-blue-900/40"></div>
        <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070" className="w-full h-full object-cover" alt="Background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1 mb-6 border border-blue-600/20 dark:border-blue-400/30 rounded-full bg-blue-50 dark:bg-blue-500/10 backdrop-blur-sm text-blue-600 dark:text-blue-300 text-xs font-bold tracking-widest uppercase">
          Welcome to StaySmart 2026
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
          Hostel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Management</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          The ultimate platform for modern student living. Everything you need, one click away.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105">
            Get Started
          </Link>
          <Link href="/about" className="px-8 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl font-black hover:bg-gray-200 dark:hover:bg-white/10 transition-all transform hover:scale-105 ">
            Learn More
          </Link>
        </div>
        
      </div>
    </div>
  );
}


// export default function Home() {

//   return (

//     // 'flex-1' ensures it takes up all available space between header and footer

//     // 'bg-blue-50' gives it a light blue background

//     <div className="flex-1 flex flex-col items-center justify-center bg-blue-100 relative top-70">

//       <h1 className="text-5xl font-bold text-blue-600 text-center">

//         Hostel Management System 🚀

//       </h1>

//     </div>

//   );

// }

