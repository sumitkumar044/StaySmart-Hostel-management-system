"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import { api } from "@/lib/api";
import { getToken, getUser, logout } from "@/lib/auth";
import { Users, Home, Wallet, AlertCircle, Inbox } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    pendingFees: 0,
    pendingRequests: 0,
    openComplaints: 0,
  });

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

    const load = async () => {
      try {
        const res = await api("/admin/dashboard");
        if (res.success) setStats(res.data);
        else console.error(res.message);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

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
          Admin <span className="text-blue-600">Console</span>
        </h1>
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
          Hostel Operations & Management Overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users className="w-6 h-6" />}
          onClick={() => router.push("/admin/students")}
        />
        <DashboardCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon={<Home className="w-6 h-6" />}
          onClick={() => router.push("/admin/rooms")}
        />
        <DashboardCard
          title="Pending Fees"
          value={`₹${stats.pendingFees}`}
          icon={<Wallet className="w-6 h-6" />}
          onClick={() => router.push("/admin/fee")}
        />
        <DashboardCard
          title="Complaints"
          value={`${stats.openComplaints} Open`}
          icon={<AlertCircle className="w-6 h-6 text-red-500" />}
          onClick={() => router.push("/admin/complaints")}
        />
        <DashboardCard
          title="Room Requests"
          value={`${stats.pendingRequests} Pending`}
          icon={<Inbox className="w-6 h-6 text-blue-500" />}
          onClick={() => router.push("/admin/rooms/requests")}
        />
      </div>

      {/* Decorative background element for Dark Mode */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none">
        <h1 className="text-[15rem] font-black leading-none select-none italic">ADMIN</h1>
      </div>
    </div>
  );
}