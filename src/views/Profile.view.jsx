import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import getPosts from '../api/getPosts.api';
import pageUrlConfig from '../config/pageUrlConfig';
import PageTemplate from '../components/PageTemplate';
import PostCard from '../components/feed/PostCard';
import basicProfile from '../../src/assets/img/basic-profile.svg';
import ErrorPage from './Error.view';
import Profile from '../components/profile/profile';

const ProfilePage = () => {
  const navigator = useNavigate();
  const handleClickEdit = () => {
    navigator(pageUrlConfig.profileEdit);
  };

  const { post, loading, error } = getPosts();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <PageTemplate>
      <Header>프로필 페이지 임시 헤더</Header>

      <Profile />

      {/*  게시글 */}
      <DownSection>
        <TabGroup>
          <Tab>게시글</Tab>
          <Tab>택배 목록</Tab>
        </TabGroup>

        <PostList>
          {/* {post.map((post) => (
            <PostCard post={post} key={post._id} />
          ))} */}
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

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
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
  width: 195px;
  height: 64px;

  ${({ active }) =>
    active &&
    `background-color:${theme.color.secondary};
     color: ${theme.color.black};
     border-color: ${theme.color.secondary};
  `}
`;
const types = ['게시글', '택배 목록'];

const PostList = styled.ul`
  width: 100%;
  padding: 20px 20px 0 20px;
`;

const FeedCard = styled.div`
  box-shadow: 0 0 10px orange;

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
