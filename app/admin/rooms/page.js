import RoomCard from "@/components/RoomCard";

export default function AdminRoomsPage() {
  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Manage Rooms</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoomCard
          image="/room1.jpg"
          title="Room 202"
          price="4000"
          discount="3500"
          isAdmin
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 203"
          price="5000"
          discount="4500"
          isAdmin
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 204"
          price="5000"
          discount="4000"
          isAdmin
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 205"
          price="6000"
          discount="5000"
          isAdmin
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 206"
          price="3000"
          discount="2500"
          isAdmin
        />
      </div>
    </div>
  );
}
