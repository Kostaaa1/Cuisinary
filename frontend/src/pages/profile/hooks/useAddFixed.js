import { useEffect, useState } from 'react';

const useAddFixed = (ref, params) => {
  const urlArr = ['reviews', 'change-password'];
  if (urlArr.includes(params.name)) return;

  useEffect(() => {
    const handleScroll = () => {
      const height = window.innerWidth > 1120 ? 148 : 88;

      if (window.scrollY > height && ref.current) {
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
