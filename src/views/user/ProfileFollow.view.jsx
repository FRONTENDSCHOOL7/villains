import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import followPageStateAtom from '../../atoms/followPageStateAtom';
import { useRecoilState } from 'recoil';
import getUserFollower from '../../api/get/getUserFollower.api';
import getFollowingList from '../../api/get/getFollowingList.api';
import Follower from '../../components/Follower';
import PageTemplate from '../../components/layout/PageTemplate';

const ProfileFollowPage = () => {
  const location = useLocation();
  const followState = location.pathname.split('/')[3];
  const accountname = useParams().accountname;
  const [data, setData] = useState([]);
  const { fetchFollower } = getUserFollower();
  const { fetchFollowing } = getFollowingList();
  const [followPageState, setFollowPageState] = useRecoilState(followPageStateAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (followState === 'follower') {
        try {
          const followerData = await fetchFollower(accountname);
          setData(followerData);
          setFollowPageState(followState);
        } catch (error) {
          console.error('API 오류:', error);
        }
      } else if (followState === 'following') {
        try {
          const followingData = await fetchFollowing(accountname);
          setData(followingData);
          setFollowPageState(followState);
        } catch (error) {
          console.error('API 오류:', error);
        }
      }
    };
    fetchData();
  }, [data]);

  return <PageTemplate>{data && <Follower data={data}></Follower>}</PageTemplate>;
};

export default ProfileFollowPage;
