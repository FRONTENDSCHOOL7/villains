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
import DefaultBtn, { BasicStyle, PrimaryStyle, SecondaryStyle } from '../../components/GlobalButton';
import theme from '../../style/theme';
import { IconBtn } from '../../components/Buttons';
import ChatIcon from '../../assets/img/message-circle.svg';


const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useRouteLoaderData('user');
  const { accountname } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(accountname);
  const myProfileInfo = useRecoilValue(profileAtom);
  const [profileInfo, setProfileInfo] = useState();

  const handleClickEdit = () => {
    navigate(pageUrlConfig.profileEdit);
  };

  useEffect(() => {
    if(profileInfo) setIsLoading(false);
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
  }, [profileInfo]);

  const handleClickTab = (event) => {
    event.target.id === `1` ? setColor(false) : setColor(true);
  }
  return (
    <PageTemplate>
      {isLoading ? <div>loading...</div>
      :<>
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
            <ButtonWrap>
              <button><img src={ChatIcon} alt="chat"/></ button>
              {isMy ? <EditBtn>프로필 수정</EditBtn> : <EditBtn state={profileInfo.isfollow}>{profileInfo.isfollow ? `언팔로우` : `팔로우`}</EditBtn>}
              <button><img src={ChatIcon} alt="chat"/></ button>
              </ButtonWrap>
          </ProfileBody>
        </UpperSection>
  
        <DownSection>
          <TabGroup color={color} onClick={handleClickTab}>
            <Tab id={`1`}>게시글</Tab>
            <Tab id={`2`}>택배 목록</Tab>
          </TabGroup>
        </DownSection>
      </>}
    </PageTemplate>
  );
};
export default ProfilePage;


const UpperSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

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
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 10px;

  & > :not(:nth-child(2)){
    border: 1px solid;
    border-radius: 50%;
    padding: 7px;
    border-color: ${theme.color.grey};
    width: 34px;
    height: 34px;
    img {
      max-width: 100%;
    }
  }
`;
const EditBtn = styled.button`
  width: 120px;
  padding: 9px 0;
  margin-bottom: 24px;
  border-radius: 9999px;  
  ${props => props.state ? BasicStyle : PrimaryStyle}
`;

// 컨텐츠를 포함하는 하단부
const DownSection = styled.div`
  border-top: 6px solid ${theme.color.light};
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