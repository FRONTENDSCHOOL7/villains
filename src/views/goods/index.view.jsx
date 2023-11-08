import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import DefaultBtn, { BasicStyle } from '../../components/default/GlobalButton';
import NavMenu from '../../components/layout/NavMenu';
import SearchHeader from '../../components/layout/SearchHeader';
import BackHeader from '../../components/layout/BackHeader';
import userAtom from '../../atoms/userAtom';
import { useRecoilValue, useRecoilState } from 'recoil';
import realProductAuthorAtom from '../../atoms/realProductAuthorAtom';
import { headerBtnOptionsAtom, headerBtnStateAtom } from '../../atoms/headerBtnStateAtom';
import Tanghulu from '../../components/default/Tanghulu';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';
import BackArrow from '../../assets/img/icon-arrow-left.svg';
import { BlueSmallBtn } from '../../components/default/Buttons';
import UserListBox from '../../components/searchbar/UserListBox';
import queryAtom from '../../atoms/queryAtom';
import queryFocusAtom from '../../atoms/queryFocusAtom';
import { useQuery } from '@tanstack/react-query';
import searchUserQuery from '../../api/get/getSearchUser.api';

const GoodsIndexPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const realProductAuthor = useRecoilValue(realProductAuthorAtom);
  const headerBtnOptions = useRecoilValue(headerBtnOptionsAtom);
  const headerBtnState = useRecoilValue(headerBtnStateAtom);
  const [pageState, setPageState] = useState('');
  const location = useLocation();
  const id = useParams().id;

  const [query, setQuery] = useRecoilState(queryAtom);
  const [focus, setFocus] = useRecoilState(queryFocusAtom);
  // 유저 검색
  const [showUserList, setShowUserList] = useState(false);
  const [userList, setUserList] = useState([]);
  const { data: users, isLoading, isError } = useQuery(searchUserQuery(query, user));
  useEffect(() => {
    if (focus || users) {
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  }, [query, users, focus]);
  const handleSearchBack = () => {
    setQuery('');
  };

  useEffect(() => {
    const page = location.pathname.split('/')[3];
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
      return <SearchHeader onClick={handleSearchBack} placeholder={`유저를 검색해주세요`} />;
    }
  };

  const handleBackBtn = () => {
    navigate(pageUrlConfig.goodsPage);
  };

  return (
    <>
      {headerChange()}
      {showUserList && !isLoading && !isError && users ? (
        <UserListBox userList={users.data} showUserList={showUserList} />
      ) : (
        <Outlet />
      )}
      <NavMenu></NavMenu>
    </>
  );
};

const BackArrowBtn = styled.button`
  ${BasicStyle}
  margin-right: 8px;
`;

export default GoodsIndexPage;
