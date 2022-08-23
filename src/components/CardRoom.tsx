import { MouseEventHandler } from "react";
import { IRoom } from "../types";
import { dateToTele } from "../utils/dateToTele";
import Avatar from "@mui/material/Avatar";

const CardRoom = ({
  lastMsg = {},
  isActive = true,
  room,
  onClick,
}: {
  room: IRoom;
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  lastMsg?: {
    username?: string;
    message?: string;
    time?: string;
  };
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-full p-4 rounded-xl cursor-pointer ${
        isActive ? "dark:bg-primary-color" : ""
      }`}
    >
      <Avatar children={room.room_name?.charAt(0)} />

      <div className="flex flex-col justify-center flex-1 px-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{room?.room_name}</h4>
          <span
            className={`text-sm font-medium ${
              isActive ? "text-white" : "text-gray-lg"
            }`}
          >
            {dateToTele(room?.updated_at as Date)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className={` ${isActive ? "text-white" : "text-gray-lg"}`}>
            <span className="text-white">Rose</span>: chao ban
          </div>
          <span className="block px-2 py-[2px] text-sm bg-gray-600 rounded-xl">
            209
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
