"use client";

import { useEffect, useState } from "react";
import FeeCard from "@/components/FeeCard";
import { api } from "@/lib/api";
import { getToken, getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { IndianRupee, Info } from "lucide-react"; // Icons for modern look

export default function StudentFeePage() {
  const router = useRouter();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFees = async () => {
    try {
      setError("");
      const res = await api("/fees/my");
      if (res.success) setFees(res.fees);
      else setError(res.message || "Error fetching fees");
    } catch (err) {
      setError(err.message || "Error fetching fees");
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
    if (user.role !== "student") {
      logout();
      return;
    }

    fetchFees();
  }, [router]);

  async function payFee(feeId) {
    if (!confirm("Confirm payment?")) return;
    try {
      const res = await api(`/fees/pay/${feeId}`, "PUT");
      if (res.success) {
        alert("Payment Successful");
        fetchFees();
      } else {
        alert(res.message);
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
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
          Fee <span className="text-blue-600">Records</span>
        </h1>
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
          Manage your payments and dues
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <Info size={18} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {/* Fees Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fees.length > 0 ? (
          fees.map((f) => (
            <FeeCard
              key={f._id}
              roomNumber={f.roomNumber}
              month={f.month}
              amount={f.amount}
              status={f.status}
              onPay={() => payFee(f._id)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
            <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-full mb-4">
              <IndianRupee size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              No fee records found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}