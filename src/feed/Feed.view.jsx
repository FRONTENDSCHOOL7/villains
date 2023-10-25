import { useEffect, useState } from 'react';
import client from '../config/api.config';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');

    const headers = client.AuthType(token);

    const fetchPosts = async () => {
      try {
        const response = await client.get('/post', { ...headers });

        const filteredData = response.data.posts.filter((item) => {
          let parsedContent;
          try {
            parsedContent = JSON.parse(item.content);
          } catch (e) {
            // JSON 파싱에 실패한 경우
            return false;
          }
          console.log(parsedContent);
          return Boolean(parsedContent.postId); // postId가 존재하는지 확인
        });

        console.log(filteredData);

        setPosts(response.data);
        console.log(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;
  if (posts.length === 0) return <div>게시물이 없습니다.</div>;

  return <div>hi feed hi</div>;
};

export default FeedPage;
