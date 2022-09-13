import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "../../icons/MenuIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { logout } from "../../utils/auth";
import { useDispatch } from "react-redux";
import DarkModeToggle from "../DarkModeToggle";

export default function SidebarMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    logout(dispatch);
  };
  return (
    <div className="">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{
          paper: "!translate-y-2 w-1/2 md:w-60",
          list: "dark:bg-dark-bg dark:text-white bg-white text-black",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ display: "flex", gap: "8px" }}>
          <NightlightRoundIcon sx={{ fontSize: "14px", lineHeight: "20px" }} />
          <span className="text-sm">Dark mode</span>
          <div className="ml-auto">
            <DarkModeToggle />
          </div>
        </MenuItem>
        <MenuItem sx={{ display: "flex", gap: "8px" }} onClick={handleLogOut}>
          <LogoutIcon sx={{ fontSize: "14px", lineHeight: "20px" }} />
          <span className="text-sm">Log out</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
