"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import RoomForm from "@/components/RoomForm";
import { ArrowLeft, Edit3, Loader2 } from "lucide-react";

export default function EditRoom() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api(`/rooms/${id}`)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const submit = async (data) => {
    try {
      // api helper with 'true' means it handles FormData (for image upload)
      await api(`/rooms/${id}`, "PUT", data, true);
      router.push("/admin/rooms");
      router.refresh();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          <ArrowLeft size={16} /> Discard Changes
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        {/* Banner Section */}
        <div className="bg-blue-600 p-8 md:p-12 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Edit3 size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
              Update <span className="opacity-70 text-black">Room Info</span>
            </h1>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 ml-1">
            Editing Record ID: {id.slice(-6).toUpperCase()}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 md:p-12">
          <div className="bg-gray-50 dark:bg-white/5 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-white/5">
             {/* Yahan aapka RoomForm render hoga */}
            <RoomForm initialData={room} onSubmit={submit} isEditing={true} />
          </div>
        </div>
      </div>

      {/* Helper Footer */}
      <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
        Make sure to verify the room capacity before saving
      </p>
    </div>
  );
}