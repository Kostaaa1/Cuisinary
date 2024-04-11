import { useEffect } from 'react';

const useNoScroll = (arg1, arg2) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (arg1 || arg2) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [arg1, arg2]);
};

export default useNoScroll;
