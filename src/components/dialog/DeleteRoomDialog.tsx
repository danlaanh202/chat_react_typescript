import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

export default function DeleteRoomDialog({
  deleteRoom,
}: {
  deleteRoom: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleDeleteRoom = () => {
    deleteRoom();
    handleClose();
    navigate("/");
  };

  return (
    <React.Fragment>
      <Button className="!text-red-500" onClick={handleClickOpen}>
        <DeleteIcon />
        <span>Delete Room</span>
      </Button>
      <Dialog
        classes={{ paper: "dark:!bg-dark-bg dark:!text-white" }}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Room?</DialogTitle>
        <DialogContent>
          <DialogContentText className="dark:!text-white">
            Are you sure to delete this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="!text-red-500" onClick={handleDeleteRoom}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
