import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import pageUrlConfig from '../../config/pageUrlConfig';
import PageTemplate from '../../components/PageTemplate';
import basicProfile from '../../assets/img/basic-profile.svg';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import profileAtom from '../../atoms/profileAtom';
import getUserInfo from '../../api/get/getUserInfo.api';
import { BasicStyle, SecondaryStyle } from '../../components/GlobalButton';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useRouteLoaderData('user');
  const { accountname } = useParams();

  const [color, setColor] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(accountname);
  const myProfileInfo = useRecoilValue(profileAtom);
  const [profileInfo, setProfileInfo] = useState();

  const handleClickEdit = () => {
    navigate(pageUrlConfig.profileEdit);
  };

  useEffect(() => {
    if (accountname === user.accountname) {
      setIsMy(true);
      setProfileInfo(myProfileInfo);
    } else{
      getUserInfo(currentAccount, user.token)
      .then((result)=>{
        setProfileInfo(result.data.profile);
      })
      .catch((error)=>{
        console.error(error);
      })
    }
  }, []);

  const handleClickTab = (event) => {
    event.target.id === `1` ? setColor(false) : setColor(true);
  }
  return (
    <PageTemplate>
      <UpperSection>
        <ProfileHeader>
          <Follow>
            <span>{profileInfo.followerCount}</span>
            followers
          </Follow>
          <ProfileImg src={profileInfo.image} alt="프로필 이미지" onError={(event)=>{event.target.src = basicProfile}}/>

          <Follow>
            <span>{profileInfo.followingCount}</span>
            followings
          </Follow>
        </ProfileHeader>

        <ProfileBody>
          <UserName>{profileInfo.username}</UserName>
          <ProfileEmail>@{currentAccount}</ProfileEmail>
          <ProfileDsc>{profileInfo?.intro ?? `1호선 빌런 꿈나무`}</ProfileDsc>
          {isMy ? <EditBtn>프로필 수정</EditBtn> : <EditBtn>팔로우</EditBtn>}
        </ProfileBody>
      </UpperSection>

      <DownSection>
        <TabGroup color={color} onClick={handleClickTab}>
          <Tab id={`1`}>게시글</Tab>
          <Tab id={`2`}>택배 목록</Tab>
        </TabGroup>
      </DownSection>
    </PageTemplate>
  );
};
export default ProfilePage;


const UpperSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 314px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  border: 1px solid orange;
  margin: 0 auto;

  width: 100%;

  & > :not(:nth-child(2)) {
    margin: 0 auto;
  }
`;
const ProfileBody = styled.div`
  margin: 0 auto;
  text-align: center;
`
const Follow = styled.div`
  font-size: 8px;
  & span {
    display: block;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 7px;
  }
`;

const ProfileImg = styled.img`
  max-width: 100%;
  flex-shrink: 0;
  flex-basis: calc(100% / 3);
  margin-top: 30px;
  margin-bottom: 11px;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  margin-bottom: 17px;
`;

const ProfileDsc = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;

const EditBtn = styled.button`
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  width: 120px;
  height: 34px;
  margin-bottom: 24px;
`;

// 컨텐츠를 포함하는 하단부
const DownSection = styled.div`
  margin-top: 6px;
`;

const TabGroup = styled.div`
  display: flex;
  width: 100%;
  height: 64px;

  & :nth-child(1){
    ${(props)=> props.color ? SecondaryStyle : BasicStyle}
  }
  & :nth-child(2){
    ${(props)=> !props.color ? SecondaryStyle : BasicStyle}
  }
`;

const Tab = styled.button`
  flex-basis: 50%;
  flex-shrink: 0;
`;