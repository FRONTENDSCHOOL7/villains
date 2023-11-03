import React from 'react';
import styled from 'styled-components';
import pageUrlConfig from '../config/pageUrlConfig';
import { useNavigate } from 'react-router';

const Goods = ({ products }) => {
  const navigate = useNavigate();

  const handleClickProductCard = (product) => {
    const productDetailUrl = `${pageUrlConfig.goodsPage}/${product.id}`
    navigate(productDetailUrl);
  }
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} onClick={() => handleClickProductCard(product)}>
          <ProductImg src={product.itemImage} alt=""></ProductImg>
          <ProductInfoArea>
            <ProductTitle>{product.itemName}</ProductTitle>
            <Wrap>
              {JSON.parse(product.link).state === '요청중' ? (
                <ProductState color="#3C58C1">{JSON.parse(product.link).state}</ProductState>
              ) : JSON.parse(product.link).state === '배달중' ? (
                <ProductState color="#4CAF50">{JSON.parse(product.link).state}</ProductState>
              ) : (
                <ProductState color="#767676">{JSON.parse(product.link).state}</ProductState>
              )}
              <ProductPrice>{product.price}</ProductPrice>
            </Wrap>
            <AccountName>@ {JSON.parse(product.link).accountname}</AccountName>
          </ProductInfoArea>
        </ProductCard>
      ))}
    </div>
  );
};
const ProductCard = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;
const ProductImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
`;
const ProductInfoArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ProductTitle = styled.span`
  font-size: 14px;
`;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProductState = styled.div`
  padding: 4px 6px;
  background-color: ${(props) => props.color};
  font-size: 12px;
  border-radius: 2px;
  color: white;
`;
const ProductPrice = styled.span`
  font-size: 14px;
  font-weight: 800;
`;
const AccountName = styled.span`
  font-size: 12px;
  color: #767676;
`;

export default Goods;
