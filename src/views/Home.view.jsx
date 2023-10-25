import React from "react";
import styled from 'styled-components';
import PageTemplate from "../components/PageTemplate";
import SearchBar from "../components/searchbar/searchbar";
import useGeoLocation from "../hooks/useGeoLocation";
import { Map, MapMarker, CustomOverlayMap  } from "react-kakao-maps-sdk";
import { useQuery } from '@tanstack/react-query'
import contactQuery from "../api/getUserPost";

const HomePage = () => {
  const { location } = useGeoLocation();
  //사용자 위치 정보를 찾을 수 없을 때의 기본값이 필요합니다.
  const { latitude, longitude } = location ?? {latitude:33, longitude: 130};
  
  //로컬 스토리지의 사용자를 관리자로 해놓았습니다. 이 부분 나중에 교체 필요!!
  const user = JSON.parse(localStorage.getItem('admin'));
  const {data, isError, isLoading} = useQuery(contactQuery(user));

  const myPostList = data.data.post;

  return(
    <PageTemplate>
      <SearchBar placeholder={"지하철역을 검색해주세요!"}/>
      <Map 
        center={{ lat: latitude, lng: longitude }}   
        style={{ width: '100%', height: '600px' }} 
        level={3}                                  
      >
       
      {myPostList.map((post, index) => {
          const content = JSON.parse(post.content.split("'").join('"'));
          return (
            <CustomOverlayMap key={index} position={{ lat:content.latitude, lng: content.longitude }}>
              <StyledMarker>{content.content}</StyledMarker>
            </CustomOverlayMap>
          )
      })}
      <MapMarker position={{lat: latitude, lng: longitude}}></MapMarker>
      </Map>
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