import DashboardCard from "@/components/DashboardCard";

export default function StudentDashboard() {
  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <DashboardCard
          title="Room No"
          value="203"
          icon="🏠"
        />

        <DashboardCard
          title="Monthly Fee"
          value="₹3,500"
          icon="💰"
        />

        <DashboardCard
          title="Fee Status"
          value="Pending"
          icon="⏳"
        />

        <DashboardCard
          title="Complaints"
          value="1 Pending"
          icon="⚠️"
        />

      </div>
    </div>
  );
}
