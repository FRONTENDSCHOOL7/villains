import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import PageTemplate from '../../components/PageTemplate';
import NavMenu from '../../components/layout/NavMenu';

const ChatIndexPage = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Outlet />
      <NavMenu />
    </>
  );
};

export default ChatIndexPage;
