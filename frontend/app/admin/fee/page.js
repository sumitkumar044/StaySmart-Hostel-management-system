"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeeCard from "@/components/FeeCard";
import { api } from "@/lib/api";
import { getToken, getUser, logout } from "@/lib/auth";
import { PlusCircle, X, IndianRupee, History, Search } from "lucide-react";

export default function AdminFeePage() {
  const router = useRouter();
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFees = async () => {
    try {
      const res = await api("/fees/all");
      if (res.success) setFees(res.fees);
    } catch (err) {
      alert(err.message);
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

    fetchFees();
  }, [router]);

  const submitFee = async () => {
    if (!roomNumber || !amount || !month) {
      alert("All fields required");
      return;
    }

    try {
      const res = await api("/fees/add", "POST", {
        roomNumber,
        amount,
        month,
      });

      if (res.success) {
        setRoomNumber("");
        setAmount("");
        setMonth("");
        setShowForm(false);
        fetchFees();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const markPaid = async (feeId) => {
    if (!confirm("Mark this fee as PAID?")) return;

    try {
      const res = await api(`/fees/${feeId}`, "PUT");
      if (res.success) fetchFees();
      else alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const inputClass = "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder:text-gray-400 mb-4 transition-all";

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            Fee <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
            Track and record student payments
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/30 active:scale-95"
        >
          <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Add New Fee
        </button>
      </div>

      {/* ADD FEE MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 dark:border-white/10 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black text-black dark:text-white uppercase italic tracking-tighter">
                Record <span className="text-blue-600">Fee</span>
              </h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enter payment details</p>
            </div>

            <div className="space-y-1">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Room No</label>
               <input placeholder="e.g., 201" className={inputClass} value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
               
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Amount</label>
               <input placeholder="5000" type="number" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} />
               
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Month & Year</label>
               <input placeholder="Jan 2026" className={inputClass} value={month} onChange={(e) => setMonth(e.target.value)} />
            </div>

            <button
              onClick={submitFee}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              Save Record
            </button>
          </div>
        </div>
      )}

      {/* FEE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fees.length > 0 ? (
          fees.map((f) => (
            <div key={f._id} className="flex flex-col gap-3">
              <FeeCard
                student={f.student?.name}
                roomNumber={f.roomNumber}
                month={f.month}
                amount={f.amount}
                status={f.status}
                isAdmin
              />

              {f.status !== "Paid" && (
                <button
                  onClick={() => markPaid(f._id)}
                  className="w-full bg-white dark:bg-white/5 border border-blue-600 text-blue-600 dark:text-blue-400 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  Mark as Paid
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
            <History size={40} className="text-gray-300 dark:text-gray-700 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">No fee records found</p>
          </div>
        )}
      </div>
    </div>
  );
}