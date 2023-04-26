import { useEffect } from "react";

const useAddFixed = (ref) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 && !ref.current) {
        ref.current.classList.add("fixed-header");
      } else if (window.screenY < 40 && ref.current) {
        ref.current.classList.remove("fixed-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
};

export default useAddFixed;
