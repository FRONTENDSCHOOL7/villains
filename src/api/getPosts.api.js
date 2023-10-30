import { useEffect, useState } from 'react';
import client from '../config/api.config';

const getPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const token = import.meta.env.VITE_ADMIN_KEY;

    const headers = client.BothType(token);

    const fetchPosts = async () => {
      try {
        const response = await client.get('/post', {},{ ...headers });

        // const filteredData = response.data.posts.filter((item) => {
        //   let parsedContent;
        //   try {
        //     parsedContent = JSON.parse(item.content.split("'").join('"'));
        //   } catch (e) {
        //     // JSON 파싱에 실패한 경우
        //     return false;
        //   }
        //   return Boolean(parsedContent.postId === 'villains');
        // });

        // const transformedPosts = filteredData.map((item) => {
        //   return {
        //     ...item,
        //     content: JSON.parse(item.content.split("'").join('"')),
        //   };
        // });
        // setPosts(transformedPosts);
        console.log(response.data.posts);
        setPosts(response.data.posts); // 임시 테스트용
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default getPosts;
