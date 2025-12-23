import DashboardCard from "@/components/DashboardCard";

export default function AdminDashboard() {
  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Students" value="120" icon="🎓" />
        <DashboardCard title="Total Rooms" value="45" icon="🏢" />
        <DashboardCard title="Pending Fees" value="₹18,000" icon="💸" />
        <DashboardCard title="Complaints" value="7 Open" icon="⚠️" />
      </div>
    </div>
  );
}
