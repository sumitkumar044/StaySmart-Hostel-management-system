"use client";
import { CheckCircle, Clock, User, DoorOpen, MessageSquare } from "lucide-react";

export default function ComplaintCard({
  title,
  description,
  status,
  student,
  roomNumber,
  onResolve,
}) {
  const isResolved = status === "resolved";

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all hover:border-blue-500/30 font-sans">
      {/* Status Badge at Top */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
            isResolved
              ? "bg-green-50 dark:bg-green-500/10 text-green-600 border-green-100 dark:border-green-500/20"
              : "bg-orange-50 dark:bg-orange-500/10 text-orange-600 border-orange-100 dark:border-orange-500/20"
          }`}
        >
          {isResolved ? <CheckCircle size={12} /> : <Clock size={12} />}
          <span>{status}</span>
        </div>

        {roomNumber && (
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
            <DoorOpen size={14} className="text-blue-500" />
            <span>Room {roomNumber}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        {/* Title – no uppercase/italic/tight tracking */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
          <User size={14} className="text-blue-500" />
          <p className="text-sm font-medium">
            {student?.name || "Unknown resident"}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex gap-2">
            <MessageSquare size={14} className="text-gray-400 shrink-0 mt-1" />
            <p className="text-sm text-gray-700 dark:text-gray-300 font-normal leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {onResolve && !isResolved && (
        <button
          onClick={onResolve}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-all active:scale-95 shadow-lg shadow-blue-600/20"
        >
          <CheckCircle size={14} />
          Mark as resolved
        </button>
      )}

      {isResolved && (
        <div className="w-full py-3 rounded-xl border border-green-500/30 text-green-600/80 text-xs font-medium text-center">
          Issue has been settled
        </div>
      )}
    </div>
  );
}
