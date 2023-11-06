import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/PageTemplate';
import basicProfile from '../../assets/img/basic-profile.svg';
// import imgIcon from `../../assets/img/image-icon.svg`

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

      <ProfileEditContentWrap>
        <ProfileEditContent>
          <p>사용자 이름</p>
          <ProfileInput placeholder="2~10자 이내여야 합니다."></ProfileInput>
        </ProfileEditContent>
        <ProfileEditContent>
          <p>소개</p>
          <ProfileInput placeholder="자신과 판매할 상품에 대해 소개해 주세요."></ProfileInput>
        </ProfileEditContent>
      </ProfileEditContentWrap>
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
  box-shadow: inset 0 0 10px blue;

  position: absolute;
  right: 33%;
  bottom: 16%;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const ProfileEditContentWrap = styled.div`
  box-shadow: inset 0 0 10px red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileEditContent = styled.div`
  /* box-shadow: inset 0 0 10px orange; */

  width: 322px;
  height: 48px;
  font-size: 14px;
  color: #767676;
`;

const ProfileInput = styled.input`
  border-bottom: 1px solid #767676;

  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
  width: 100%;
  padding-bottom: 7px;
  border-width: 0 0 1px;
  border-color: #dbdbdb;
`;
