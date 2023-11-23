import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import PageTemplate from '../PageTemplate';
import basicProfile from '../../assets/img/basic-profile.svg';

const Profile = () => {
  return (
    <PageTemplate>
      <UpperSection>
        {/* 유저 정보 */}
        <ProfileHeader>
          <Follow>
            <span>2950</span>
            followers
          </Follow>
          <ProfileImg src={basicProfile} alt="프로필 이미지" />

          <Follow>
            <span>128</span>
            followings
          </Follow>
        </ProfileHeader>

        {/* <ProfileContent> */}
        <UserName>나야나</UserName>
        <ProfileEmail>@villain_no1</ProfileEmail>
        <ProfileDsc>1호선 빌런 꿈나무</ProfileDsc>
        <Link to="/user/edit">
          <EditBtn>프로필 수정</EditBtn>
        </Link>

        {/* </ProfileContent> */}
      </UpperSection>
    </PageTemplate>
  );
};

export default Profile;

// 프로필 카드 상단부
const UpperSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid blue;
  max-width: 400px;
  height: 386px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  border: 1px solid orange;
  margin: 0 auto;

  width: 100%;
  /* height: 200px; */

  & > :not(:nth-child(2)) {
    margin: 0 auto;
  }
`;
const Follow = styled.div`
  font-size: 8px;
  & span {
    display: block;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 7px;
  }
`;
// const FollowersNum = styled.span`
//   display: block;
//   /* vertical-align: middle; */

//   font-size: 18px;
//   font-weight: 800;
//   margin-bottom: 7px;
// `;

// const Followers = styled.div`
//   font-size: 8px;
// `;

const ProfileImg = styled.img`
  max-width: 100%;
  flex-shrink: 0;
  flex-basis: calc(100% / 3);
  margin-top: 30px;
  margin-bottom: 11px;
`;

// 프로필 설명
const ProfileContent = styled.div`
  box-shadow: inset 0 0 10px gold;
  text-align: center;
`;

const UserName = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const ProfileEmail = styled.p`
  color: #000;
  font-size: 16px;
  margin-bottom: 17px;
`;

const ProfileDsc = styled.p`
  color: #000;
  font-size: 16px;
  margin-bottom: 24px;
`;

// const ProfileEditBtn = styled.button`
//   border: 1px solid #dbdbdb;
//   color: #767676;
//   border-radius: 30px;
//   width: 120px;
//   height: 34px;
// `;

const EditBtn = styled.button`
  box-shadow: inset 0 0 10px grey;

  border-radius: 30px;
  width: 120px;
  height: 34px;
  margin-bottom: 24px;
`;
