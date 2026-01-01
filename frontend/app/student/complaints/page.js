"use client";

import { useEffect, useState } from "react";
import ComplaintCard from "@/components/ComplaintCard";
import { api } from "@/lib/api";
import Link from "next/link";
import { getToken, getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { PlusCircle, Info } from "lucide-react"; // Modern Icons

export default function StudentComplaintPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    api("/complaints/my")
      .then((res) => {
        if (res.success) setComplaints(res.complaints);
        else setError(res.message || "Error fetching complaints");
      })
      .catch((err) => setError(err.message || "Error fetching complaints"))
      .finally(() => setLoading(false));
  }, [router]);

  // Loading state with Dark Mode support
  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            My <span className="text-blue-600">Complaints</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
            Track your service requests
          </p>
        </div>

        <Link
          href="/student/complaints/new"
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/30 active:scale-95"
        >
          <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          New Complaint
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <Info size={18} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {/* Complaints Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {complaints.map((c) => (
          <ComplaintCard
            key={c._id}
            title={c.title}
            description={c.description}
            status={c.status}
          />
        ))}
      </div>

      {/* Empty State */}
      {complaints.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
          <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-full mb-4">
            <Info size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">No complaints found</p>
          <Link href="/student/complaints/new" className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-black hover:underline underline-offset-4">
            Raise your first complaint now
          </Link>
        </div>
      )}
    </div>
  );
}