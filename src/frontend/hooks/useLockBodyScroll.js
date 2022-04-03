import { useLayoutEffect } from "react";
import { useWindowSize } from "./useWindowSize";

export const useLockBodyScroll = (order = false) => {
  const size = useWindowSize();

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (size.width <= 700) {
      document.body.style.overflow = "hidden";
    }
    if (order) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = originalStyle);
  }, [size, order]);
};
