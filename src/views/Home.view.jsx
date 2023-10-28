import React, {useState, useEffect}  from "react";
import styled from 'styled-components';
import PageTemplate from "../components/PageTemplate";
import useGeoLocation from "../hooks/useGeoLocation";
import { Map, MapMarker, CustomOverlayMap  } from "react-kakao-maps-sdk";
import { useQuery } from '@tanstack/react-query'
import contactQuery from "../api/getUserPost.api";
import { useRecoilState, useRecoilValue } from "recoil";
import queryAtom from "../atoms/queryAtom";
import ListBox from "../components/searchbar/ListBox";
import subOneAtom from "../atoms/subOneAtom";
import getSubOneInfo from "../api/getSubOneInfo";
import queryFocusAtom from "../atoms/queryFocusAtom";

const HomePage = () => {
  const [subOneInfo, setSubOneInfo] = useRecoilState(subOneAtom);
  const [list, setList] = useState([]);
  
  //전역에 저장한 검색어 꺼내오기
  const query = useRecoilValue(queryAtom);
  const focus = useRecoilValue(queryFocusAtom);

  useEffect(()=>{
    //도시철도 1호선 지하철역 정보 불러오기
    getSubOneInfo().then((data)=>{
      const dataList = data.data.body;
      setSubOneInfo([...dataList].filter(elem => elem.routNm === "1호선"));
    });
  }, []);
  
  const allList = subOneInfo;
  useEffect(()=>{
    allList.map((data, index)=>{
      if(data.stinNm.includes(query) && !list.find(elem => elem[0].includes(data.stinNm))){
        setList([...list, [data.stinNm, data.stinCd.padStart(4, '0')]]);
      }
    })
    if(query === "") setList([]);
  }, [query, focus])

  useEffect(()=>{
    if(focus === false) setList([]);
  },[focus])
  
  const { location } = useGeoLocation();
  //사용자 위치 정보를 찾을 수 없을 때의 기본값이 필요합니다.
  const { latitude, longitude } = location ?? {latitude:33, longitude: 130};
  
  //로컬 스토리지의 사용자를 관리자로 해놓았습니다. 이 부분 나중에 교체 필요!!
  const user = JSON.parse(localStorage.getItem('admin'));
  const {data, isError, isLoading, isFetching} = useQuery(contactQuery(user));
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    if(data)  setPosts(data.data.post);
  }, [!isLoading && data]);

  return(
    <PageTemplate>
        {focus ?
        <ListBox list={list} />
        : (
          <Map 
            center={{ lat: latitude, lng: longitude }}   
            style={{ width: '100%', height: '100%' }} 
            level={3}                                  
          >
          {posts.map((post, index) => {
              // const content = JSON.parse(post.content.split("'").join('"'));
              // 계정마다 쓰인 content가 달라서 위의 경우는 문제가 생깁니다.
              return (
                <CustomOverlayMap key={post.id} position={{ lat:post?.latitude ?? latitude+index+5, lng: post?.longitude ?? longitude+index+5}}>
                  <StyledMarker>{post.content}</StyledMarker>
                </CustomOverlayMap>
              )
          })}
          <MapMarker position={{lat: latitude, lng: longitude}}></MapMarker>
          </Map>
        )
        
      }
    </PageTemplate>
  )
}

const StyledMarker = styled.div`
  background-color: white;
  border-radius: 9999px;
  padding: 0.5em 1em;
  box-shadow: 0 10px 20px -5px #555;
  position: relative;

  &::after{
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    margin-top: 2em;
    border-top: 5px solid white;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 1px solid transparent;
    width: 2.5px;
    height: 10px;
  }
`;

export {contactQuery};

export default HomePage;