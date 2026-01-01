"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/imageUrl";
import { ArrowLeft, Users, IndianRupee, BedDouble, ShieldCheck } from "lucide-react";

export default function RoomDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api(`/rooms/${id}`)
      .then(setRoom)
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!room) return (
    <div className="p-8 text-center">
      <p className="text-red-500 font-bold">Room not found</p>
      <button onClick={() => router.back()} className="mt-4 text-blue-600 underline">Go Back</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Top Navigation */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors mb-6 font-bold uppercase text-[10px] tracking-widest"
      >
        <ArrowLeft size={16} /> Back to Rooms
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10">
        {/* Room Image with Badge */}
        <div className="relative h-64 md:h-96 w-full">
          {room.image ? (
            <img
              src={imageUrl ? imageUrl(room.image) : room.image}
              alt="Room"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 dark:bg-white/5 flex items-center justify-center">
              <BedDouble size={48} className="text-blue-300" />
            </div>
          )}
          <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter italic">
              Room {room.roomNumber}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-black text-black dark:text-white uppercase italic tracking-tighter mb-2">
                StaySmart <span className="text-blue-600">Elite</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Users size={16} />
                  <span className="text-sm font-bold">Capacity: {room.capacity} Students</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm italic">
                  <ShieldCheck size={16} /> Verified Room
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-3xl border border-blue-100 dark:border-blue-900/30">
              <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Monthly Rent</p>
              <h2 className="text-3xl font-black text-black dark:text-white flex items-center gap-1">
                <IndianRupee size={24} /> {room.rent}
              </h2>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-white/5 mb-8" />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Occupancy</p>
              <p className="text-lg font-black text-black dark:text-white leading-none">{room.occupied} / {room.capacity}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Type</p>
              <p className="text-lg font-black text-black dark:text-white leading-none">Shared</p>
            </div>
            {/* Future Placeholder */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">WiFi</p>
              <p className="text-lg font-black text-green-500 leading-none">Available</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Attached Bath</p>
              <p className="text-lg font-black text-black dark:text-white leading-none">Yes</p>
            </div>
          </div>

          {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]">
            Request to Join This Room
          </button> */}
        </div>
      </div>
    </div>
  );
}