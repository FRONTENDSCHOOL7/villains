import React, { useState, useEffect } from 'react';
import PageTemplate from '../../components/PageTemplate';
import styled from 'styled-components';
import getProductDetail from '../../api/getProductDetail.api';
import { useNavigate, useParams } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';
import profileImage from '../assets/img/basic-profile.svg';
import getUserDetail from '../../api/getUserDetail.api';

const GoodsDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProduct } = getProductDetail();
  const { fetchUser } = getUserDetail();
  const [product, setProduct] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');

  // product 상세 정보 가져오기
  useEffect(() => {
    const fetchProductData = async () => {
      const result = await fetchProduct(id);
      if (!result) {
        return navigate(pageUrlConfig.goodsPage);
      } else {
        setProduct(result);
        setLink(JSON.parse(result.link));
      }
    };
    fetchProductData();
  }, [id]);

  // 택배 작성자 찾기
  useEffect(() => {
    const fetchAuthorData = async () => {
      const result = await fetchUser(link.accountname);
      if (!result) {
        return navigate(pageUrlConfig.goodsPage);
      } else {
        setAuthor(result);
      }
    };
    if (link !== '') {
      fetchAuthorData();
    }
  }, [link]);


  return (
    <PageTemplate>
      {product && (
        <>
          <ProfileArea>
            {/* <ProfileImg src={product.author.image}></ProfileImg> */}
            <ProfileImg src={profileImage}></ProfileImg>
            <NameWrap>
              <Name>{author.username}</Name>
              <AccountName>@ {author.accountname}</AccountName>
            </NameWrap>
          </ProfileArea>
          <ProductImg src={product.itemImage}></ProductImg>
          <ProductTitleArea>
            <NameWrap>
              <Title>{product.itemName}</Title>
              <Price>{product.price}원</Price>
            </NameWrap>
            {link.state === '요청중' ? (
              <State color={'#3c58c1'}>{link.state}</State>
            ) : link.state === '배달중' ? (
              <State color={'#4CAF50'}>{link.state}</State>
            ) : (
              <State color={'#767676'}>{link.state}</State>
            )}
          </ProductTitleArea>
          <InfoArea>
            <Info>{link.itemInfo}</Info>
          </InfoArea>
        </>
      )}
    </PageTemplate>
  );
};
const ProfileArea = styled.div`
  padding: 8px 16px;
  display: flex;
  gap: 10px;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 0.5px solid #dbdbdb;
`;
const NameWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
const Name = styled.span`
  font-size: 14px;
`;
const AccountName = styled.span`
  font-size: 12px;
  color: #767676;
`;
const ProductImg = styled.img`
  width: 100%;
  height: 290px;
`;
const ProductTitleArea = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
const Price = styled.span`
  color: #3c58c1;
  font-weight: 800;
`;
const State = styled.button`
  background-color: ${(props) => props.color};
  font-size: 14px;
  padding: 8px 21px;
  border-radius: 9999px;
  color: white;
`;
const InfoArea = styled.div`
  padding: 30px 32px;
`;
const Info = styled.div``;

export default GoodsDetailPage;
