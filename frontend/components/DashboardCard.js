"use client";

export default function DashboardCard({ title, value, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full text-left
        bg-white dark:bg-slate-900 
        border border-gray-100 dark:border-white/5
        rounded-[2rem] p-8 
        shadow-xl shadow-gray-200/50 dark:shadow-none
        hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/50
        transition-all duration-300
        cursor-pointer
        group
        font-sans
      "
    >
      <div className="flex items-center justify-between">
        <div>
          {/* Title – no uppercase / extra tracking */}
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2">
            {title}
          </p>
          {/* Value – no italic / tracking-tighter */}
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white leading-snug">
            {value}
          </h2>
        </div>

        {/* Icon with Glowing Effect on Hover */}
        <div
          className="
            text-3xl p-4 rounded-2xl 
            bg-blue-50 dark:bg-blue-500/10 
            text-blue-600 dark:text-blue-400
            group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white
            transition-all duration-500
          "
        >
          {icon}
        </div>
      </div>

      {/* Subtle Bottom Line Indicator */}
      <div className="mt-6 h-1 w-12 bg-blue-600 rounded-full opacity-20 group-hover:w-full group-hover:opacity-100 transition-all duration-700" />
    </button>
  );
}
