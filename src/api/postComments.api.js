import { useState } from 'react';
import client from '../config/api.config';

const postComments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadComment = async (postId, content) => {
    setLoading(true);

    const comment = {
      comment: {
        content: content,
      },
    };

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const response = await client.post(`/post/${postId}/comments`, comment, client.BothType(token));

      setLoading(false);
      return response.data.comment;
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      return false;
    }
  };

  return { uploadComment, loading, error };
};

export default postComments;
