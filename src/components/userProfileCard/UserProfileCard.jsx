import React from 'react';
//import './UserProfileCard.css';
import profile_icon from '../Assets/UserImage.svg';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import pageUrlConfig from '../../config/pageUrlConfig';
import PageTemplate from '../PageTemplate';
import { SmallBtn } from '../Buttons';

const UserProfileCard = () => {
  const navigator = useNavigate();
  const handleClickEdit = () => {
    navigator(pageUrlConfig.profileEdit);
  };
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

        <ProfileContent>
          <UserName>나야나</UserName>
          <ProfileEmail>@villain_no1</ProfileEmail>
          <ProfileDsc>1호선 빌런 꿈나무</ProfileDsc>
          {/* <Link to="/user/edit">프로필 수정</Link>  */}
          <SmallBtn
            background={'red'}
            color={'black'}
            cursor={'pointer'}
            border={'black'}
            text={'프로필 수정'}
            onClick={handleClickEdit}
            disabled={false}
          >
            프로필 수정
          </SmallBtn>
        </ProfileContent>
      </UpperSection>
      {/* <DownSection>
        <span>게시글</span>
        <span>택배 목록</span>
        <FeedCard>
          <CardImg>Img</CardImg>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
        </FeedCard>
      </DownSection> */}
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
  flex-direction: column;
  border: 0.5px solid blue;
  max-width: 400px;
  height: 200px;
`;

const ProfileHeader = styled.div`
  border: 1px solid orange;
  margin: 0 auto;
  max-width: 360px;
  height: 200px;
`;

const Followers = styled.div`
  display: inline-block;
  vertical-align: middle;

  border: 0.5px solid #dbdbdb;
  max-width: 120px;
`;

const ProfileImg = styled.div`
  display: inline-block;
  vertical-align: middle;

  border: 0.5px solid #dbdbdb;
  max-width: 120px;
  height: 120px;
`;

const Followings = styled.div`
  display: inline-block;
  vertical-align: middle;

  border: 0.5px solid #dbdbdb;
  max-width: 120px;
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

// const ProfileEditBtn = styled.button`
//   border: 1px solid #dbdbdb;
//   color: #767676;
//   border-radius: 30px;
//   width: 120px;
//   height: 34px;
// `;

// 탭 포함하는 프로필 하단부
const DownSection = styled.div`
  border: 1px solid blue;
  max-width: 400px;
  height: 100vh;
`;

const CardTab = styled.div`
  border: 1px solid red;
`;

// const FeedCard = styled.div`
//   border: 0.5px solid #dbdbdb;
//   max-width: 400px;
//   height: 700vh;
// `;

// const CardImg = styled.div`
//   border: 0.5px solid #dbdbdb;
//   max-width: 300px;
//   height: 20vh;
// `;
