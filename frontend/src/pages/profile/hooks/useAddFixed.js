import { useEffect } from 'react';

const useAddFixed = (ref) => {
  useEffect(() => {
    const handleScroll = () => {
      let height = window.innerWidth > 1030 ? 120 : 78;

      if (window.innerWidth < 730) {
        ref.current.classList.remove('fixed-header');
      }

      if (window.scrollY > height && ref.current && window.innerWidth > 730) {
        ref.current.classList.add('fixed-header');
      } else if (window.scrollY < height && ref.current) {
        ref.current.classList.remove('fixed-header');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref]);
};

export default useAddFixed;
