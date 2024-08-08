import { BREAKPOINTS } from "@/breakpoints";
import { isNumber } from "lodash";
import { useCallback, useEffect, useState } from "react";

export function useDevice() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isTouchInput = "ontouchstart" in window;

  const isBreakpoint = useCallback(
    (breakpoint: any) => {
      if (isNumber(breakpoint)) {
        return windowWidth >= breakpoint;
      }
      return windowWidth >= BREAKPOINTS[breakpoint];
    },
    [windowWidth]
  );

  function handleWindowSizeChange() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return {
    isTouchInput,
    isBreakpoint,
  };
}
