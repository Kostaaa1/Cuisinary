import { useEffect } from "react";

const useAddFixed = (ref) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        ref.current.classList.add("fixed");
      } else {
        ref.current.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
};

export default useAddFixed;
