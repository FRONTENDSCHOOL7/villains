import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import SearchHeader from '../../components/layout/SearchHeader';
import pageUrlConfig from '../../config/pageUrlConfig';
import NavMenu from '../../components/layout/NavMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { useQuery } from '@tanstack/react-query';
import searchUserQuery from '../../api/get/getSearchUser.api';
import UserListBox from '../../components/searchbar/UserListBox';
import queryAtom from '../../atoms/queryAtom';
import queryFocusAtom from '../../atoms/queryFocusAtom';
// import SearchLayout from '../../components/layout/SearchLayout';

const FeedIndexPage = () => {
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

  const handleClickBack = () => {
    setQuery('');
  };

  return (
    <>
      {pathname === pageUrlConfig.feedPage && (
        <SearchHeader onClick={handleClickBack} placeholder={`유저를 검색해주세요`} />
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
