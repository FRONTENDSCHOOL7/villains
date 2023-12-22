import { useEffect, useRef } from 'react';

const useInfinite = (hasNextPage, isFetchingNextPage, fetchNextPage) => {
  const observer = useRef();
  const lastElementRef = useRef();

  useEffect(() => {
    if (isFetchingNextPage) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return lastElementRef;
};

export default useInfinite;