import { useEffect } from "react";

const usePreventZoomOnFocus = () => {
  useEffect(() => {
    const handleFocus = () => {
      const metaTag = document.querySelector('meta[name="viewport"]');
      if (metaTag) {
        metaTag.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        );
      }
    };

    const handleBlur = () => {
      const metaTag = document.querySelector('meta[name="viewport"]');
      if (metaTag) {
        metaTag.setAttribute("content", "width=device-width, initial-scale=1");
      }
    };

    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);
};

export default usePreventZoomOnFocus;
