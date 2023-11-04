import React, { useState, useEffect } from 'react';
import PageTemplate from '../../components/PageTemplate';
import styled from 'styled-components';
import getProductDetail from '../../api/getProductDetail.api';
import { useNavigate, useParams } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';
import profileImage from '../assets/img/basic-profile.svg';
import getUserDetail from '../api/getUserDetail.api';
import DropDown from '../components/DropDown';
import updateProduct from '../api/updateProduct.api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bottomSheetOptions, bottomSheetStateAtom } from '../atoms/bottomSheetStateAtom';
import deleteProduct from '../api/deleteProduct.api';
import realProductAuthorAtom from '../atoms/realProductAuthorAtom';
import userAtom from '../atoms/userAtom';

const GoodsDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProduct } = getProductDetail();
  const { fetchUser } = getUserDetail();
  const goodsState = ['요청중', '배달중', '배달완료'];
  const [product, setProduct] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 초기에는 드롭다운 숨김 상태
  const loginUser = JSON.parse(localStorage.getItem('user')).accountname;
  const [bottomSheetTogle, setBottomSheetTogle] = useRecoilState(bottomSheetStateAtom);
  const [buttonOptions, setButtonOptions] = useRecoilState(bottomSheetOptions);
  const [realProductAuthor, setRealProductAuthor] = useRecoilState(realProductAuthorAtom);
  const user = useRecoilValue(userAtom);

  // product 상세 정보 가져오기
  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    const result = await fetchProduct(id);
    if (!result) {
      return navigate(pageUrlConfig.goodsPage);
    } else {
      setProduct(result);
      setLink(JSON.parse(result.link));
    }
  };


  // 택배 작성자 찾기
  useEffect(() => {
    setRealProductAuthor(link.accountname);
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

  useEffect(() => {
    setButtonOptions([
      {
        label: '삭제',
        callback: async () => {
          const result = await deleteProduct(id);
          if (result) {
            setBottomSheetTogle(false);
            navigate(pageUrlConfig.goodsPage);
          }
        },
      },
      {
        label: '수정',
        callback: () => {
          //수정 페이지로 데이터 전달, 이동
          setBottomSheetTogle(false);
          const goodsEditUrl = `${pageUrlConfig.goodsPage}/edit/${id}`;
          navigate(goodsEditUrl, { state: product });
        },
      },
    ]);
  }, [author]);

  const handleStateBtn = () => {
    setIsDropdownVisible((prevIsDropdownVisible) => !prevIsDropdownVisible);
  };

  const handleDropDown = async (e) => {
    const newLink = JSON.stringify({
      accountname: link.accountname,
      itemInfo: link.itemInfo,
      state: e.target.textContent,
    });
    const result = await updateProduct(product.itemName, product.price, newLink, product.itemImage, id);
    if (result) {
      // 택배 상태 버튼 업데이트를 위해 한번 더 api 호출 -> 리액트 쿼리로 바꾸면 한번만 불러도?..
      fetchProductData();
    }
    setIsDropdownVisible(false);
  };

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
            <StateWrap>
              {link.state === '요청중' ? (
                <State color={'#3c58c1'} onClick={handleStateBtn}>
                  {link.state}
                </State>
              ) : link.state === '배달중' ? (
                <State color={'#4CAF50'} onClick={handleStateBtn}>
                  {link.state}
                </State>
              ) : (
                <State color={'#767676'} onClick={handleStateBtn}>
                  {link.state}
                </State>
              )}
              {/* 작성자 검증 */}
              {loginUser === author.accountname && isDropdownVisible && (
                <DropDown state={goodsState} onClick={handleDropDown}></DropDown>
              )}
            </StateWrap>
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
  padding: 8px 26px;
  border-radius: 9999px;
  color: white;
`;
const StateWrap = styled.div`
  position: relative;
`;
const InfoArea = styled.div`
  padding: 30px 32px;
`;
const Info = styled.div``;

export default GoodsDetailPage;
