import { useEffect, useState } from "react";
import MenuIcon from "../icons/MenuIcon";

import { publicRequest } from "../utils/requestMethod";
import CardRoom from "./CardRoom";
import CreateRoomDialog from "./dialog/CreateRoomDialog";

import { IRoom, IUser, TRoom } from "../types";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { getMyRooms } from "../redux/roomRedux";
import { useNavigate } from "react-router-dom";

import MuiMenu from "./muiMenu/MuiMenu";
import SidebarMenu from "./muiMenu/SidebarMenu";
const SideBar = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [roomId, setRoomId] = useState<string>(
    window.location.href.split("/")[4]
  );
  useEffect(() => {
    setRoomId(window.location.href.split("/")[4]);
  }, [window.location.href]);
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const rooms = useSelector((state: IRootState) => state.room.rooms as IRoom[]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getRooms = async () => {
      console.log(currentUser._id);
      try {
        await publicRequest
          .get<TRoom>("/room/get_my_room", {
            params: {
              _id: currentUser?._id,
            },
          })
          .then((response) => {
            dispatch(getMyRooms(response.data));
          });
      } catch (err) {}
    };
    getRooms();
  }, []);
  return (
    <>
      <div className="w-96  relative lg:w-[420px] h-full text-white dark:bg-dark-bg flex flex-col ">
        <div className="flex items-center my-2">
          <SidebarMenu />
          <input
            type="text"
            className="flex-1 px-4 py-3 mx-4 bg-transparent border border-gray-sm placeholder:text-gray-sm rounded-3xl"
            placeholder="Search"
          />
        </div>
        <div className="flex-1 mx-2 overflow-y-scroll sm-scroll sidebar-room">
          {rooms?.map((item: IRoom, index) => (
            <CardRoom
              key={item._id}
              room={item}
              isActive={item._id === roomId}
              onClick={(e) => {
                navigate(`/r/${item._id}`);
              }}
            />
          ))}
        </div>
        <div className="absolute p-2 rounded-full cursor-pointer bottom-10 right-8 bg-primary-color">
          <MuiMenu setShowDialog={setShowDialog} />
        </div>
      </div>
      {showDialog && (
        <CreateRoomDialog open={showDialog} setShow={setShowDialog} />
      )}
    </>
  );
};

export default SideBar;
