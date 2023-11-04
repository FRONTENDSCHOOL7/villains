import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import pageUrlConfig from '../../config/pageUrlConfig';
import PageTemplate from '../../components/PageTemplate';
import basicProfile from '../../assets/img/basic-profile.svg';

const ProfilePage = () => {
  const navigator = useNavigate();
  const handleClickEdit = () => {
    navigator(pageUrlConfig.profileEdit);
  };
  return (
    <PageTemplate>
      <Title>프로필 페이지</Title>

      <UpperSection>
        {/* 임시 헤더 입니다.  */}
        {/* <TopBasicNav>
          <BackButton>뒤로가기 버튼</BackButton>
          <Kebab>
            <img src="/" alt="/" />
          </Kebab>
        </TopBasicNav> */}

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

        <ProfileContent>
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
        </ProfileContent>
      </UpperSection>

      {/*  게시글 */}
      <DownSection>
        <Tab>
          <CardTab>게시글</CardTab>
          <CardTab>택배 목록</CardTab>
        </Tab>

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
      </DownSection>
    </PageTemplate>
  );
};
export default ProfilePage;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
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

const Tab = styled.div`
  display: flex;

  box-shadow: inset 0 0 10px skyblue;
  max-width: 400px;
  height: 64px;
`;
const CardTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
  width: 195px;
  height: 64px;
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
