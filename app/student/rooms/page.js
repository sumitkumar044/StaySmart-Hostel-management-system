import RoomCard from "@/components/RoomCard";

export default function StudentRoomPage() {
  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Available Rooms</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoomCard
          image="/room1.jpg"
          title="Room 203 - AC"
          price="4500"
          discount="3500"
        />

        <RoomCard
          image="/room2.jpg"
          title="Room 305 - Non AC"
          price="3000"
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 203 - AC"
          price="4500"
          discount="3500"
        />

        <RoomCard
          image="/room2.jpg"
          title="Room 305 - Non AC"
          price="3000"
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 203 - AC"
          price="4500"
          discount="3500"
        />

        <RoomCard
          image="/room2.jpg"
          title="Room 305 - Non AC"
          price="3000"
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 203 - AC"
          price="4500"
          discount="3500"
        />

        <RoomCard
          image="/room2.jpg"
          title="Room 305 - Non AC"
          price="3000"
        />
        <RoomCard
          image="/room1.jpg"
          title="Room 203 - AC"
          price="4500"
          discount="3500"
        />

        <RoomCard
          image="/room2.jpg"
          title="Room 305 - Non AC"
          price="3000"
        />
      </div>
    </div>
  );
}
