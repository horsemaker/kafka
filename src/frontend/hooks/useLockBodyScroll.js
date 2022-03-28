import { useLayoutEffect } from "react";
import { useWindowSize } from "./useWindowSize";

export const useLockBodyScroll = () => {
  const size = useWindowSize();

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (size.width <= 700) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = originalStyle);
  }, [size]);
};
