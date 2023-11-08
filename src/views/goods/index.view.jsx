import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import DefaultBtn, { BasicStyle } from '../../components/default/GlobalButton';
import NavMenu from '../../components/layout/NavMenu';
import SearchHeader from '../../components/layout/SearchHeader';
import BackHeader from '../../components/layout/BackHeader';
import userAtom from '../../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import realProductAuthorAtom from '../../atoms/realProductAuthorAtom';
import { headerBtnOptionsAtom, headerBtnStateAtom } from '../../atoms/headerBtnStateAtom';
import Tanghulu from '../../components/default/Tanghulu';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';
import BackArrow from '../../assets/img/icon-arrow-left.svg';
import { BlueSmallBtn } from '../../components/default/Buttons';

const GoodsIndexPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const realProductAuthor = useRecoilValue(realProductAuthorAtom);
  const headerBtnOptions = useRecoilValue(headerBtnOptionsAtom);
  const headerBtnState = useRecoilValue(headerBtnStateAtom);
  const [pageState, setPageState] = useState('');
  const location = useLocation();
  const id = useParams().id;

  useEffect(() => {
    const page = location.pathname.split('/')[2];
    setPageState(page);
  }, [location]);

  const headerChange = () => {
    // 택배 상세 -> 내 게시글
    if (id && pageState === id) {
      return (
        <BackHeader>
          <BackArrowBtn variant={'basic'} onClick={handleBackBtn}>
            <img src={BackArrow} alt="뒤로가기" />
          </BackArrowBtn>
          {user.accountname === realProductAuthor && <Tanghulu></Tanghulu>}
        </BackHeader>
      );
      // 택배 수정 or 작성
    } else if (pageState === 'edit' || pageState === 'write') {
      return (
        <BackHeader>
          <BackArrowBtn variant={'basic'} onClick={handleBackBtn}>
            <img src={BackArrow} alt="뒤로가기" />
          </BackArrowBtn>
          <BlueSmallBtn disabled={headerBtnState} onClick={headerBtnOptions.callback}>
            {headerBtnOptions.label}
          </BlueSmallBtn>
        </BackHeader>
      );
      // 택배 리스트
    } else {
      return <SearchHeader></SearchHeader>;
    }
  };

  const handleBackBtn = () => {
    navigate(pageUrlConfig.goodsPage);
  };

  return (
    <>
      {headerChange()}
      <Outlet />
      <NavMenu></NavMenu>
    </>
  );
};

const BackArrowBtn = styled.button`
  ${BasicStyle}
  margin-right: 8px;
`;
const BtnWrap = styled.div`
  min-width: 100px;
`;

export default GoodsIndexPage;
