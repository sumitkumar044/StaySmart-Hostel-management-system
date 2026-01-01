"use client";
import {
  CreditCard,
  Calendar,
  User,
  DoorOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function FeeCard({
  student,
  roomNumber,
  month,
  amount,
  status,
  isAdmin = false,
  onPay,
}) {
  const isPaid = status === "Paid";

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all hover:scale-[1.02] font-sans">
      {/* Header: Month & Status Badge */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-600/10 rounded-2xl text-blue-600">
            <Calendar size={20} />
          </div>
          <div>
            {/* Billing label – normal case, no extra tracking */}
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Billing month
            </p>
            {/* Month – no uppercase / italic / tight tracking */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {month}
            </h3>
          </div>
        </div>

        {/* Status badge – no uppercase/italic/tracking */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isPaid
              ? "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600"
              : "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-600"
          }`}
        >
          {isPaid ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
          <span>{status}</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-3 mb-8">
        {isAdmin && (
          <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <User size={14} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {student}
              </span>
            </div>
            {roomNumber && (
              <div className="flex items-center gap-2">
                <DoorOpen size={14} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-500">
                  #{roomNumber}
                </span>
              </div>
            )}
          </div>
        )}

        {!isAdmin && roomNumber && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <DoorOpen size={16} className="text-blue-500" />
            <p className="text-sm font-medium">
              Room number:{" "}
              <span className="text-gray-900 dark:text-white">
                {roomNumber}
              </span>
            </p>
          </div>
        )}

        {/* Amount Display – no italic / tight tracking */}
        <div className="flex items-baseline gap-1 pt-2">
          <span className="text-sm font-medium text-gray-500">₹</span>
          <span className="text-3xl font-semibold text-gray-900 dark:text-white">
            {amount}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {onPay && !isPaid ? (
        <button
          onClick={onPay}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-semibold transition-all active:scale-95 shadow-lg shadow-blue-600/30"
        >
          <CreditCard size={16} />
          Pay invoice now
        </button>
      ) : (
        isPaid && (
          <div className="w-full py-3 rounded-2xl border border-green-500/30 text-green-600/80 text-xs font-medium text-center">
            Transaction completed
          </div>
        )
      )}
    </div>
  );
}
