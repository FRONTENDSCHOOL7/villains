import React, { useEffect } from 'react';
import followPageStateAtom from '../atoms/followPageStateAtom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import postFollow from '../api/post/postFollow.api';
import deleteFollow from '../api/delete/deleteFollow.api';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../config/pageUrlConfig';

const Follower = ({ data }) => {
  const navigate = useNavigate();
  const followPageState = useRecoilValue(followPageStateAtom);

  const handleGoToProfile = (accountname) => {
    const profileUrl = `${pageUrlConfig.profilePage}/${accountname}`;
    navigate(profileUrl);
  };

  return (
    <>
      {data.map((user) => (
        <Card key={user._id}>
          <ProfileArea onClick={() => handleGoToProfile(user.accountname)}>
            <ProfileImg
              src={
                user.image === 'http://146.56.183.55:5050/Ellipse.png'
                  ? 'https://api.mandarin.weniv.co.kr/Ellipse.png'
                  : user.image
              }
            ></ProfileImg>
            <Wrap>
              <UserName>{user.username}</UserName>
              <UserAccountname>@ {user.accountname}</UserAccountname>
            </Wrap>
          </ProfileArea>
          <BtnArea>
            {followPageState === 'follower' && !user.isfollow && (
              <FollowBtn onClick={async () => await postFollow(user.accountname)}>팔로우</FollowBtn>
            )}
            {followPageState === 'following' && user.isfollow && (
              <FollowBtn onClick={async () => await deleteFollow(user.accountname)}>언팔로우</FollowBtn>
            )}
          </BtnArea>
        </Card>
      ))}
    </>
  );
};
const Card = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  cursor: pointer;
`;
const ProfileArea = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 1;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 0.5px solid #dbdbdb;
  object-fit: cover;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const UserName = styled.span`
  font-size: 14px;
`;
const UserAccountname = styled.span`
  color: #767676;
  font-size: 12px;
`;
const BtnArea = styled.div`
  display: flex;
  align-items: center;
`;
const FollowBtn = styled.button`
  background-color: #3c58c1;
  color: white;
  padding: 8px 10px;
  border-radius: 9999px;
  height: fit-content;
`;
export default Follower;
