import * as React from "react";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Menu from "@mui/material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DotVertical from "../../icons/DotVertical";
import AddMemberDialog from "../dialog/AddMemberDialog";
import { useDispatch } from "react-redux";
import { deleteRoomDispatcher } from "../../utils/room";
import DeleteRoomDialog from "../dialog/DeleteRoomDialog";

export default function ThreeDotMenu({ roomId }: { roomId?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
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
  const openDeleteMemberDialog = () => {
    setDeleteDialog(true);
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
            paper: "!translate-y-12 ",
            list: "dark:bg-dark-bg bg-white",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="">
            <MenuItem className="flex gap-2 " onClick={openAddMemberDialog}>
              <AddMemberDialog roomId={roomId as string} />
            </MenuItem>
            <MenuItem
              className="flex gap-2 !text-red-400"
              onClick={openDeleteMemberDialog}
            >
              <DeleteRoomDialog deleteRoom={deleteRoom} />
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
}
