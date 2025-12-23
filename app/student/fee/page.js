import FeeCard from "@/components/FeeCard";

export default function StudentFeePage() {
  const fees = [
    { month: "January", amount: 3500, status: "Paid" },
    { month: "February", amount: 3500, status: "Pending" },
    { month: "March", amount: 3500, status: "Paid" },
  ];

  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">My Fees</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fees.map((f, i) => (
          <FeeCard
            key={i}
            month={f.month}
            amount={f.amount}
            status={f.status}
          />
        ))}
      </div>
    </div>
  );
}
