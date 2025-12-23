import ComplaintCard from "@/components/ComplaintCard";

export default function AdminComplaintPage() {
  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-2xl font-bold text-black mb-6">Student Complaints</h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <ComplaintCard title="Room 203 – Water Leak" status="Pending" />
      </div>
    </div>
  );
}
