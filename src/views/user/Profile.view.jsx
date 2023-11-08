import { useNavigate, useParams, useRouteLoaderData, useLocation, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import pageUrlConfig from '../../config/pageUrlConfig';
import PageTemplate from '../../components/layout/PageTemplate';
import basicProfile from '../../assets/img/basic-profile.svg';
import { useRecoilValue, useRecoilState } from 'recoil';
import PostCard from '../../components/feed/PostCard';
import userPostAtom from '../../atoms/userPostAtom';
import profileAtom from '../../atoms/profileAtom';
import getUserInfo from '../../api/get/getUserInfo.api';
import DefaultBtn, { BasicStyle, PrimaryStyle, SecondaryStyle } from '../../components/default/GlobalButton';
import theme from '../../style/theme';
import contactQuery from '../../api/get/getUserPost.api';
import Goods from '../../components/Goods';
import ChatIcon from '../../assets/img/message-circle.svg';
import ShareIcon from '../../assets/img/icon-404.svg';
import getProducts from '../../api/get/getProducts.api';
import postFollowQuery from '../../api/post/postFollow.api';
import deleteFollowQuery from '../../api/delete/deleteFollow.api';

const ProfilePage = () => {
  const user = useRouteLoaderData('user');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accountname } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [profileInfo, setProfileInfo] = useState();
  const [feedList, setFeedList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);

  const [myProfileInfo, setMyProfileInfo] = useRecoilState(profileAtom);
  const myFeedList = useRecoilValue(userPostAtom);

  const { products, loading, error } = getProducts('profile');
  useEffect(() => {
    setGoodsList(products);
  }, [loading]);

  const {
    data,
    isFetching,
    isLoading: feedLoading,
    isError,
  } = useQuery(contactQuery(accountname, user.token));

  useEffect(() => {
    if (accountname === user.accountname) {
      setIsMy(true);
    }
    //   setProfileInfo(myProfileInfo);
    //   setFeedList(myFeedList);
    // } else{
    getUserInfo(accountname, user.token)
      .then((result) => {
        setProfileInfo(result.data.profile);
        setIsLoading(false);
        setMyProfileInfo(result.data.profile);
      })
      .catch((error) => {
        console.error(error);
      });
    // }
  }, [accountname]);

  useEffect(() => {
    if (!myFeedList || !feedLoading) {
      setFeedList(data.data.post);
    }
  }, [feedLoading, feedList, myFeedList]);

  const handleClickTab = (event) => {
    event.target.id === `1` ? setColor(false) : setColor(true);
  };

  const {
    data: FollowData,
    isLoading: FollowLoading,
    mutate: Following,
  } = useMutation(postFollowQuery(accountname, user.token));

  const {
    data: unFollowData,
    isLoading: unFollowLoading,
    mutate: unFollowing,
  } = useMutation(deleteFollowQuery(accountname, user.token));

  const handleClickBtns = (event) => {
    switch (event.target.id) {
      case 'chat':
        navigate(pageUrlConfig.chatPage);
        break;
      case 'share':
        const BASE_URL = import.meta.env.BASE_URL;
        navigator.clipboard.writeText(`${BASE_URL}${pathname}`);
        alert('링크 복사 완료!');
        break;
      case 'edit':
        navigate(`${pageUrlConfig.profilePage}/${user.accountname}/edit`);
        break;
      case 'unfollow':
        unFollowing();
        break;
      case 'follow':
        Following();
        break;
    }
  };
  return (
    <PageTemplate>
      {isLoading && !profileInfo ? (
        <div>loading</div>
      ) : (
        <UpperSection>
          <ProfileHeader>
            <Link to={`${pageUrlConfig.profilePage}/${accountname}/follower`}>
              <Follow>
                <span>{profileInfo.followerCount}</span>
                followers
              </Follow>
            </Link>
            <ProfileImg
              src={
                profileInfo.image === 'http://146.56.183.55:5050/Ellipse.png'
                  ? 'https://api.mandarin.weniv.co.kr/Ellipse.png'
                  : profileInfo.image
              }
              alt="프로필 이미지"
              onError={(event) => {
                event.target.src = basicProfile;
              }}
            />
            <Link to={`${pageUrlConfig.profilePage}/${accountname}/following`}>
              <Follow>
                <span>{profileInfo.followingCount}</span>
                followings
              </Follow>
            </Link>
          </ProfileHeader>

          <ProfileBody>
            <UserName>{profileInfo.username}</UserName>
            <AccountName>@{accountname}</AccountName>
            <ProfileDsc>{profileInfo?.intro ?? `1호선 빌런 꿈나무`}</ProfileDsc>
            <ButtonWrap onClick={handleClickBtns}>
              <button id="chat"></button>
              {isMy ? (
                <DefaultBtn id={`edit`}>프로필 수정</DefaultBtn>
              ) : profileInfo.isfollow ? (
                <DefaultBtn variant={'basic'} id={`unfollow`}>
                  언팔로우
                </DefaultBtn>
              ) : (
                <DefaultBtn variant={'primary'} id={`follow`}>
                  팔로우
                </DefaultBtn>
              )}
              <button id="share"></button>
            </ButtonWrap>
          </ProfileBody>
        </UpperSection>
      )}

      <DownSection>
        <TabGroup color={color} onClick={handleClickTab}>
          <Tab id={`1`}>게시글</Tab>
          <Tab id={`2`}>택배 목록</Tab>
        </TabGroup>
        <ListWrap>
          {color ? (
            <Goods products={goodsList} />
          ) : (
            feedList
              .filter((post) => {
                const contents = JSON.parse(post.content);
                return contents.postId === 'villains';
              })
              .map((post, index) => {
                const contents = JSON.parse(post.content);
                const parsedPost = { ...post, _id: post.id, content: contents };
                return <PostCard post={parsedPost} key={post.id} />;
              })
          )}
        </ListWrap>
      </DownSection>
    </PageTemplate>
  );
};
export default ProfilePage;

const UpperSection = styled.section`
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
  min-height: 110px;

  & > :not(:nth-child(2)) {
    margin: 0 auto;
  }
`;
const ProfileBody = styled.div`
  margin: 0 auto;
  text-align: center;
`;
const Follow = styled.div`
  font-size: ${theme.fontSize.caption};
  & span {
    display: block;
    font-size: ${theme.fontSize.body1};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: 7px;
  }
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  flex-basis: calc(100% / 3);
  margin-top: 30px;
  margin-bottom: 11px;
`;

const UserName = styled.p`
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 10px;
`;

const AccountName = styled.p`
  margin-bottom: 17px;
  font-size: ${theme.fontSize.body3};
`;

const ProfileDsc = styled.p`
  margin-bottom: 24px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 10px;
  min-height: 2em;

  flex-shrink: 0;

  & > :not(:nth-child(2)) {
    flex-grow: 0.5;
    border: 1px solid;
    border-radius: 50%;
    padding: 7px;
    border-color: ${theme.color.grey};
    width: 44px;
    height: 34px;
    background: url(${ShareIcon}) no-repeat center/80%;
  }

  & > :nth-child(1) {
    background: url(${ChatIcon}) no-repeat center/70%;
  }
  & > :nth-child(2) {
    padding: 9px;
    min-width: 120px;
    flex-grow: 1.5;
  }
`;

const DownSection = styled.section`
  border-top: 6px solid ${theme.color.light};
`;

const TabGroup = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 64px;
  background-color: ${theme.color.white};

  & :nth-child(1) {
    ${(props) => (props.color ? SecondaryStyle : BasicStyle)}
  }
  & :nth-child(2) {
    ${(props) => (!props.color ? SecondaryStyle : BasicStyle)}
  }
`;

const Tab = styled.button`
  flex-basis: 50%;
  flex-shrink: 0;
`;

const ListWrap = styled.ul`
  padding: 16px 8px;
`;
