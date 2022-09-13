import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import useUploadPreviewImage from "../../hooks/useUploadPreviewImage";
import { publicRequest } from "../../utils/requestMethod";
import { IRootState } from "../../redux/store";
import { IImage, IUser } from "../../types";
import { useSelector } from "react-redux";
import { socket } from "../../App";
import { useEffect, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function ModalSendMessage({
  open,
  setOpen,
  roomId,
}: {
  open: boolean;
  setOpen: any;
  roomId: string;
}) {
  const handleClose = () => {
    setOpen(false);
    handleDeleteImage();
  };
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    handleDeleteImage,
    previewSource,
    progress,
  } = useUploadPreviewImage();

  const sendMessage = async (url: string) => {
    await publicRequest
      .post("/image/up_img_msg", {
        url: url,
        is_message: true,
        room_id: roomId,
        uploader: currentUser._id,
      })
      .then((response) => {
        console.log(response);
        socket.emit("sendImg", {
          img: response.data._id,
          roomId: roomId,
          userId: currentUser._id,
        });
      });
  };

  const handleSendMessage = async () => {
    if (!previewSource) return;
    // upload to cloudinary and emit to socketio
    try {
      let url = await uploadImage().then((response) => response?.data.url);
      await sendMessage(url);
    } catch (err) {
      console.log("some thing was wrong in modal send message");
    } finally {
      handleClose();
    }
  };
  return (
    <div className="absolute transition-all">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="dark:!bg-dark-bg" sx={style}>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-4">
              <CloseIcon
                onClick={handleClose}
                fontSize="large"
                className="p-1 rounded-full cursor-pointer hover:bg-dark-item-hover"
              />
              <h3 className="text-xl font-semibold">Send Photo</h3>
            </div>
            <button
              onClick={handleSendMessage}
              className="p-2 px-4 rounded-lg bg-purple-bg"
            >
              Send
            </button>
          </div>
          <div className="mx-auto w-80">
            <label className="mt-3  cursor-pointer flex items-center justify-center border border-dashed min-h-[250px] dark:bg-dark-item-hover relative overflow-hidden ">
              <input
                value={fileInputState}
                onChange={handleFileInputChange}
                type="file"
                className="absolute opacity-0"
                name=""
                id=""
              />
              {!previewSource && progress === 0 && (
                <div className="absolute left-0 right-0 max-h-full">
                  <div className="text-center">Click to pick picture</div>
                  <p className="font-semibold text-center">Choose photo</p>
                </div>
              )}
              {previewSource && (
                <div className="absolute left-0 right-0 flex items-center justify-center max-h-full">
                  <img
                    src={previewSource}
                    className="object-cover max-h-full"
                    alt=""
                  />
                </div>
              )}
            </label>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
