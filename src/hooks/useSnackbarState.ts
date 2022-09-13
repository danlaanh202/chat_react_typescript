import { useState } from "react";

export default function useSnackbarState() {
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "warning" | "info" | "error"
  >("success");
  const [message, setMessage] = useState<string>("");
  return [
    snackbar,
    setSnackbar,
    severity,
    setSeverity,
    message,
    setMessage,
  ] as const;
}
