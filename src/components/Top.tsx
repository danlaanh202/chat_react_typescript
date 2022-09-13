import { useEffect, useState } from "react";
import DotVertical from "../icons/DotVertical";
import SearchIcon from "../icons/SearchIcon";
import { IRoom } from "../types";
import { publicRequest } from "../utils/requestMethod";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThreeDotMenu from "./muiMenu/ThreeDotMenu";
import { showSidebar } from "../redux/screenRedux";
import { useDispatch } from "react-redux";

const Top = ({
  roomId,
  setShowRight,
  topRef,
}: {
  roomId?: string;
  setShowRight?: any;
  topRef?: any;
}) => {
  const dispatch = useDispatch();
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
    <div
      ref={topRef}
      className="z-10 flex justify-between w-full h-full px-4 bg-white max-h-16 dark:bg-dark-bg"
    >
      <div className="flex items-center gap-3 my-2 cursor-pointer">
        <div
          onClick={() => {
            dispatch(showSidebar());
          }}
          className="md:hidden "
        >
          <ArrowBackIcon />
        </div>
        <Avatar
          onClick={() => setShowRight((prev: Boolean) => !prev)}
          children={room?.room_name?.charAt(0)}
        />
        <div
          onClick={() => setShowRight((prev: Boolean) => !prev)}
          className=""
        >
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
