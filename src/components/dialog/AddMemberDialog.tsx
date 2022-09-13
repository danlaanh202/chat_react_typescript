import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import { socket } from "../../App";

export default function AddMemberDialog({ roomId }: { roomId: string }) {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMember("");
  };

  const [member, setMember] = useState("");
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [checkedUser, setCheckedUser] = useState<IUser[]>([]);

  useEffect(() => {
    setCheckedIds([]);
    setCheckedUser([]);
    setMember("");
  }, [roomId]);
  useEffect(() => {
    const getMember = async () => {
      try {
        await publicRequest
          .get("/user/get_by_username_out_of_room", {
            params: {
              username: member,
              roomId: roomId,
            },
          })
          .then((response) => setUsers(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  }, [member, roomId]);
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
  const handleAddMember = () => {
    socket.emit("add_member_to_room", {
      userIds: checkedIds,
      roomId: roomId,
    });
    handleClose();
  };
  return (
    <Fragment>
      <Button onClick={handleClickOpen}>
        <AddIcon />
        <span>Add members</span>
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
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
                    checked={checkedIds.includes(item._id)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </div>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={checkedIds.length === 0} onClick={handleAddMember}>
            Add
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
