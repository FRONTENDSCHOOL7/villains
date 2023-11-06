import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import SearchHeader from "../../components/layout/SearchHeader";
import pageUrlConfig from "../../config/pageUrlConfig";
import NavMenu from "../../components/layout/NavMenu";
import ListBox from "../../components/searchbar/ListBox";
import { useRecoilState, useRecoilValue } from "recoil";
import subOneAtom from "../../atoms/subOneAtom";
import useSearchData from "../../hooks/useSearchData";
import queryAtom from "../../atoms/queryAtom";
import getSubOneInfo from "../../api/get/getSubOneInfo.api";
import queryFocusAtom from "../../atoms/queryFocusAtom";

const HomeIndexPage = ( ) => {
  const navigate = useNavigate();
  const [showListBox, setShowListBox] = useState(false);
  const [isClickInfo, setIsClickInfo] = useState(false);
  const [subOneInfo, setSubOneInfo] = useRecoilState(subOneAtom);
  const [query, setQuery] = useRecoilState(queryAtom);
  const focus = useRecoilValue(queryFocusAtom);
  
  useMemo(() => {
    //도시철도 1호선 지하철역 정보 불러오기
    getSubOneInfo().then((data) => {
      const dataList = data.data.SearchInfoBySubwayNameService.row;
      const rowInfo = [...dataList].filter((elem) => elem.LINE_NUM === '01호선');
      const newInfo = rowInfo.map((info, index) => {
        return (info = { Query: info.STATION_NM, Id: info.STATION_CD });
      });
      setSubOneInfo(newInfo);
    });
  }, []);

  useEffect(() => {
    if (isClickInfo) {
      setIsClickInfo(false);
    }
  }, [isClickInfo]);

  const list = useSearchData(query, subOneInfo);

  const handleClickBack = () => {
      setQuery('');
  }
  const handleClickStation = (event) => {
    navigate(`${pageUrlConfig.homePage}/${event.target.id}`, {state: event.target.textContent});
    setQuery('');
  }
  return <>
  <SearchHeader onClick={handleClickBack} placeholder={`지하철역을 검색해주세요`}/>
  {query ? <ListBox list={list} onClick={handleClickStation}/> : <Outlet />}
  <NavMenu/>
  </>
}

export default HomeIndexPage;