import { Dispatch } from "react";
import { publicRequest } from "./requestMethod";
import { createRoom, deleteRoom } from "../redux/roomRedux";
import { IRoom } from "../types";
import { socket } from "../App";
export const deleteRoomDispatcher = async (
  dispatch: Dispatch<any>,
  roomId: string
) => {
  try {
    dispatch(deleteRoom(roomId));
    await publicRequest.delete(`/room/delete/${roomId}`).then(() => {
      console.log("deleted");
    });
  } catch (err) {
    console.log(err);
  }
};
export const createRoomDispatcher = async (
  dispatch: Dispatch<any>,
  room: IRoom
) => {
  try {
    // await publicRequest.post("/room/create", room).then((response) => {
    //   dispatch(createRoom(response.data));
    // }); //if not realtime
    //if using socket io
    socket.emit("createRoom", {
      users: room.users,
      isPrivate: room.isPrivate,
      room_name: room.room_name,
      room_host: room.room_host,
    });
  } catch (err) {
    console.log(err);
  }
};
