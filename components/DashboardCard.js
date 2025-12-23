"use client";

export default function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="
        backdrop-blur-lg bg-white/70 border border-white/30
        rounded-2xl p-6 shadow-md
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h2 className="text-2xl font-bold text-blue-700">{value}</h2>
        </div>

        <div className="text-3xl text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
