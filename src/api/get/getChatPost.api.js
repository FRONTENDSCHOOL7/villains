import { useCallback, useEffect, useState } from 'react';
import client from '../../config/api.config';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const getChatPosts = () => {
  const [posts, setPosts] = useState([]); // 현재 로드된 게시글
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const POSTS_REQUEST = 10; // 한 번의 요청에 가져오는 게시글 수

  const fetchPosts = useCallback(async () => {
    let fetchedPosts = [];
    let requestCount = 0;
    let currentSkip = skip;
    const token = JSON.parse(localStorage.getItem('user')).token;
    const headers = client.BothType(token);

    while (fetchedPosts.length < POSTS_REQUEST) {
      try {
        const response = await client.get(
          `/post?limit=${POSTS_REQUEST}&skip=${currentSkip}`,
          {},
          { ...headers },
        );
        const responseData = response.data.posts;

        const filteredData = responseData.filter((item) => {
          let parsedContent;
          try {
            parsedContent = JSON.parse(item.content);
          } catch (e) {
            // JSON 파싱에 실패한 경우
            return false;
          }
          return Boolean(parsedContent.postId === 'chat');
        });

        fetchedPosts = [...fetchedPosts, ...filteredData];
        currentSkip += POSTS_REQUEST;
      } catch (error) {
        setError(error);
        setLoading(false);
        return;
      }

      requestCount++;
      if (requestCount >= 10) break; // 게시물을 최대 10번 요청하면 반복문 종료
    }

    const transformedPosts = fetchedPosts.map((item) => {
      return {
        ...item,
        content: JSON.parse(item.content),
      };
    });

    setPosts((prevPosts) => [...prevPosts, ...transformedPosts]);
    setLoading(false);
    setSkip(currentSkip);
  }, [skip]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // 무한스크롤 -> 리액트 쿼리로 리팩토링 필요
  useInfiniteScroll(fetchPosts);

  return { posts, loading, error };
};

export default getChatPosts;
