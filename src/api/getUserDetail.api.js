import { useState } from 'react';
import client from '../config/api.config';

const getUserDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (accountname) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const response = await client.get(`/profile/${accountname}`, {}, client.BothType(token));
      return response.data.profile;
    } catch (error) {
      setError(error);
      return;
    }
    setLoading(false);
  };

  return { fetchUser, loading, error };
};

export default getUserDetail;
