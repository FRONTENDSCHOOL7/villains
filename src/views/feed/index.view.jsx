import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import searchUserQuery from '../../api/get/getSearchUser.api';
import userAtom from '../../atoms/userAtom';
import queryAtom from '../../atoms/queryAtom';
import queryFocusAtom from '../../atoms/queryFocusAtom';

import SearchHeader from '../../components/layout/SearchHeader';
import pageUrlConfig from '../../config/pageUrlConfig';
import NavMenu from '../../components/layout/NavMenu';
import UserListBox from '../../components/searchbar/UserListBox';
import BackHeader from '../../components/layout/BackHeader';

import { BasicStyle } from '../../components/default/GlobalButton';
import BackArrow from '../../assets/img/icon-arrow-left.svg';

const FeedIndexPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [query, setQuery] = useRecoilState(queryAtom);
  const [focus, setFocus] = useRecoilState(queryFocusAtom);

  // 유저 검색

  const [showUserList, setShowUserList] = useState(false);
  const [userList, setUserList] = useState([]);
  const user = useRecoilValue(userAtom);

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

  const handleClickBack = () => {
    const mainPath = pathname.split('/')[1];
    navigate(`/${mainPath}`);
  };

  return (
    <>
      {pathname === pageUrlConfig.feedPage ? (
        <SearchHeader onClick={handleSearchBack} placeholder={`유저를 검색해주세요`} />
      ) : (
        <BackHeader>
          <BackArrowBtn variant={'basic'} onClick={handleClickBack}>
            <img src={BackArrow} alt="뒤로가기" />
          </BackArrowBtn>
        </BackHeader>
      )}
      {showUserList && !isLoading && !isError && users ? (
        <UserListBox userList={users.data} showUserList={showUserList} />
      ) : (
        <Outlet />
      )}
      {pathname === pageUrlConfig.feedPage && <NavMenu />}
    </>
  );
};

export default FeedIndexPage;

const BackArrowBtn = styled.button`
  ${BasicStyle}
  margin-right: 8px;
`;
