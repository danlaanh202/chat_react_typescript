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
        isMe
          ? "ml-auto bg-light-primary-color text-white dark:bg-primary-color"
          : "bg-white dark:bg-dark-bg"
      }`}
    >
      {message?.image ? (
        <img
          className="max-h-[200px] cursor-pointer"
          src={message?.image.image_url}
        />
      ) : (
        message?.message
      )}
      <span className="absolute text-xs text-right bottom-1 right-2">
        {dateToTele(message?.created_at as Date)}
      </span>
    </div>
  );
};

export default BubbleMsg;
