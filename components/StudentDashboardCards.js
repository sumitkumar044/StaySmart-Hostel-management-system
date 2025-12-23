import DashboardCard from "@/components/DashboardCard";

export default function StudentDashboard() {
  return (
    <div className="h-[calc(100vh-56px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-6">
        <DashboardCard title="Room No" value="A-102" icon="🏠" />
        <DashboardCard title="Monthly Fee" value="₹5,000" icon="💰" />
        <DashboardCard title="Fee Status" value="Paid" icon="✅" />
        <DashboardCard title="Complaints" value="1 Pending" icon="🛠️" />
      </div>
    </div>
  );
}
