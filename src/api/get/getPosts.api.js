import client from '../../config/api.config';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchPosts = async ({ pageParam = 0 }) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const headers = client.BothType(token);

  try {
    const { data } = await client.get(`/post/feed/?limit=10&skip=${pageParam}`, {}, headers);
    const responseData = data.posts;

    return responseData
      .filter((item) => {
        try {
          const parsedContent = JSON.parse(item.content);
          return parsedContent.postId === 'villains';
        } catch {
          return false;
        }
      })
      .map((item) => ({ ...item, content: JSON.parse(item.content) }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const getPosts = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 10) {
          return undefined;
        }
        return pages.length * 10;
      },
    });

  const posts = data?.pages.flat() || [];

  return { posts, error, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};

export default getPosts;
