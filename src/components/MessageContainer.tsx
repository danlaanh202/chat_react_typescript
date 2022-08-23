import { ReactNode, useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { IMessage, IUser } from "../types";
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
    setToBottom();
  }, []);
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
    socket.on("receivemsg", (data: IMessage) =>
      setMessages((prev: IMessage[]) => [data, ...prev])
    );
  }, [socket]);

  return (
    <div className="flex-1 h-full overflow-y-scroll">
      <InfiniteScroll
        loading={loadingMessage}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        className="max-w-[720px] flex flex-col-reverse w-full mx-auto"
      >
        {children}
        {messages.map((item: IMessage, index) => (
          <BubbleMsg
            message={item}
            key={item._id}
            isMe={item.user === currentUser._id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MessageContainer;
