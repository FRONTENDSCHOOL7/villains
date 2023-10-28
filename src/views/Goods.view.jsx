import React from 'react';
import PageTemplate from '../components/PageTemplate';
//import pageUrlConfig from '../config/pageUrlConfig';
import styled from 'styled-components';

const Goods = () => {
  return (
    <PageTemplate>
      <Title>상품 페이지</Title>
      <Header>임시 헤더입니다.</Header>
    </PageTemplate>
  );
};

export default Goods;

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
