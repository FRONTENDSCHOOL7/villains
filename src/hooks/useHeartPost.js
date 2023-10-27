import { useState } from 'react';
import client from '../config/api.config';

const useHeartPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleHeartStatus = async (postId, status) => {
    setLoading(true);

    try {
      const token = import.meta.env.VITE_ADMIN_KEY;

      if (status === 'heart') {
        await client.post(`/post/${postId}/heart`, {}, client.BothType(token));
      } else if (status === 'unheart') {
        await client.post(`/post/${postId}/unheart`, {}, client.BothType(token));
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

export default useHeartPost;
