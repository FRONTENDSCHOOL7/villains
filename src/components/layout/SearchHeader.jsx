import React, { useState } from 'react';
import SearchBar from '../searchbar/SearchBar.jsx';
import { useLocation, useNavigate } from 'react-router';
import queryAtom from '../../atoms/queryAtom.js';
import { useRecoilState, useRecoilValue } from 'recoil';
import pageUrlConfig from '../../config/pageUrlConfig.js';
import BackHeader from './BackHeader.jsx';
import queryFocusAtom from '../../atoms/queryFocusAtom.js';

const SearchHeader = ({onClick, placeholder}) => {
  const [query, setQuery] = useRecoilState(queryAtom);
  
  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <BackHeader onClick={onClick} focus={focus}>
      <SearchBar
            placeholder={placeholder}
            onChange={handleChangeQuery}
            value={query}
          />
    </BackHeader>
  );
};

export default SearchHeader;