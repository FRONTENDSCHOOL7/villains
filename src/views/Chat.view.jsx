import React from 'react';
import basicProfile from '../../src/assets/img/basic-profile.svg';
import styled from 'styled-components';
import pageUrlConfig from '../config/pageUrlConfig';
import PageTemplate from '../components/PageTemplate';

const ChatPage = () => {
  return (
    <PageTemplate>
      <Title>채팅 페이지</Title>
      <Header>임시 헤더입니다.</Header>
    </PageTemplate>
  );
};
export default ChatPage;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
`;
