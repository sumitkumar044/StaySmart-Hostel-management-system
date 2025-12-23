import FeeCard from "@/components/FeeCard";

export default function AdminFeePage() {
  const students = [
    { student: "Rahul Kumar", month: "January", amount: 3500, status: "Paid" },
    { student: "Anita Singh", month: "January", amount: 3500, status: "Pending" },
    { student: "Sumit Verma", month: "January", amount: 3500, status: "Paid" },
  ];

  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Student Fees</h1>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
          + Add Fee
        </button> */}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s, i) => (
          <FeeCard
            key={i}
            student={s.student}
            month={s.month}
            amount={s.amount}
            status={s.status}
            isAdmin
          />
        ))}
      </div>
    </div>
  );
}
