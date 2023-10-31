import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import goodsFocusStartAtom from '../atoms/goodsFocusStartAtom';
import goodsFocusEndAtom from '../atoms/goodsFocusEndAtom';
import goodsQueryStartAtom from '../atoms/goodsQueryStartAtom';
import goodsQueryEndAtom from '../atoms/goodsQueryEndAtom';
import getSubOneInfo from '../api/getSubOneInfo';
import subOneAtom from '../atoms/subOneAtom';
import { Input, Label } from '../components/Input.style';
import DropDown from './DropDown';
import IconSearch from '../assets/img/icon-search.svg';

const SearchSub = ({ which, labelText, placeholder }) => {
  const [subOneInfo, setSubOneInfo] = useRecoilState(subOneAtom);
  const [list, setList] = useState([]);
  const [query, setQuery] = useRecoilState(which === 'start' ? goodsQueryStartAtom : goodsQueryEndAtom);
  const [focus, setFocus] = useRecoilState(which === 'start' ? goodsFocusStartAtom : goodsFocusEndAtom);

  useEffect(() => {
    //도시철도 1호선 지하철역 정보 불러오기
    getSubOneInfo().then((data) => {
      const dataList = data.data.body;
      setSubOneInfo([...dataList].filter((elem) => elem.routNm === '1호선'));
    });
  }, []);

  const allList = subOneInfo;
  useEffect(() => {
    allList.map((data, index) => {
      if (data.stinNm.includes(query) && !list.find((elem) => elem[0].includes(data.stinNm))) {
        setList([...list, [data.stinNm, data.stinCd.padStart(4, '0')]]);
        console.log(list);
      }
    });
    if (query === '') setList([]);
    console.log(query);
  }, [query, focus]);

  useEffect(() => {
    if (focus === false) setList([]);
  }, [focus]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // const handleBlur = () => {
  //   setFocus(false);
  // };

  const handleFocus = () => {
    setFocus(true);
  };

  useEffect(() => {
    if (focus === false) setList([]);
  }, [focus]);

  return (
    <StyledForm>
      <Label htmlFor="input">{labelText}</Label>
      <InputField
        id="input"
        placeholder={placeholder}
        onChange={handleQueryChange}
        onFocus={handleFocus}
        // onBlur={handleBlur}
        value={query}
      />
      <DropDown list={list} setQuery={setQuery} setFocus={setFocus} />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;
const InputField = styled(Input)`
  background-image: url(${IconSearch});
  background-repeat: no-repeat;
  background-position: 98% 50%;
`;

export default SearchSub;
