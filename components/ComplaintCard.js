export default function ComplaintCard({ title, status }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold text-black">{title}</h3>

      <span
        className={`text-sm ${
          status === "Resolved"
            ? "text-green-600"
            : "text-orange-500"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
