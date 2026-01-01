"use client";

import DashboardCard from "@/components/DashboardCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser, logout } from "@/lib/auth";
import { api } from "@/lib/api";
import { Home, IndianRupee, Clock, AlertTriangle, ShieldCheck } from "lucide-react"; // Lucide icons for better look

export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    roomNumber: null,
    monthlyFeeAmount: 0,
    monthlyFeeStatus: "N/A",
    pendingComplaints: 0,
    myRoomStatus: "N/A",
  });

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

    const load = async () => {
      try {
        const res = await api("/student/dashboard");
        if (res.success) {
          setStats(res.data);
        } else {
          console.error(res.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  // Loading State with Dark Mode Support
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] p-4 sm:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
          Student <span className="text-blue-600">Dashboard</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-1">
          Quick Overview of your hostel status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Room No"
          value={stats.roomNumber ?? "Not allotted"}
          icon={<Home className="w-6 h-6" />}
          onClick={() => router.push("/student/rooms/my-room")}
        />
        
        <DashboardCard
          title="Monthly Fee"
          value={`₹${stats.monthlyFeeAmount}`}
          icon={<IndianRupee className="w-6 h-6" />}
          onClick={() => router.push("/student/fee")}
        />
        
        <DashboardCard
          title="Fee Status"
          value={stats.monthlyFeeStatus}
          icon={<Clock className="w-6 h-6" />}
          onClick={() => router.push("/student/fee")}
        />
        
        <DashboardCard
          title="Complaints"
          value={`${stats.pendingComplaints} Pending`}
          icon={<AlertTriangle className="w-6 h-6" />}
          onClick={() => router.push("/student/complaints")}
        />
{/* 
        <DashboardCard
          title="My Room Status"
          value={stats.myRoomStatus}
          icon={<ShieldCheck className="w-6 h-6" />}
          onClick={() => router.push("/student/rooms/my-room")}
        /> */}
      </div>

      {/* Decorative background element for Dark Mode */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-10 dark:opacity-20 pointer-events-none">
        <h1 className="text-[20rem] font-black leading-none select-none">STAY</h1>
      </div>
    </div>
  );
}