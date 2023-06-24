import { useEffect } from 'react';

const useSmoothScroll = () => {
  console.log('scroll called');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
};

export default useSmoothScroll;
