"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import RoomCard from "@/components/RoomCard";
import { getToken, getUser, logout } from "@/lib/auth";
import { PlusCircle, Home, LayoutGrid } from "lucide-react";

export default function AdminRooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "admin") {
      logout();
      return;
    }

    api("/rooms")
      .then((data) => {
        // API response structure check
        setRooms(Array.isArray(data) ? data : data.rooms || []);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-transparent">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            Hostel <span className="text-blue-600">Inventory</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <LayoutGrid size={14} className="text-gray-400" />
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
              Manage and monitor all room status
            </p>
          </div>
        </div>

        <Link
          href="/admin/rooms/add"
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/30 active:scale-95"
        >
          <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Add New Room
        </Link>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="transition-all duration-300 hover:-translate-y-2">
              <RoomCard room={room} isAdmin />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
            <div className="bg-gray-100 dark:bg-white/10 p-5 rounded-full mb-4">
              <Home size={40} className="text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              No rooms found in inventory
            </p>
            <Link href="/admin/rooms/add" className="mt-4 text-blue-600 font-black text-sm uppercase hover:underline">
              Create your first room
            </Link>
          </div>
        )}
      </div>

      {/* QUICK STATUS LEGEND (Optional but looks professional) */}
      <div className="mt-12 flex flex-wrap gap-6 p-6 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Full</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Maintenance</span>
        </div>
      </div>
    </div>
  );
}