export default function FeeCard({ student, month, amount, status, isAdmin = false }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {isAdmin && <h3 className="font-semibold text-gray-600">{student}</h3>} {/* Admin only */}

      <h3 className="font-semibold text-black">{month}</h3>
      <p className="text-blue-600 font-bold">₹{amount}</p>
      <span
        className={`text-sm ${
          status === "Paid" ? "text-green-600" : "text-red-500"
        }`}
      >
        {status}
      </span>

      {/* Student pay button for pending fees */}
      {!isAdmin && status !== "Paid" && (
        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Pay
        </button>
      )}
    </div>
  );
}
