import { useState } from 'react';
import client from '../../config/api.config';

const getPostDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async (id) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const response = await client.get(`/post/${id}`, {}, client.BothType(token));
      return response.data.post;
    } catch (error) {
      console.error(error);
      setError(error);
      return;
    }
    setLoading(false);
  };

  return { fetchPost, loading, error };
};

export default getPostDetail;
