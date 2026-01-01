"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import RoomCard from "@/components/RoomCard";
import { getToken, getUser, logout } from "@/lib/auth";
import { Home, Info } from "lucide-react";

export default function StudentRooms() {
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
    if (user.role !== "student") {
      logout();
      return;
    }

    api("/rooms")
      .then((data) => {
        // Agar data array ke bajaye object mein aa raha ho (res.rooms)
        setRooms(Array.isArray(data) ? data : data.rooms || []);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  async function applyRoom(roomId) {
    try {
      const res = await api("/requests", "POST", { roomId });
      if (res.success || res._id) {
        alert("Request sent successfully!");
      } else {
        alert(res.message || "Failed to send request");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            Available <span className="text-blue-600">Rooms</span>
          </h1>
        </div>
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
          Find and request your preferred accommodation
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="transition-transform duration-300 hover:-translate-y-2">
              <RoomCard room={room} onApply={applyRoom} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-full mb-4">
              <Home size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              No rooms available at the moment
            </p>
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="mt-12 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 flex items-start gap-3">
        <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          <b>Note:</b> Room allocation depends on availability and admin approval. Once you apply, you can track your request status in the dashboard.
        </p>
      </div>
    </div>
  );
}