import { IMessage } from "../types";
import { dateToTele } from "../utils/dateToTele";

const BubbleMsg = ({
  message,
  isMe = true,
}: {
  message?: IMessage;
  isMe?: boolean;
}) => {
  return (
    <div
      className={`break-all relative rounded-lg m-3 w-fit max-w-[70%] min-w-[20%] p-2 pb-5 ${
        isMe ? "ml-auto bg-primary-color" : "bg-dark-bg"
      }`}
    >
      {message?.message}
      <span className="absolute text-xs text-right bottom-1 right-2">
        {dateToTele(message?.created_at as Date)}
      </span>
    </div>
  );
};

export default BubbleMsg;
