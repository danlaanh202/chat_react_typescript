import { useCallback, useState } from "react";

export default function useToggleShow(initialState = false) {
  const [show, setShow] = useState(initialState);
  const toggle = useCallback(() => setShow((prev) => !prev), []);
  return {
    show,
    setShow,
    toggle,
  };
}
