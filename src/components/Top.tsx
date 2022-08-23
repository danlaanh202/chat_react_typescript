import { useEffect, useState } from "react";
import DotVertical from "../icons/DotVertical";
import SearchIcon from "../icons/SearchIcon";
import { IRoom } from "../types";
import { publicRequest } from "../utils/requestMethod";
import Avatar from "@mui/material/Avatar";

import ThreeDotMenu from "./muiMenu/ThreeDotMenu";

const Top = ({
  roomId,
  setShowRight,
}: {
  roomId?: string;
  setShowRight?: any;
}) => {
  const [room, setRoom] = useState<IRoom>();
  useEffect(() => {
    const getRoom = async () => {
      try {
        await publicRequest.get(`/room/get/${roomId}`).then((response) => {
          setRoom(response.data);
        });
      } catch (error) {}
    };
    getRoom();
  }, [roomId]);

  return (
    <div className="z-10 flex justify-between w-full h-full px-4 max-h-16 bg-dark-bg">
      <div
        onClick={() => setShowRight((prev: Boolean) => !prev)}
        className="flex items-center gap-3 my-2 cursor-pointer"
      >
        <Avatar children={room?.room_name?.charAt(0)} />
        <div className="">
          <h4 className="font-semibold">{room?.room_name}</h4>
          <span className="text-xs text-gray-sm">304 members, 9 online</span>
        </div>
      </div>
      <div className="flex items-center h-full gap-4">
        <SearchIcon className="text-gray-sm" />
        <ThreeDotMenu roomId={roomId} />
      </div>
    </div>
  );
};

export default Top;
