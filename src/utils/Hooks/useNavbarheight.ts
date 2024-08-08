import { BREAKPOINTS } from "@/breakpoints";

// breakpoints
import { useCallback, useEffect, useState } from "react";

const navbarheight = {
  desktop: 44,
  mobile: 48,
};

const useNavbarheight = (): number => {
  const [sNavbarheight, setNavbarheight] = useState<number>(
    navbarheight.desktop
  );

  const cbSetNavbarheight = useCallback(() => {
    if (window.innerWidth > BREAKPOINTS.MD) {
      setNavbarheight(navbarheight.desktop);
    } else {
      setNavbarheight(navbarheight.mobile);
    }
  }, []);

  useEffect(() => {
    cbSetNavbarheight();
    window.addEventListener("resize", () => {
      cbSetNavbarheight();
    });
    return window.removeEventListener("resize", () => {
      cbSetNavbarheight();
    });
  }, [cbSetNavbarheight]);

  return sNavbarheight;
};

export default useNavbarheight;
