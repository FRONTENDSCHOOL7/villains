import { useState } from 'react';
import client from '../config/api.config';

const postHeart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleHeartStatus = async (id, status) => {
    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      if (status === 'heart') {
        await client.post(`/post/${id}/heart`, {}, client.BothType(token));
      } else if (status === 'unheart') {
        await client.delete(`/post/${id}/unheart`, {}, client.BothType(token));
      }

      setLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  return { toggleHeartStatus, loading, error };
};

export default postHeart;
