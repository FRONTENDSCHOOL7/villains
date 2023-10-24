import { useEffect, useState } from 'react';
import client from '../config/api.config';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWY1ZTA2YjJjYjIwNTY2Mzc2ZTUwMCIsImV4cCI6MTcwMTczOTgyNCwiaWF0IjoxNjk2NTU1ODI0fQ.RV7081-8RzIxr119fDKy4ycpOfYXVu_I5FpdjY0pH74';
    const headers = client.AuthType(token);

    console.log(headers);

    const fetchPosts = async () => {
      try {
        const response = await client.get('/post', { ...headers });
        setPosts(response.data);
        console.log(response.data);
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
