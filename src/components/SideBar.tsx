import { ChangeEvent, useEffect, useState } from "react";

import { publicRequest } from "../utils/requestMethod";
import CardRoom from "./CardRoom";
import CreateRoomDialog from "./dialog/CreateRoomDialog";

import { IMessage, IRoom, IUser, TRoom } from "../types";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { createRoom, getMyRooms, updateRoom } from "../redux/roomRedux";
import { useNavigate } from "react-router-dom";

import MuiMenu from "./muiMenu/MuiMenu";
import SidebarMenu from "./muiMenu/SidebarMenu";
import { showMain } from "../redux/screenRedux";
import { showThingsMobile } from "../utils/showThingsMobile";
import useDebounce from "../hooks/useDebounce";
import { socket } from "../App";
const SideBar = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [roomId, setRoomId] = useState<string>(
    window.location.href.split("/")[5]
  );
  const searchTextDebounce = useDebounce(searchText, 500);
  useEffect(() => {
    setRoomId(window.location.href.split("/")[5]);
  }, [window.location.href]);
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const show = useSelector((state: IRootState) => state.screen);
  const rooms = useSelector((state: IRootState) => state.room.rooms as IRoom[]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getRooms = async () => {
      try {
        await publicRequest
          .get<TRoom>("/room/get_my_room", {
            params: {
              _id: currentUser?._id,
              search_text: searchTextDebounce,
            },
          })
          .then((response) => {
            dispatch(getMyRooms(response.data));
          });
      } catch (err) {}
    };
    getRooms();
  }, [searchTextDebounce]);

  useEffect(() => {
    socket.on("update_room_create", (data) => {
      dispatch(createRoom(data));
    });
    socket.on("update_room_add", (data) => {
      dispatch(updateRoom(data));
    });
    socket.on("receivemsg", ({ updatedRoom }: { updatedRoom: IRoom }) =>
      dispatch(updateRoom(updatedRoom))
    );
  }, [socket]);
  return (
    <div
      className={`transition-all absolute top-0 left-0 h-full md:left-auto md:relative ${showThingsMobile(
        show
      )}`}
    >
      <div
        className="md:w-96 w-screen 
       relative lg:w-[420px] h-full dark:text-white bg-white text-black dark:bg-dark-bg flex flex-col "
      >
        <div className="flex items-center py-1 my-2">
          <SidebarMenu />
          <input
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            type="text"
            className="flex-1 px-4 py-2 mx-4 bg-transparent border border-gray-sm placeholder:text-gray-sm rounded-3xl"
            placeholder="Search room's name"
          />
        </div>
        <div className="flex-1 mx-2 overflow-y-scroll sm-scroll sidebar-room">
          {rooms?.map((item: IRoom, index) => (
            <CardRoom
              key={item._id}
              room={item}
              isActive={item._id === roomId}
              onClick={(e) => {
                dispatch(showMain());
                navigate(`/r/${item._id}`);
              }}
            />
          ))}
        </div>
        <div className="absolute p-2 rounded-full cursor-pointer bottom-10 right-8 bg-light-primary-color dark:bg-primary-color">
          <MuiMenu setShowDialog={setShowDialog} />
        </div>
      </div>
      {showDialog && (
        <CreateRoomDialog open={showDialog} setShow={setShowDialog} />
      )}
    </div>
  );
};

export default SideBar;
