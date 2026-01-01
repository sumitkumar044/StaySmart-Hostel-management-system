"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import RoomForm from "@/components/RoomForm";
import { ArrowLeft, PlusCircle, Building2 } from "lucide-react";

export default function AddRoom() {
  const router = useRouter();

  const submit = async (formData) => {
    try {
      // api helper with 'true' for multipart/form-data (image upload)
      const res = await api("/rooms", "POST", formData, true);
      if (res.success || res._id) {
        router.push("/admin/rooms");
        router.refresh();
      } else {
        alert(res.message || "Failed to add room");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Navigation */}
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors font-black uppercase text-[10px] tracking-[0.2em]"
        >
          <ArrowLeft size={16} /> Cancel & Return
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-slate-900 dark:bg-blue-600 p-8 md:p-12 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
              <PlusCircle size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
              Register <span className="text-blue-400 dark:text-black">New Room</span>
            </h1>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 ml-1">
            Fill in the details to expand hostel inventory
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 md:p-12">
          <div className="bg-gray-50 dark:bg-white/5 rounded-[2rem] p-6 md:p-10 border border-gray-100 dark:border-white/5 relative">
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-2xl shadow-xl hidden md:block">
              <Building2 size={24} />
            </div>
            
            {/* RoomForm Component */}
            <RoomForm onSubmit={submit} />
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
        <div className="h-px w-8 bg-gray-200 dark:bg-white/10"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-center">
          Admin Secured Entry System
        </p>
        <div className="h-px w-8 bg-gray-200 dark:bg-white/10"></div>
      </div>
    </div>
  );
}