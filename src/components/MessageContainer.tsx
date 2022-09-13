import { ReactNode, useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { IMessage, IUser } from "../types";
import { dateToTele, isTheSameDay, strToDate } from "../utils/dateToTele";
import { publicRequest } from "../utils/requestMethod";
import BubbleMsg from "./BubbleMsg";
import InfiniteScroll from "./InfiniteScroll";

const MessageContainer = ({
  className = "",
  roomId,
  socket,
  children,
  setToBottom,
}: {
  className?: string;
  roomId?: string;
  socket?: any;
  children?: ReactNode;
  setToBottom: any;
}) => {
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const show = useSelector((state: IRootState) => state.screen);
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    const getMessages = async () => {
      try {
        await publicRequest
          .get("/message/get_messages_with_limit", {
            params: {
              roomId: roomId,
              page: 1,
              limit: 15,
            },
          })
          .then((response) => {
            setHasMore(response.data.hasNextPage);
            setMessages(response.data.docs);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [roomId]);
  useEffect(() => {
    if (show.main) {
      setToBottom();
    }
  }, [show]);
  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessage(true);
      try {
        await publicRequest
          .get("/message/get_messages_with_limit", {
            params: {
              roomId: roomId,
              page: page,
              limit: 15,
            },
          })
          .then((response) => {
            setHasMore(response.data.hasNextPage);
            setMessages((prev) => [...prev, ...response.data.docs]);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMessage(false);
      }
    };
    if (page != 1) {
      getMessages();
    }
  }, [page]);
  useEffect(() => {
    socket.on("receivemsg", ({ savedMsg }: { savedMsg: IMessage }) =>
      setMessages((prev: IMessage[]) => [savedMsg, ...prev])
    );
    socket.on("receivedImg", (data: IMessage) =>
      setMessages((prev: IMessage[]) => [data, ...prev])
    );
  }, [socket]);
  console.log(messages);
  return (
    <div className="flex-1 h-full overflow-y-scroll">
      <InfiniteScroll
        loading={loadingMessage}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        className="max-w-[720px] flex flex-col-reverse w-full mx-auto"
      >
        {children}
        {messages?.length > 0 &&
          messages.map((item: IMessage, index) => {
            if (!hasMore && index === messages.length - 1) {
              return (
                <div className="flex flex-col-reverse gap-y-2" key={item._id}>
                  <div className="px-4 py-1 mx-auto rounded-3xl !bg-opacity-60 bg-gray-600 text-white dark:bg-dark-date-bg w-fit">
                    {dateToTele(item?.created_at as Date)}
                  </div>
                  <div className="px-4 py-1 mx-auto rounded-3xl !bg-opacity-60 bg-gray-600 text-white dark:bg-dark-date-bg w-fit">
                    {item.message}
                  </div>
                </div>
              );
            }
            if (
              index < messages.length - 1 &&
              !isTheSameDay(
                new Date(messages[index].created_at as Date),
                new Date(messages[index + 1].created_at as Date)
              )
            ) {
              return (
                <div className="flex flex-col-reverse" key={item._id}>
                  <BubbleMsg
                    message={item}
                    isMe={item.user === currentUser._id}
                  />
                  <div className="px-4 py-1 mx-auto rounded-3xl !bg-opacity-60  bg-gray-600 text-white dark:bg-dark-date-bg w-fit">
                    {dateToTele(item?.created_at as Date)}
                  </div>
                </div>
              );
            }
            return (
              <BubbleMsg
                message={item}
                key={item._id}
                isMe={(item.user as IUser)._id === currentUser._id}
              />
            );
          })}
      </InfiniteScroll>
    </div>
  );
};

export default MessageContainer;
