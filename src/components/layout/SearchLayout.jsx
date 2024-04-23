import SearchHeader from './SearchHeader';
import ListBox from '../card/ListBox';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import subOneAtom from '../../atoms/subOneAtom';
import queryFocusAtom from '../../atoms/queryFocusAtom';
import queryAtom from '../../atoms/queryAtom';
import pageUrlConfig from '../../config/pageUrlConfig';
import { useQuery } from '@tanstack/react-query';
import userAtom from '../../atoms/userAtom';
import UserListBox from '../card/UserListBox';
import searchUserQuery from '../../api/get/getSearchUser.api';

const SearchLayout = ({ children }) => {
  const [list, setList] = useState([]);
  const [isClickInfo, setIsClickInfo] = useState(false);
  const [params, setParams] = useState('');
  const [showListBox, setShowListBox] = useState(false);
  //전역에 저장한 검색어 꺼내오기
  const [query, setQuery] = useRecoilState(queryAtom);
  const [focus, setFocus] = useRecoilState(queryFocusAtom);

  const { pathname } = useLocation();

  const isHomePage = pathname.includes(pageUrlConfig.homePage);
  const isFeedPage = pathname.includes(pageUrlConfig.feedPage);

  let dataList;
  //[ {Query: 검색대상, Id: 기타정보} ]
  if (isHomePage) {
    const stationList = useRecoilValue(subOneAtom);
    dataList = stationList;
  }

  useEffect(() => {
    if (dataList) {
      if (query === '') setList([]);
      else {
        dataList.map((data, index) => {
          if (data.Query.includes(query) && !list.find((elem) => elem[0].includes(data.Query))) {
            setList([...list, [data.Query, data.Id]]);
          }
        });
      }
    }
  }, [query]);

  useEffect(() => {
    if (focus) {
      if (isHomePage) setShowListBox(true);
      else if (isFeedPage) setShowUserList(true);
    }
  }, [focus]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isClickInfo) {
      navigate(`${pageUrlConfig.homePage}/${params}`);
      setShowListBox(false);
      setIsClickInfo(false);
    }
  }, [isClickInfo]);

  const handleClickInfo = (event) => {
    setQuery(event.currentTarget.textContent);
    setParams(event.currentTarget.dataset.etc);
    setIsClickInfo(true);
  };

  const handleClickWrite = () => {
    if (pathname.includes(pageUrlConfig.goodsPage)) {
      navigate(pageUrlConfig.goodsWritePage);
    }
    navigate(pageUrlConfig.feedWritePage);
  };

  const handleClickBack = () => {
    const mainPath = pathname.split('/')[1];
    navigate(`/${mainPath}`);
  };

  // 유저 검색

  const [showUserList, setShowUserList] = useState(false);
  const [userList, setUserList] = useState([]);
  const user = useRecoilValue(userAtom);

  const { data: users, isLoading, isError } = useQuery(searchUserQuery(query, isFeedPage, user));

  useEffect(() => {
    if (isFeedPage && users) {
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  }, [query, users]);

  return (
    <>
      <SearchHeader onClick={handleClickBack} />
      {showListBox && <ListBox list={list} onClick={handleClickInfo} />}
      {showUserList && !isLoading && !isError && users && (
        <UserListBox userList={users.data} showUserList={showUserList} />
      )}
    </>
  );
};

export default SearchLayout;
