import { useEffect, useState } from 'react';
import client from '../../config/api.config';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';

const getFollowerList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollower = async () => {
    setLoading(true);
    const accountname = JSON.parse(localStorage.getItem('user')).accountname;
    const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const response = await client.get(`/profile/${accountname}/follower`, {}, client.BothType(token));
      return response.data;
    } catch (error) {
      setError(error);
      return;
    }
    setLoading(false);
  };

  return { fetchFollower, loading, error };
};

export default getFollowerList;
