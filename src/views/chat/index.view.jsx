import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import NavMenu from '../../components/layout/NavMenu';
import BackHeader from '../../components/layout/BackHeader';
import DefaultBtn, { BasicStyle } from '../../components/button/GlobalButton';
import ArrowIcon from '../../components/icon/ArrowIcon';
import styled from 'styled-components';
import Tanghulu from '../../components/icon/Tanghulu';
import pageUrlConfig from '../../config/pageUrlConfig';
import userAtom from '../../atoms/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

const ChatIndexPage = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname.split('/');

  const handleClickBack = () => {
    navigate(pageUrlConfig.chatPage);
  };

  const handleChatHeader = () => {
    if (page[4] === user.accountname) {
      return <Tanghulu />;
    } else return null;
  };


  return (
    <>
      {pathname.split('/').length > 3 && (
        <BackHeader>
          <BackArrowBtn variant={'basic'} onClick={handleClickBack}>
            <img src={ArrowIcon} alt="뒤로가기" />
          </BackArrowBtn>
          {handleChatHeader()}
        </BackHeader>
      )}
      <Outlet />
      {pathname === pageUrlConfig.chatPage && <NavMenu />}
    </>
  );
};

export default ChatIndexPage;

const BackArrowBtn = styled.button`
  ${BasicStyle}
  margin-right: 8px;
`;
