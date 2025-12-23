export default function RoomCard({
  image,
  title,
  price,
  discount,
  isAdmin = false
}) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src={image}
        alt="room"
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>

        <div className="flex items-center gap-2 mt-2">
          {discount && (
            <span className="text-sm text-red-500 line-through">
              ₹{price}
            </span>
          )}
          <span className="text-lg font-bold text-blue-600">
            ₹{discount || price}
          </span>
        </div>

        {isAdmin ? (
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
            Edit Room
          </button>
        ) : (
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">
            Book Room
          </button>
        )}
      </div>
    </div>
  );
}
