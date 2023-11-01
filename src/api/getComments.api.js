import { useState } from 'react';
import client from '../config/api.config';

const getComments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (postId) => {
    setLoading(true);

    const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const response = await client.get(`/post/${postId}/comments`, {}, client.BothType(token));

      setLoading(false);
      return response.data.comments;
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      return;
    }
  };

  return { fetchComments, loading, error };
};

export default getComments;
