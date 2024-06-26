import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../../atoms/bottomSheetStateAtom';
import userAtom from '../../atoms/userAtom';
import realProductAuthorAtom from '../../atoms/realProductAuthorAtom';
import PageTemplate from '../../components/layout/PageTemplate';
import styled from 'styled-components';
import getProductDetail from '../../api/get/getProductDetail.api';
import deleteProduct from '../../api/delete/deleteProduct.api';
import { useNavigate, useParams } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';
import profileImage from '../../assets/img/basic-profile.svg';
import getUserDetail from '../../api/get/getUserDetail.api';
import updateProduct from '../../api/update/updateProduct.api';
import uploadPost from '../../api/post/postUploadPost.api';
import DropDown from '../../components/option/DropDown';
import TrainMap from '../../components/map/TrainMap';
import Modal from '../../components/modal/Modal';
import getPostDetail from '../../api/get/getPostDetail.api';

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
  const loginUser = JSON.parse(localStorage.getItem('user'));
  const [bottomSheetTogle, setBottomSheetToggle] = useRecoilState(bottomSheetStateAtom);
  const [buttonOptions, setButtonOptions] = useRecoilState(bottomSheetOptions);
  const [realProductAuthor, setRealProductAuthor] = useRecoilState(realProductAuthorAtom);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    content: '',
    confirmText: '',
    cancelText: '',
    onConfirm: '',
    onCancel: '',
  });
  const user = useRecoilValue(userAtom);
  const { fetchPost } = getPostDetail();

  const [stationName, setStationName] = useState([]); //[startStation, endStation]

  // product 상세 정보 가져오기
  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    const result = await fetchProduct(id);
    if (!result) {
      return navigate(pageUrlConfig.goodsPage);
    } else {
      const stations = result.itemName.split('~');
      setProduct(result);
      setLink(JSON.parse(result.link));
      setStationName([stations[0], stations[1]]);
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
        callback: () => {
          setShowModal(true);
          setBottomSheetToggle(false);
          setModalContent({
            content: '택배 요청을 삭제할까요?',
            confirmText: '삭제',
            cancelText: '취소',
            onConfirm: async () => await handleDelete(),
            onCancel: () => setShowModal(false),
          });
        },
      },
      {
        label: '수정',
        callback: () => {
          //수정 페이지로 데이터 전달, 이동
          setBottomSheetToggle(false);
          const goodsEditUrl = `${pageUrlConfig.goodsPage}/edit/${id}`;
          navigate(goodsEditUrl, { state: product });
        },
      },
    ]);
  }, [author]);

  const handleDelete = async () => {
    const result = await deleteProduct(id);
    if (result) {
      setBottomSheetToggle(false);
      navigate(pageUrlConfig.goodsPage);
    }
  };

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

  const handleGoToChat = async () => {
    const content = JSON.stringify({
      title: `[${product.itemName}] ` + realProductAuthor + ' 님과의 채팅방',
      productAuthor: realProductAuthor,
      acceptUser: loginUser.username,
      postId: 'chat',
    });
    const uploadResult = await uploadPost({
      post: {
        content: content,
        image: '',
      },
    });
    if (uploadResult) {
      const detailResult = await fetchPost(uploadResult.id);
      const chatUrl = `${pageUrlConfig.chatPage}/${detailResult.id}/${detailResult.author.accountname}`;
      navigate(chatUrl);
    } else {
      console.log('실패');
    }
  };

  return (
    <PageTemplate>
      {showModal && (
        <Modal
          content={modalContent.content}
          confirmText={modalContent.confirmText}
          cancelText={modalContent.cancelText}
          onConfirm={modalContent.onConfirm}
          onCancel={modalContent.onCancel}
        ></Modal>
      )}
      {product && (
        <>
          <ProfileArea>
            {/* <ProfileImg src={product.author.image}></ProfileImg> */}
            <ProfileImg src={
                author.image === 'http://146.56.183.55:5050/Ellipse.png'
                  ? 'https://api.mandarin.weniv.co.kr/Ellipse.png'
                  : author.image
              }></ProfileImg>
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
              {user.accountname === realProductAuthor && link.state === '요청중' ? (
                <State color={'#3c58c1'} onClick={handleStateBtn}>
                  {link.state}
                </State>
              ) : user.accountname === realProductAuthor && link.state === '배달중' ? (
                <State color={'#4CAF50'} onClick={handleStateBtn}>
                  {link.state}
                </State>
              ) : user.accountname === realProductAuthor && link.state === '배달완료' ? (
                <State color={'#767676'} onClick={handleStateBtn}>
                  {link.state}
                </State>
              ) : user.accountname !== realProductAuthor && link.state === '요청중' ? (
                <State color={'#3c58c1'} onClick={handleGoToChat}>
                  배달수락
                </State>
              ) : user.accountname !== realProductAuthor && link.state === '배달중' ? (
                <State color={'#4CAF50'}>{link.state}</State>
              ) : (
                <State color={'#767676'}>{link.state}</State>
              )}
              {/* 작성자 검증 */}
              {user.accountname === realProductAuthor && isDropdownVisible && (
                <DropDown state={goodsState} onClick={handleDropDown}></DropDown>
              )}
            </StateWrap>
          </ProductTitleArea>
          <InfoArea>
            <Info>{link.itemInfo}</Info>
          </InfoArea>
          <MapWrap>
            <TrainMap stations={stationName} style={{ width: `90%`, height: `100%`, margin: `auto` }} />
          </MapWrap>
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
  object-fit: cover;
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
  object-fit: cover;
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

const MapWrap = styled.div`
  width: 100%;
  height: 200px;
`;

export default GoodsDetailPage;
