import React, { useState } from 'react';
import SearchBar from '../searchbar/SearchBar.jsx';
import { useLocation, useNavigate } from 'react-router';
import queryAtom from '../../atoms/queryAtom.js';
import { useRecoilState, useRecoilValue } from 'recoil';
import pageUrlConfig from '../../config/pageUrlConfig.js';
import BackHeader from './BackHeader.jsx';
import queryFocusAtom from '../../atoms/queryFocusAtom.js';

const SearchHeader = ({onClick}) => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const focus = useRecoilValue(queryFocusAtom);
  

  //IsShowSearchBar는 첫 렌더 시에만 필요한 값이며, useState를 쓰면 안됩니다.
  //useState로 사용할 경우 상태가 변경되어 다시 렌더가 되면 또 값이 바뀌고 리렌더링 시키는 무한 렌더링 상태가 됩니다.
  let IsShowSearchBar = true;

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const { pathname } = useLocation();

  let placeholder;
  switch (pathname) {
    case `${pageUrlConfig.homePage}`:
      placeholder = `지하철역을 검색해주세요!`;
      break;
    case `${pageUrlConfig.feedPage}`:
      placeholder = `유저를 검색해주세요`;
      break;
    default:
      IsShowSearchBar = false;
  }

  return (
    <BackHeader onClick={onClick} focus={focus}>
        {IsShowSearchBar && (
          <SearchBar
            placeholder={placeholder}
            onChange={handleChangeQuery}
            value={query}
          />
        )}
    </BackHeader>
  );
};

export default SearchHeader;