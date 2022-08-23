import * as React from "react";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DotVertical from "../../icons/DotVertical";
import AddMemberDialog from "../dialog/AddMemberDialog";
import { useDispatch } from "react-redux";
import { deleteRoomDispatcher } from "../../utils/room";

export default function ThreeDotMenu({ roomId }: { roomId?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openAddMemberDialog = () => {
    setShowDialog(true);
    handleClose();
  };
  const dispatch = useDispatch();
  const deleteRoom = () => {
    deleteRoomDispatcher(dispatch, roomId as string);
    handleClose();
  };
  return (
    <>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <DotVertical />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          classes={{
            paper: "!translate-y-10",
            list: "bg-dark-bg",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="text-white">
            <MenuItem className="flex gap-2" onClick={openAddMemberDialog}>
              <AddMemberDialog roomId={roomId as string} />
            </MenuItem>
            <MenuItem className="flex gap-2 !text-red-400" onClick={deleteRoom}>
              <DeleteIcon />
              <span>Delete Room</span>
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
}
