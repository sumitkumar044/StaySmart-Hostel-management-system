// app/admin/students/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getToken, getUser, logout } from "@/lib/auth";
import { UserCircle, Mail, Phone, DoorOpen, Trash2, Search, Users } from "lucide-react";

export default function AdminStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const load = async () => {
    try {
      const res = await api("/admin/students-summary");
      if (res.success) setStudents(res.students);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user || user.role !== "admin") {
      logout();
      router.replace("/login");
      return;
    }
    load();
  }, [router]);

  async function handleDelete(studentId) {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await api(`/admin/students/${studentId}`, "DELETE");
      setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
    } catch (err) {
      alert(err.message);
    }
  }

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roomNumber?.toString().includes(searchTerm)
  );

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-t-2 border-blue-600 rounded-full"></div></div>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
          All <span className="text-blue-600">Students</span>
        </h1>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((s) => (
          <div key={s.studentId} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-[2rem] p-6 shadow-xl transition-all hover:border-blue-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Users size={24} />
              </div>
              <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">
                {s.name} {/* Name ko prominent kiya */}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <DoorOpen size={16} className="text-blue-500" />
                <p className="text-sm font-bold italic">Room: {s.roomNumber || "Not Assigned"}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <p className="text-sm truncate">{s.email}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <p className="text-sm">{s.phone || "No phone"}</p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(s.studentId)}
              className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
              <Trash2 size={14} /> Remove Resident
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}