"use client";

import { useEffect, useState } from "react";
import ComplaintCard from "@/components/ComplaintCard";
import { api } from "@/lib/api";
import { getToken, getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, ClipboardList } from "lucide-react";

export default function AdminComplaintPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const res = await api("/complaints/all");
      if (res.success) setComplaints(res.complaints);
      else setError(res.message || "Error fetching complaints");
    } catch (err) {
      setError(err.message || "Error fetching complaints");
    } finally {
      setLoading(false);
    }
  };

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

    load();
  }, [router]);

  const handleResolve = async (id) => {
    try {
      await api(`/complaints/${id}`, "PUT", { status: "resolved" });
      load();
    } catch (err) {
      alert("Failed to resolve: " + err.message);
    }
  };

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            Student <span className="text-blue-600">Complaints</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
            Review and resolve hostel issues
          </p>
        </div>

        {/* Stats Summary */}
        <div className="flex gap-4">
          <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 px-4 py-2 rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="text-orange-600" />
            <span className="text-xs font-black text-orange-700 dark:text-orange-400">
              {complaints.filter(c => c.status !== 'resolved').length} PENDING
            </span>
          </div>
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 px-4 py-2 rounded-2xl flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-xs font-black text-green-700 dark:text-green-400">
              {complaints.filter(c => c.status === 'resolved').length} FIXED
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-600 font-bold text-sm">
          {error}
        </div>
      )}

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {complaints.length > 0 ? (
          complaints.map((c) => (
            <div key={c._id} className="relative group">
              <ComplaintCard
                title={c.title}
                description={c.description}
                status={c.status}
                student={c.student}
                roomNumber={c.roomNumber}
                onResolve={() => handleResolve(c._id)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
            <ClipboardList size={40} className="text-gray-300 dark:text-gray-700 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              No complaints to show
            </p>
          </div>
        )}
      </div>
    </div>
  );
}