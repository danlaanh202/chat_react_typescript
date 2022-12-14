import React from "react";

const MenuIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`w-7 h-7 text-gray-sm ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default MenuIcon;
