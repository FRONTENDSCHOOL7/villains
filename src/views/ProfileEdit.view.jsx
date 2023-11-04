import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageTemplate from '../components/PageTemplate';
import basicProfile from '../../src/assets/img/basic-profile.svg';
// import imgIcon from `../assets/img/image-icon.svg`

const ProfileEditPage = () => {
  return (
    <PageTemplate>
      <ProfileHeader>
        <ProfileImg src={basicProfile} alt="프로필 이미지" />
        <ImgEditBtn>버튼</ImgEditBtn>
        {/* <IconButton onClick={onClick ?? handleClick} disabled={disabled ?? false} img={imgIcon}>
      {이미지 업로드 버튼}
    </IconButton> */}
      </ProfileHeader>

      <ProfileEditContent>
        <p>사용자 이름</p>
        <input placeholder="2~10자 이내" />
        <p>소개</p>
        <input placeholder="자기소개" />
      </ProfileEditContent>
    </PageTemplate>
  );
};

export default ProfileEditPage;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  border: 1px solid orange;
  margin: 0 auto;
  width: 100%;
  position: relative;

  /* & > :not(:nth-child(2)) {
    margin: 0 auto;
  } */
`;

const ProfileImg = styled.img`
  max-width: 100%;
  flex-shrink: 0;
  flex-basis: calc(100% / 3);
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ImgEditBtn = styled.button`
  box-shadow: inset 0 0 10px orange;

  position: absolute;
  right: 33%;
  bottom: 7%;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const ProfileEditContent = styled.div`
  box-shadow: inset 0 0 10px orange;
`;

const input = styled.input`
  box-shadow: inset 0 0 10px orange;
  border-bottom: 1px solid #767676;
  width: 322px;
  height: 48px;
`;
