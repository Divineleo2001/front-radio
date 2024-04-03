import Loading from "@/app/loading";
import RoomList from "@/modules/rooms/RoomList";
import { getRooms } from "@/server_actions/(get-requests)/getRooms";
import React, { Suspense } from "react";

const RoomsPage = () => {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Rooms</h1>
        </div>
        <Rooms />
      </div>
    </main>
  );
};

export default RoomsPage;

const Rooms = async () => {
  const rooms = await getRooms();

  return (
    <Suspense fallback={<Loading />}>
      <h1>Rooms</h1>
      <RoomList rooms={rooms} />
    </Suspense>
  );
};
