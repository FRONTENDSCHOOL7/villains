import React, { useEffect, useState } from 'react';
import { useLocation, useRouteLoaderData } from 'react-router';
import followPageStateAtom from '../../atoms/followPageStateAtom';
import { useRecoilState } from 'recoil';
import getFollowerList from '../../api/get/getFollowerList.api';
import getFollowingList from '../../api/get/getFollowingList.api';
import postFollowQuery from '../../api/post/postFollow.api';
import deleteFollowQuery from '../../api/delete/deleteFollow.api';
import Follower from '../../components/Follower';
import PageTemplate from '../../components/layout/PageTemplate';
import { useMutation } from '@tanstack/react-query';

const ProfileFollowPage = () => {
  const location = useLocation();
  const user = useRouteLoaderData('user');
  const { fetchFollower } = getFollowerList();
  const { fetchFollowing } = getFollowingList();
  const [data, setData] = useState([]);
  const [followPageState, setFollowPageState] = useRecoilState(followPageStateAtom);

  const [newAccountname, setNewAccountname] = useState('');

  const fetchData = async () => {
    const followState = location.pathname.split('/')[4];
    if (followState === 'follower') {
      try {
        const followerData = await fetchFollower();
        setData(followerData);
        setFollowPageState(followState);
      } catch (error) {
        console.error('API 오류:', error);
      }
    } else if (followState === 'following') {
      try {
        const followingData = await fetchFollowing();
        setData(followingData);
        setFollowPageState(followState);
      } catch (error) {
        console.error('API 오류:', error);
      }
    }
  };

  const {
    data: FollowData,
    isLoading: FollowLoading,
    mutate: Following,
  } = useMutation(postFollowQuery(newAccountname, user.token));
  const {
    data: unFollowData,
    isLoading: unFollowLoading,
    mutate: unFollowing,
  } = useMutation(deleteFollowQuery(newAccountname, user.token));

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [FollowData, unFollowData]);

  return (
    <PageTemplate>
      {data && (
        <Follower
          data={data}
          fetchData={fetchData}
          user={user}
          Following={Following}
          unFollowing={unFollowing}
          setNewAccountname={setNewAccountname}
        ></Follower>
      )}
    </PageTemplate>
  );
};

export default ProfileFollowPage;
