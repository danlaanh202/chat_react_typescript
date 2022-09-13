import Attach from "../icons/Attach";
import EmoIcon from "../icons/EmoIcon";
import SendIcon from "../icons/SendIcon";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { IMessage, IUser } from "../types";

import EmojiPicker from "./EmojiPicker";
const MsgInputContainer = ({
  className = "",
  roomId,
  socket,
  setToBottom,
  openModal,
}: {
  className?: string;
  roomId?: string;
  socket?: any;
  setToBottom?: any;
  openModal: any;
}) => {
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const [msg, setMsg] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg) return;
    socket.emit("sendmsg", { msg, roomId, userId: currentUser._id });
    setMsg("");
    setToBottom();
  };

  return (
    <div className={` py-4  ${className} `}>
      <div className="flex justify-center mx-2 bottom-4">
        <form
          onSubmit={handleSendMessage}
          className="max-w-[720px] relative w-full"
        >
          <EmojiPicker
            showPicker={showPicker}
            setMsg={setMsg}
            setShowPicker={setShowPicker}
          />

          <input
            value={msg}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMsg(e.target.value)
            }
            type="text"
            className="w-full p-2 pl-10 pr-20 bg-white dark:bg-dark-bg"
            placeholder="Message"
          />
          <button type="submit">
            <SendIcon className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-12" />
          </button>
          <Attach
            onClick={() => openModal(true)}
            className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4"
          />
        </form>
      </div>
    </div>
  );
};

export default MsgInputContainer;
