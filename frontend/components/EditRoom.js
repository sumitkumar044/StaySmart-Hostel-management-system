"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Home, CreditCard, Users, Settings } from "lucide-react";

export default function EditRoom() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    roomName: "Room A-204",
    type: "Double Sharing",
    rent: "3500",
    capacity: "2",
    status: "Available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Room configurations updated successfully!");
    router.push("/admin/rooms");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center font-sans">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 h-fit relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
            <Settings size={24} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Edit <span className="text-blue-600">room</span>
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Room Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
              <Home size={12} className="text-blue-500" /> Room name
            </label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              placeholder="e.g. A-204"
              className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 focus:ring-2 focus:ring-blue-600 outline-none text-black dark:text-white font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                Room type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 focus:ring-2 focus:ring-blue-600 outline-none text-black dark:text-white font-medium transition-all"
              />
            </div>

            {/* Rent */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                <CreditCard size={12} className="text-blue-500" /> Rent (₹)
              </label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 focus:ring-2 focus:ring-blue-600 outline-none text-black dark:text-white font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capacity */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                <Users size={12} className="text-blue-500" /> Capacity
              </label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 focus:ring-2 focus:ring-blue-600 outline-none text-black dark:text-white font-medium transition-all"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                Operational status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 focus:ring-2 focus:ring-blue-600 outline-none text-black dark:text-white font-medium transition-all cursor-pointer appearance-none"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 py-4 rounded-2xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
            >
              <X size={16} /> Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl text-sm font-semibold hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all active:scale-95"
            >
              <Save size={16} /> Update room details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
