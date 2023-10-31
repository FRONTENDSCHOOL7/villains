import { useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      !callback
    )
      return;
    callback();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);

  return;
};

export default useInfiniteScroll;
