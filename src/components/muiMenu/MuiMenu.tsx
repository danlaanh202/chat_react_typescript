import * as React from "react";

import IconButton from "@mui/material/IconButton";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import MenuItem from "@mui/material/MenuItem";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import Menu from "@mui/material/Menu";

import PencilIcon from "../../icons/PencilIcon";

export default function MuiMenu({ setShowDialog }: { setShowDialog: any }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <PencilIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{
          list: "bg-dark-bg",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="text-white">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <VolumeMuteIcon />
            <span>New Channel</span>
          </MenuItem>
          <MenuItem
            className="flex gap-2"
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <GroupIcon />
            <span>New Group</span>
          </MenuItem>
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <ChatIcon />
            <span>New Private Chat</span>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
