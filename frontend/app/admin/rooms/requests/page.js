"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  DoorOpen,
  IndianRupee,
  Inbox,
} from "lucide-react";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const res = await api("/requests");
      setRequests(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api(`/requests/${id}`, "PUT", { status });
      loadRequests();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600" />
      </div>
    );

  return (
    <div className="p-4 md:p-8 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold font-bold text-gray-900 dark:text-white uppercase italic tracking-tighter">
          Allotment <span className="text-blue-600">requests</span>
        </h1>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
          Review and process room application queue
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
          <Inbox size={40} className="text-gray-300 dark:text-gray-700 mb-4" />
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            No pending requests
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all hover:border-blue-500/30"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Student Info */}
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      {r.student?.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {r.student?.email}
                    </p>
                  </div>
                </div>

                {/* Room Mini Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <DoorOpen size={16} className="text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Room {r.room?.roomNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      ₹{r.room?.rent}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {r.room?.occupied}/{r.room?.capacity} filled
                    </span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-4">
                  {r.status !== "pending" ? (
                    <span
                      className={`px-5 py-2 rounded-xl text-xs font-semibold border ${
                        r.status === "accepted"
                          ? "bg-green-50 dark:bg-green-500/10 border-green-200 text-green-600"
                          : "bg-red-50 dark:bg-red-500/10 border-red-200 text-red-600"
                      }`}
                    >
                      {r.status}
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(r._id, "accepted")}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-lg shadow-green-600/20"
                      >
                        <CheckCircle2 size={14} /> Accept
                      </button>
                      <button
                        onClick={() => updateStatus(r._id, "rejected")}
                        className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-5 py-2.5 rounded-xl text-xs font-medium transition-all hover:bg-red-500 hover:text-white active:scale-95"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
