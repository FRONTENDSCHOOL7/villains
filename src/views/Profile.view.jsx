import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';

import getPosts from '../api/getPosts.api';
import pageUrlConfig from '../config/pageUrlConfig';
import PageTemplate from '../components/PageTemplate';
import PostCard from '../components/feed/PostCard';
import basicProfile from '../../src/assets/img/basic-profile.svg';
import ErrorPage from './Error.view';
import Profile from '../components/profile/profile';

<<<<<<< HEAD
const ProfilePage = () => {
  const navigate = useNavigate();
  //현재 프로필 페이지의 계정
  // /user/:accountname /user/villains /user
  const user = useRecoilValue(userAtom);
  const { accountname } = useParams();
  // const [읽기 전용 변수, 변수 수정용 함수] = useState(읽기 전용 변수의 값);
  // let currentAccount = accountname;
  const [currentAccount, setCurrentAccount] = useState(accountname);
  if (!accountname) {
    //url에 accountname이 없는 경우 === 자기의 프로필로 들어왔을 경우 === 내 accountname일 경우
    //현재 프로필 페이지의 계정을 자신의 것으로 설정한다.
    //currentAcount = user.accountname;
    if (!user) {
      try {
        const userItem = localStorage.getItem('user');
        setCurrentAccount(JSON.parse(userItem).accountname);
      } catch (error) {
        console.error(error);
        navigate(pageUrlconfig.signInPage);
      }
    } else {
      setCurrentAccount(user.accountname);
    }
  }
  console.log(currentAccount);

  const [color, setColor] = useState(false);
  const [alignment, setAlignment] = useState();

  const handleClickEdit = () => {
    navigate(pageUrlConfig.profileEdit);
  };

  const { post, loading, error } = getPosts();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <PageTemplate>
      <Header>프로필 페이지 임시 헤더</Header>

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
        {/* <Link to="/user/edit">프로필 수정</Link>  */}
        {/* <SmallBtn
            background={'red'}
            color={'black'}
            cursor={'pointer'}
            border={'black'}
            text={'프로필 수정'}
            onClick={handleClickEdit}
            disabled={false}
          >
            프로필 수정
          </SmallBtn> */}
        <EditBtn>프로필 수정</EditBtn>
        {/* </ProfileContent> */}
      </UpperSection>

      {/*  게시글 */}
      <DownSection>
        <TabGroup color={color} value={alignment} onClick={handleChange}>
          <Tab value={'게시글'}>게시글</Tab>
          <Tab>택배 목록</Tab>
        </TabGroup>

        <PostCard>
          <FeedCard>
            <CardImg>Img</CardImg>
            <CardContent>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
              {/* <ProfileEmail>@villain_no1</ProfileEmail>
            <Date>2020년 10월 21일</Date>
            <IconBtn>
              <img src="/" alt="좋아요 버튼" />
            </IconBtn> */}
            </CardContent>
          </FeedCard>
        </PostList>
      </DownSection>
    </PageTemplate>
  );
};
export default ProfilePage;
<<<<<<< HEAD

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
`;
=======
>>>>>>> a3bf4d0 ([MODIFY] NavMenu.jsx, profile.jsx 수정)

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;

// 뒤로가기 버튼이 있는 Nav
// const TopBasicNav = styled.div`
//   box-shadow: inset 0 0 10px grey;
//   max-width: 390px;
//   height: 40px;
// `;

// const BackButton = styled.button`
//   border: 1px solid #000;
// `;

// const Kebab = styled.button`
//   border: 1px solid #000;
// `;

// 프로필 카드 상단부
const UpperSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid blue;
  max-width: 400px;
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

const EditBtn = styled.button`
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  width: 120px;
  height: 34px;
  margin-bottom: 24px;
`;

// 컨텐츠를 포함하는 하단부
const DownSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: inset 0 0 10px blue;
  max-width: 400px;
  height: 100vh;
  margin-top: 6px;
`;

const TabGroup = styled.div`
  display: flex;

  box-shadow: inset 0 0 10px skyblue;
  max-width: 400px;
  height: 64px;
`;

const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
  background-color: ${(props) => props.color};
  width: 195px;
  height: 64px;

  /* &:active {
    background-color: white;
  } */
  /* ${({ active }) =>
    active &&
    `color: ${theme.color.black};
     border-color: ${theme.color.secondary};
  `} */
`;
const types = ['게시글', '택배 목록'];

const PostList = styled.ul`
  width: 100%;
  padding: 20px 20px 0 20px;
`;

const FeedCard = styled.div`
  box-shadow: 0 0 10px orange;

  border-radius: 10px;
  border: 1px solid #dbdbdb;
  width: 350px;
  margin-top: 20px;
`;

const CardImg = styled.div`
  box-shadow: 0 0 10px orange;

  width: 350px;
  height: 180px;
`;

const CardContent = styled.div`
  box-shadow: 0 0 10px orange;
  width: 350px;
  height: 88px;
  padding: 16px;
`;
