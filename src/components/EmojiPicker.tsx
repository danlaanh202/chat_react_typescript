import React, { ClassAttributes, useRef } from "react";
import Picker from "emoji-picker-react";
import EmoIcon from "../icons/EmoIcon";
import useOnClickOutside from "../hooks/useOnClickOutside";
const EmojiPicker = ({
  setMsg,
  setShowPicker,
  showPicker,
}: {
  setMsg: any;
  setShowPicker: any;
  showPicker: Boolean;
}) => {
  const insideRef = useRef(null);
  useOnClickOutside(insideRef, () => {
    setShowPicker(false);
  });
  const onEmojiClick = (event: any, emojiObject: any) => {
    setMsg((prev: string) => `${prev}${emojiObject.emoji}`);
    setShowPicker(false);
  };
  return (
    <>
      {showPicker && (
        <div ref={insideRef} className="absolute -translate-y-full -top-4">
          <Picker
            pickerStyle={{ color: "black" }}
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
      <EmoIcon
        onClick={() => {
          setShowPicker((prev: Boolean) => !prev);
        }}
        className="absolute -translate-y-1/2 cursor-pointer top-1/2 left-2"
      />
    </>
  );
};

export default EmojiPicker;
