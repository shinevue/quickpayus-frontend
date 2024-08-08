import { toast } from "react-toastify";
export const toastify = (message: string) => {
  let themeMode: string = localStorage.getItem("themeMode") || "light";
  if (themeMode == "auto") {
    const darkThemeMq: MediaQueryList = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (darkThemeMq.matches) {
      themeMode = "dark";
    } else {
      themeMode = "light";
    }
  }
  toast.error(message, { theme: themeMode });
};
