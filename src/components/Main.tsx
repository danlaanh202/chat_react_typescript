import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../App";
import useToggleShow from "../hooks/useToggleShow";
import { IRootState } from "../redux/store";
import { showThingsMobile } from "../utils/showThingsMobile";
import MessageContainer from "./MessageContainer";
import MsgInputContainer from "./MsgInputContainer";
import ModalSendMessage from "./muiModal/ModalSendMessage";
import Top from "./Top";

const Main = ({
  setShowRight,
  topRef,
}: {
  className: string;
  setShowRight: any;
  topRef: any;
}) => {
  const [roomId, setRoomId] = useState(window.location.href.split("/")[5]);
  const bottomRef = useRef<any>(null);
  const show = useSelector((state: IRootState) => state.screen);
  const {
    show: showModal,
    setShow: setShowModal,
    toggle: toggleModal,
  } = useToggleShow(false);
  useEffect(() => {
    setRoomId(window.location.href.split("/")[5]);
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
    <>
      <div
        className={`bg-cat-template bg-cover absolute transition-all md:translate-x-0 top-0 left-[100vw] flex flex-col justify-between w-screen h-full md:relative md:left-auto md:overflow-hidden md:w-auto md:flex-grow sm-scroll ${showThingsMobile(
          show
        )}`}
      >
        {roomId && (
          <Top topRef={topRef} setShowRight={setShowRight} roomId={roomId} />
        )}

        <MessageContainer
          setToBottom={setToBottom}
          socket={socket}
          roomId={roomId}
        >
          <div className="h-2" ref={bottomRef}></div>
        </MessageContainer>

        {roomId && (
          <MsgInputContainer
            openModal={setShowModal}
            setToBottom={setToBottom}
            socket={socket}
            roomId={roomId}
          />
        )}
      </div>
      <ModalSendMessage
        roomId={roomId}
        open={showModal}
        setOpen={setShowModal}
      />
    </>
  );
};

export default Main;
