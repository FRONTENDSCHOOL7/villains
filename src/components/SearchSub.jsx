import React, { useState, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import goodsFocusStartAtom from '../atoms/goodsFocusStartAtom';
import goodsFocusEndAtom from '../atoms/goodsFocusEndAtom';
import goodsQueryStartAtom from '../atoms/goodsQueryStartAtom';
import goodsQueryEndAtom from '../atoms/goodsQueryEndAtom';
import getSubOneInfo from '../api/get/getSubOneInfo.api';
import subOneAtom from '../atoms/subOneAtom';
import { Input, Label } from '../components/Input.style';
import DropDown from './DropDown';
import IconSearch from '../assets/img/icon-search.svg';

const SearchSub = ({ which, labelText, placeholder }) => {
  const [subOneInfo, setSubOneInfo] = useRecoilState(subOneAtom);
  const [list, setList] = useState([]);
  const [query, setQuery] = useRecoilState(which === 'start' ? goodsQueryStartAtom : goodsQueryEndAtom);
  const [focus, setFocus] = useRecoilState(which === 'start' ? goodsFocusStartAtom : goodsFocusEndAtom);

  useMemo(()=>{
    //도시철도 1호선 지하철역 정보 불러오기
    getSubOneInfo().then((data)=>{
      const dataList = data.data.SearchInfoBySubwayNameService.row;
      const rowInfo = [...dataList].filter(elem => elem.LINE_NUM === "01호선");
      const newInfo = rowInfo.map((info, index)=>{
        return info = {Query: info.STATION_NM, Id: info.STATION_CD};
      })
      setSubOneInfo(newInfo);
      console.log(newInfo);
    });
  }, []);

  const dataList = subOneInfo;
  useEffect(()=>{
    if(query === "") setList([]);
    else{
        dataList.map((data, index)=>{
        if(data.Query.includes(query) && !list.find(elem => elem[0].includes(data.Query))){
          setList([...list, [data.Query, data.Id]]);
        }
      })}
  }, [query]);

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