import { useNavigate, useParams, useRouteLoaderData, useLocation } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import pageUrlConfig from '../../config/pageUrlConfig';
import PageTemplate from '../../components/PageTemplate';
import basicProfile from '../../assets/img/basic-profile.svg';
import { useRecoilValue } from 'recoil';
import PostCard from '../../components/feed/PostCard';
import userPostAtom from '../../atoms/userPostAtom';
import profileAtom from '../../atoms/profileAtom';
import getUserInfo from '../../api/get/getUserInfo.api';
import  DefaultBtn, { BasicStyle, PrimaryStyle, SecondaryStyle } from '../../components/GlobalButton';
import theme from '../../style/theme';
import contactQuery from '../../api/get/getUserPost.api';
import Goods from '../../components/Goods';
import ChatIcon from '../../assets/img/message-circle.svg';
import ShareIcon from '../../assets/img/icon-404.svg'
import getProducts from '../../api/get/getProducts.api';


const ProfilePage = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const user = useRouteLoaderData('user');
  const { accountname } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(accountname);
  const [profileInfo, setProfileInfo] = useState();
  const myProfileInfo = useRecoilValue(profileAtom);
  const myFeedList = useRecoilValue(userPostAtom);
  const [feedList, setFeedList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);

  const {data, isFetching, isLoading:feedLoading, isError} = useQuery(contactQuery(user.accountname, user.token));

  const { products, loading, error } = getProducts();
  useEffect(()=>{
    setGoodsList(products);
  },[loading])

  useEffect(() => {
    if(profileInfo) setIsLoading(false);
    if (accountname === user.accountname) {
      setIsMy(true);
      setProfileInfo(myProfileInfo);
      setFeedList(myFeedList);
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

  useEffect(()=>{
    if(!myFeedList || !feedLoading){
      setFeedList(data.data.post)
    }
  }, [feedLoading, feedList, myFeedList])
  
  console.log(feedList);
  const handleClickEdit = () => {
    navigate(pageUrlConfig.profileEdit);
  };

  const handleClickTab = (event) => {
    event.target.id === `1` ? setColor(false) : setColor(true);
  }

  const handleClickBtns = (event) => {
    switch(event.target.id){
      case 'chat':
        navigate(pageUrlConfig.chatPage);
        break;
      case 'share':
        console.log('here')
        const BASE_URL = import.meta.env.BASE_URL;
        navigator.clipboard.writeText(`${BASE_URL}${pathname}`);
        alert('링크 복사 완료!');
        break;
      case 'edit':
        navigate(`${pageUrlConfig.profilePage}/${user.accountname}/edit`)
      break;
      case 'unfollow':

      break;
      case 'follow':

        break;
    }

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
            <ButtonWrap onClick={handleClickBtns}>
              <button id='chat'></ button>
              {isMy ? 
              <DefaultBtn id={`edit`}>프로필 수정</DefaultBtn> : (profileInfo.isfollow ? 
                <DefaultBtn variant={'basic'} id={`unfollow`}>언팔로우</DefaultBtn> 
                :  <DefaultBtn variant={'primary'} id={`follow`}>팔로우</DefaultBtn> 
              )}
              <button id='share'></ button>
              </ButtonWrap>
          </ProfileBody>
        </UpperSection>
  
        <DownSection>
          <TabGroup color={color} onClick={handleClickTab}>
            <Tab id={`1`}>게시글</Tab>
            <Tab id={`2`}>택배 목록</Tab>
          </TabGroup>
         <ListWrap>
            {color ?
              <Goods products={goodsList}/>
             :
             feedList.map((post, index) => {
                const contents = JSON.parse(post.content);
                const parsedPost = {...post, _id: post.id, content: contents}
                return <PostCard post={parsedPost} key={post.id}/>
              })
            }
         </ListWrap>

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
  min-height: 110px;

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
  min-height: 2em;
  
  flex-shrink: 0;

  & > :not(:nth-child(2)){
    flex-grow: 0.5;
    border: 1px solid;
    border-radius: 50%;
    padding: 7px;
    border-color: ${theme.color.grey};
    width: 44px;
    height: 34px;
    background: url(${ShareIcon}) no-repeat center/80%;
  }

    
  & > :nth-child(1){
    background: url(${ChatIcon}) no-repeat center/70%;
  }
  & > :nth-child(2){
    padding: 9px;
    min-width: 120px;
    flex-grow: 1.5;
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
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 64px;
  background-color: ${theme.color.white};

  & :nth-child(1){
    ${(props)=> props.color? SecondaryStyle : BasicStyle}
  }
  & :nth-child(2){
    ${(props)=> !props.color? SecondaryStyle : BasicStyle}
  }
`;

const Tab = styled.button`
  flex-basis: 50%;
  flex-shrink: 0;
`;

const ListWrap = styled.ul`
  padding: 16px 8px;
`