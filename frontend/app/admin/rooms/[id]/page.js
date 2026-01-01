"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/imageUrl";
import { ArrowLeft, Edit3, IndianRupee, Users, Bed, ShieldCheck } from "lucide-react";

export default function AdminRoomView() {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api(`/rooms/${id}`)
      .then((data) => setRoom(data))
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!room) return (
    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] mt-10 shadow-xl">
      <p className="text-red-500 font-black uppercase italic tracking-tighter text-xl">Room not found</p>
      <button onClick={() => router.back()} className="mt-4 text-blue-600 font-bold uppercase text-xs tracking-widest hover:underline">
        Go Back to Inventory
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Top Header Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          <ArrowLeft size={16} /> Back to Rooms
        </button>
        
        <div className="flex gap-3">
          <Link
            href={`/admin/rooms/${id}/edit`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <Edit3 size={14} /> Edit Room
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10">
        <div className="flex flex-col md:flex-row">
          
          {/* Room Image Section */}
          <div className="md:w-1/2 relative h-80 md:h-[500px]">
            {room.image ? (
              <img
                src={imageUrl ? imageUrl(room.image) : room.image}
                alt="Room"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 dark:bg-white/5 flex items-center justify-center">
                <Bed size={60} className="text-blue-300 dark:text-white/10" />
              </div>
            )}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-black italic uppercase tracking-tighter">
              Room {room.roomNumber}
            </div>
          </div>

          {/* Room Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-5xl font-black text-black dark:text-white uppercase italic tracking-tighter mb-2">
                Room <span className="text-blue-600">{room.roomNumber}</span>
              </h1>
              <div className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-widest italic">
                <ShieldCheck size={16} /> Admin Verified Status
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Rent</p>
                  <h2 className="text-3xl font-black text-black dark:text-white flex items-center">
                    <IndianRupee size={22} /> {room.rent}
                  </h2>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <IndianRupee size={20} />
                </div>
              </div>

              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Occupancy</p>
                  <h2 className="text-3xl font-black text-black dark:text-white">
                    {room.occupied} / {room.capacity}
                  </h2>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-600/10 flex items-center justify-center text-green-600">
                  <Users size={20} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest text-center">
              Room capacity is {room.occupied >= room.capacity ? "FULL" : "AVAILABLE"} for allotment
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}