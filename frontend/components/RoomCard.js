"use client";
import Link from "next/link";
import { useState } from "react";
import { imageUrl } from "@/lib/imageUrl";
import { DoorOpen, Users, ArrowRight, Star } from "lucide-react";

export default function RoomCard({ room, onApply, isAdmin = false }) {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!onApply) return;
    setLoading(true);
    try {
      await onApply(room._id);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const rent = Number(room.rent) || 0;
  const originalPrice = rent + 500;
  const isFull = room.occupied >= room.capacity;

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none group transition-all hover:scale-[1.02] hover:border-blue-500/30 font-sans">
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        {room.image ? (
          <img
            src={imageUrl(room.image)}
            alt="Room"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
            <DoorOpen size={40} className="text-gray-300" />
          </div>
        )}

        {/* Status Badge on Image */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
            isFull ? "bg-red-500/80 text-white" : "bg-green-500/80 text-white"
          }`}
        >
          {isFull ? "Full" : "Available"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            {/* Title – no uppercase/italic/tight tracking */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white leading-snug mb-1">
              Room {room.roomNumber}
            </h3>
            {/* Subtitle – normal case */}
            <p className="text-xs font-medium text-blue-600">
              Elite resident suite
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-400 line-through">
              ₹{originalPrice}
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              ₹{rent}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-8 py-3 border-y border-gray-50 dark:border-white/5">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {room.occupied}/{room.capacity} filled
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-orange-400 fill-orange-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Premium
            </span>
          </div>
        </div>

        {/* Action Button */}
        {!isAdmin ? (
          <button
            onClick={handleApply}
            disabled={loading || isFull}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold transition-all active:scale-95 shadow-lg ${
              isFull
                ? "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
            }`}
          >
            {loading ? "Processing..." : isFull ? "House full" : "Apply now"}
            {!isFull && <ArrowRight size={14} />}
          </button>
        ) : (
          <Link
            href={`/admin/rooms/${room._id}`}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-black/10"
          >
            Manage room <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
