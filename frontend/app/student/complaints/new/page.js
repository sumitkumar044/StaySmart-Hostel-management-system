"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Send, ArrowLeft } from "lucide-react"; // Icons for premium feel
import Link from "next/link";

export default function NewComplaintPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await api("/complaints", "POST", {
      title,
      description,
    });

    if (res.success) {
      router.push("/student/complaints");
    }
    setLoading(false);
  };

  const inputClass = 
    "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 " +
    "bg-gray-50 dark:bg-white/5 text-black dark:text-white " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <Link 
        href="/student/complaints" 
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors mb-6 font-bold uppercase text-[10px] tracking-widest"
      >
        <ArrowLeft size={16} /> Back to Complaints
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-white/10">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-black dark:text-white uppercase italic tracking-tighter">
            Raise <span className="text-blue-600">Complaint</span>
          </h2>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
            Explain your issue, we'll fix it soon.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Issue Title
            </label>
            <input
              className={inputClass}
              placeholder="E.g. Fan not working"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Detailed Description
            </label>
            <textarea
              className={`${inputClass} min-h-[150px] resize-none`}
              placeholder="Describe the problem in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : (
              <>
                <Send size={18} />
                Submit Complaint
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}