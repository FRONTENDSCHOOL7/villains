import React from 'react';
//import './UserProfileCard.css';
import profile_icon from '../Assets/UserImage.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import pageUrlConfig from '../../config/pageUrlConfig';
import PageTemplate from '../PageTemplate';

const UserProfileCard = () => {
  return (
    <PageTemplate>
      <Title>프로필 페이지</Title>
      <Header>
        <BackButton>뒤로가기 버튼</BackButton>
      </Header>
      <UpperSection>
        <ProfileHeader>
          <Followers>followers</Followers>
          <ProfileImg>
            <img src={profile_icon} alt="프로필 이미지" />
          </ProfileImg>
          <Followings>followings</Followings>
        </ProfileHeader>

        <ProfileMain>
          <UserName>나야나</UserName>
          <ProfileEmail>@villain_no1</ProfileEmail>
          <ProfileDsc>1호선 빌런 꿈나무</ProfileDsc>
        </ProfileMain>

        <div className="profile-correctBtn">
          {/* <Link to="/user/edit">프로필 수정</Link> */}
          <Link to={pageUrlConfig.profileEdit}>
            <ProfileEditBtn>프로필 수정</ProfileEditBtn>
            <DownSection>
              <span>게시글</span>
              <span>테마 목록</span>
              <FeedCard>
                <CardImg>Img</CardImg>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
              </FeedCard>
            </DownSection>
          </Link>
        </div>
      </UpperSection>
    </PageTemplate>
  );
};
export default UserProfileCard;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
`;
// 뒤로가기 버튼이 있는 헤더
const Header = styled.div`
  border-bottom: 1px solid #ccc;
`;

const BackButton = styled.button`
  border: 1px solid #000;
`;

// 프로필 카드 상단부
const UpperSection = styled.div`
  display: flex;
  border: 0.5px solid blue;
  max-width: 400px;
  height: 200px;
`;

const ProfileHeader = styled.div`
  border: 1px solid orange;
  max-width: 360px;
  height: 200px;
`;

const Followers = styled.div`
  display: inline-block;

  border: 0.5px solid #dbdbdb;
  max-width: 120px;
  height: 120px;
`;

const ProfileImg = styled.div`
  display: inline-block;

  border: 0.5px solid #dbdbdb;
  max-width: 120px;
  height: 120px;
`;

const Followings = styled.div`
  display: inline-block;

  border: 0.5px solid #dbdbdb;
  max-width: 120px;
  height: 120px;
`;

// 프로필 설명
const ProfileMain = styled.div`
  border: 1px solid orange;
  max-width: 360px;
  height: 200px;
`;

const UserName = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 17px;
`;

const ProfileEmail = styled.p`
  color: #000;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ProfileDsc = styled.p`
  color: #000;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ProfileEditBtn = styled.button`
  border: 1px solid #dbdbdb;
  color: #767676;
  border-radius: 4px;
  width: 120px;
  height: 34px;
`;

// 탭 포함하는 프로필 하단부
const DownSection = styled.div`
  border: 0.5px solid #dbdbdb;
  max-width: 400px;
  height: 100vh;
`;

const FeedCard = styled.div`
  border: 0.5px solid #dbdbdb;
  max-width: 400px;
  height: 700vh;
`;

const CardImg = styled.div`
  border: 0.5px solid #dbdbdb;
  max-width: 300px;
  height: 20vh;
`;
