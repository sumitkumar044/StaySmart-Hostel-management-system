"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl";
import { Home, IndianRupee, Users, ShieldCheck, ArrowRight, BedDouble } from "lucide-react";

export default function MyRoom() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/requests/my-room")
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  // Loading state with spinner
  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  // No Room Allotted State
  if (!data || !data.room) {
    return (
      <div className="p-4 md:p-8 min-h-screen">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-6">
          My <span className="text-blue-600">Room</span>
        </h1>
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
          <div className="bg-gray-100 dark:bg-white/10 p-5 rounded-full mb-6">
            <BedDouble size={40} className="text-gray-400" />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">No room allotted yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs text-center">
            You haven't been assigned to a room. Browse available rooms and send a request.
          </p>
          <Link
            href="/student/rooms"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            Browse Rooms <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const room = data.room;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
          My <span className="text-blue-600">Residence</span>
        </h1>
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
          Your current hostel accommodation details
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-white/10">
        <div className="flex flex-col md:flex-row">
          
          {/* Room Image Section */}
          <div className="md:w-2/5 relative h-64 md:h-auto">
            {room.image ? (
              <img
                src={imageUrl ? imageUrl(room.image) : room.image}
                alt="Room"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 dark:bg-white/5 flex items-center justify-center">
                <Home size={48} className="text-blue-300 dark:text-white/20" />
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg">
              Assigned
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-3/5 p-6 md:p-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-4xl font-black text-black dark:text-white uppercase italic tracking-tighter">
                  Room {room.roomNumber}
                </h2>
                <div className="flex items-center gap-2 text-green-600 font-bold text-xs mt-1">
                  <ShieldCheck size={14} /> Verified Student Room
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Monthly</p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                  <IndianRupee size={20} />{room.rent}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                  <Users size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Occupancy</span>
                </div>
                <p className="text-lg font-black text-black dark:text-white leading-none">
                  {room.occupied} / {room.capacity}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                  <Home size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Type</span>
                </div>
                <p className="text-lg font-black text-black dark:text-white leading-none">
                  Hostel Standard
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/student/rooms/${room._id}`}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                View Full Details
              </Link>
              {/* <button className="flex-1 text-center bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-95">
                Download Receipt
              </button> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}