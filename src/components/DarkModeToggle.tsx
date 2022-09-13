import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { toggleDarkMode } from "../redux/themeRedux";

const DarkModeToggle = () => {
  const theme = useSelector((state: IRootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(toggleDarkMode());
      }}
      className="relative w-6 h-3 rounded-lg bg-gray-lg dark:bg-secondary-color"
    >
      <div
        style={
          theme.isDark
            ? { transform: "translateX(100%) translateY(-4px)" }
            : { transform: " translateY(-4px)" }
        }
        className="absolute top-0 w-5 h-5 transition-all bg-white border-2 rounded-full dark:border-secondary-color -left-2 border-gray-lg"
      ></div>
    </div>
  );
};

export default DarkModeToggle;
