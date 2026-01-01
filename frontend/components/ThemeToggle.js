"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Icons install karein: npm install lucide-react

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />; // Placeholder to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl 
                 bg-white/5 backdrop-blur-md border border-white/10 
                 hover:border-blue-500/50 hover:bg-blue-500/10 
                 transition-all duration-300 group shadow-lg"
      aria-label="Toggle Theme"
    >
      {/* Sun Icon */}
      <Sun 
        className={`w-5 h-5 transition-all duration-500 absolute 
          ${theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100 text-amber-500"}`} 
      />
      
      {/* Moon Icon */}
      <Moon 
        className={`w-5 h-5 transition-all duration-500 absolute 
          ${theme === "dark" ? "scale-100 rotate-0 opacity-100 text-blue-400" : "scale-0 -rotate-90 opacity-0"}`} 
      />

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 blur-md transition-all -z-10" />
    </button>
  );
}