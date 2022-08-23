import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { IRoom } from "../types";
import { publicRequest } from "../utils/requestMethod";
import MuiTab from "./muiTab/MuiTab";
const Profile = ({ setShowRight }: { setShowRight: any }) => {
  const [roomId, setRoomId] = useState(window.location.href.split("/")[4]);
  const [members, setMembers] = useState([]);
  const [room, setRoom] = useState({});
  const insideRef = useRef(null);
  useOnClickOutside(insideRef, () => {
    setShowRight(false);
  });
  useEffect(() => {
    setRoomId(window.location.href.split("/")[4]);
  }, [window.location.href]);
  useEffect(() => {
    const getRoom = async () => {
      try {
        await publicRequest
          .get(`/room/get/${roomId}`)
          .then((response) => setRoom(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    const getMembers = async () => {
      try {
        await publicRequest
          .get("/user/get_from_room", {
            params: {
              roomId: roomId,
            },
          })
          .then((response) => setMembers(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getMembers();
    getRoom();
  }, [roomId]);
  return (
    <div
      ref={insideRef}
      className="w-[420px] dark:bg-dark-dark border-l dark:border-l-white flex flex-col h-screen right-0 transition-all"
    >
      <div className="top sticky py-2 h-[64px] px-4 gap-x-4 dark:text-gray-sm flex items-center dark:bg-dark-bg">
        <CloseIcon
          className="cursor-pointer hover:text-white"
          onClick={() => setShowRight(false)}
        />
        <span className="text-lg font-medium text-white">Profile</span>
      </div>
      <div className="w-full overflow-y-scroll">
        <div className="relative w-full h-[420px] bg-blue-500">
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-4xl">C</span>
          </div>
          <div className="absolute bottom-0 w-full p-4 pt-6  bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0))] ">
            <h3 className="text-xl font-semibold">
              {(room as IRoom)?.room_name}
            </h3>
            <span>323 members, 14 online</span>
          </div>
        </div>
        <div className="p-2">
          <div className="flex w-full gap-4 p-2 rounded-lg dark:hover:bg-dark-item-hover">
            <div className="dark:text-gray-sm">
              <InfoOutlinedIcon />
            </div>
            <div>
              <p className="font-medium">Nothing</p>
              <span className="text-sm dark:text-gray-sm">Bio</span>
            </div>
          </div>
        </div>

        <div className="">
          <MuiTab members={members} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
