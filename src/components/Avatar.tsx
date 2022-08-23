import React from "react";

const Avatar = ({
  src,
  width,
  height,
}: {
  src: string;
  width?: string;
  height?: string;
}) => {
  return (
    <div
      style={{ height: `${height}` }}
      className="flex items-center rounded-full h-14"
    >
      <img
        src={src}
        alt=""
        style={{ width: `${width}` }}
        className="object-cover h-full rounded-full w-14"
      />
    </div>
  );
};

export default Avatar;
