import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import PageTemplate from '../../components/PageTemplate';
import NavMenu from '../../components/layout/NavMenu';
import BackHeader from '../../components/layout/BackHeader';
import DefaultBtn, { BasicStyle } from '../../components/GlobalButton';
import BackArrow from '../../assets/img/icon-arrow-left.svg';
import styled from 'styled-components';
import Tanghulu from '../../components/Tanghulu';
import pageUrlConfig from '../../config/pageUrlConfig';

const ChatIndexPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickBack = () => {
    navigate(-1);
  };
  
  return (
    <>
      <BackHeader>
        <BackArrowBtn variant={'basic'} onClick={handleClickBack}>
          <img src={BackArrow} alt="뒤로가기" />
        </BackArrowBtn>
        <Tanghulu />
      </BackHeader>
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
