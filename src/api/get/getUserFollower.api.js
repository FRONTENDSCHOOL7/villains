import { useEffect, useState } from 'react';
import client from '../../config/api.config';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';

const getUserFollower = () => {
  const user = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollower = async (accountname) => {
    setLoading(true);
    // const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const response = await client.get(`/profile/${accountname ?? user.accountname}/follower`, {}, client.BothType(user.token));
      return response.data;
    } catch (error) {
      setError(error);
      return;
    }
    setLoading(false);
  };

  return { fetchFollower, loading, error };
};

export default getUserFollower;
