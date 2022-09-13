import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { IUser } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
import { publicRequest, userRequest } from "../../utils/requestMethod";
import { createRoomDispatcher } from "../../utils/room";
const CreateRoomDialog = ({
  open,
  setShow,
}: {
  open: boolean;
  setShow: any;
}) => {
  const [room, setRoom] = useState("");
  const [member, setMember] = useState("");
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [checkedUser, setCheckedUser] = useState<IUser[]>([]);
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const dispatch = useDispatch();
  const createRoom = async () => {
    try {
      if (!room) return;
      await createRoomDispatcher(dispatch, {
        users: Array.from(new Set([currentUser?._id, ...checkedIds])),
        room_name: room,
        isPrivate: false,
        room_host: currentUser?._id,
      });
      closeDialog();
    } catch (err) {
      console.log(err);
    }
  };
  const closeDialog = () => {
    setShow(false);
  };
  useEffect(() => {
    const getMember = async () => {
      try {
        await publicRequest
          .get("/user/get_by_username_out_of_room", {
            params: {
              username: member,
              roomId: "",
            },
          })
          .then((response) => setUsers(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  }, [member]);
  const handleCheck = (user: IUser) => {
    if (checkedIds.includes(user._id)) {
      handleRemoveChecked(user);
    } else {
      setCheckedIds((prev) => [...prev, user._id]);
      setCheckedUser((prev) => [...prev, user]);
    }
  };
  const handleRemoveChecked = (user: IUser) => {
    let newCheckedUser = [...checkedUser];
    let newCheckedIds = [...checkedIds];
    let indexOfUser = checkedIds.findIndex((e) => e === user._id);

    newCheckedIds.splice(indexOfUser, 1);
    setCheckedIds(newCheckedIds);
    newCheckedUser.splice(indexOfUser, 1);
    setCheckedUser(newCheckedUser);
  };

  return (
    <div>
      <Dialog
        classes={{
          paper:
            "w-full md:w-auto md:min-w-[500px] dark:bg-dark-bg dark:text-white",
        }}
        open={open}
        onClose={closeDialog}
      >
        <CloseIcon
          onClick={closeDialog}
          fontSize="medium"
          className="absolute text-black rounded-full cursor-pointer dark:text-white top-4 right-4"
        />
        <DialogTitle>New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText className="dark:text-white">
            Fill this form
          </DialogContentText>
          <TextField
            autoFocus
            label="Room's name"
            type="text"
            fullWidth
            variant="standard"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            margin="dense"
            InputProps={{
              classes: {
                input: "dark:text-white ",
              },
            }}
            InputLabelProps={{
              className: "dark:text-gray-sm",
            }}
          />
          <TextField
            label="Search users"
            type="text"
            fullWidth
            value={member}
            variant="standard"
            onChange={(e) => {
              setMember(e.target.value);
            }}
            margin="dense"
            InputProps={{
              classes: {
                input: "dark:text-white ",
              },
            }}
            InputLabelProps={{
              className: "dark:text-gray-sm",
            }}
          />
          <div className="flex py-4 min-h-[113px] overflow-x-scroll gap-x-4">
            {checkedIds.length > 0 &&
              checkedUser.map((item, index) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center gap-y-2"
                >
                  <div className="relative">
                    <div
                      onClick={() => handleRemoveChecked(item)}
                      className="absolute z-10 cursor-pointer -top-2 -right-2"
                    >
                      <CloseIcon
                        fontSize="small"
                        className="text-white rounded-full bg-dark-bg"
                      />
                    </div>
                    <Avatar children={item.username?.charAt(0)} />
                  </div>
                  <div className="text-xs font-medium">{item.username}</div>
                </div>
              ))}
          </div>
          <div
            className={`users-container overflow-auto `}
            style={users.length > 3 ? { height: "250px" } : { height: "auto" }}
          >
            {users.length > 0 &&
              users.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => {
                    handleCheck(item);
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <Avatar children={item?.username?.charAt(0)} />
                    <span>{item?.username}</span>
                  </div>
                  <Checkbox
                    classes={{
                      root: "dark:text-white",
                    }}
                    checked={checkedIds.includes(item._id)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </div>
              ))}
          </div>
        </DialogContent>

        <div className="flex justify-center w-full">
          <button
            className="w-11/12 p-1 my-2 mb-6 text-lg font-semibold text-white rounded-lg cursor-pointer bg-secondary-color m "
            disabled={!room && checkedIds.length === 0}
            onClick={createRoom}
          >
            Create
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateRoomDialog;
