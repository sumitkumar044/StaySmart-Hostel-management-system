import ComplaintCard from "@/components/ComplaintCard";

export default function StudentComplaintPage() {
  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">My Complaints</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + New Complaint
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <ComplaintCard title="Water Issue" status="Pending" />
        <ComplaintCard title="Fan Repair" status="Resolved" />
      </div>
    </div>
  );
}
