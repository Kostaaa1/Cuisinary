import { useEffect } from "react";

const useNoScroll = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
};

export default useNoScroll;
