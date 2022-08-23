import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../App";
import MessageContainer from "./MessageContainer";
import MsgInputContainer from "./MsgInputContainer";
import Top from "./Top";

const Main = ({
  className = "",
  setShowRight,
}: {
  className: string;
  setShowRight: any;
}) => {
  const [roomId, setRoomId] = useState(window.location.href.split("/")[4]);
  const bottomRef = useRef<any>(null);
  useEffect(() => {
    setRoomId(window.location.href.split("/")[4]);
  }, [window.location.href]);
  useEffect(() => {
    socket.emit("joinRoom", { room: roomId });
  }, [roomId]);
  const setToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={`relative overflow-hidden flex justify-between flex-col  ${
        className ? className : ""
      }`}
    >
      {roomId && <Top setShowRight={setShowRight} roomId={roomId} />}

      <MessageContainer
        setToBottom={setToBottom}
        socket={socket}
        roomId={roomId}
      >
        <div className="h-2" ref={bottomRef}></div>
      </MessageContainer>

      {roomId && (
        <MsgInputContainer
          setToBottom={setToBottom}
          socket={socket}
          roomId={roomId}
        />
      )}
    </div>
  );
};

export default Main;
