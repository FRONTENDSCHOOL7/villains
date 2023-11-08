import {  useNavigate } from 'react-router';
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import useGeoLocation from '../../hooks/useGeoLocation';

import {useRouteLoaderData} from 'react-router-dom';
import profileAtom from '../../atoms/profileAtom';
import userPostAtom from '../../atoms/userPostAtom';
import contactQuery from '../../api/get/getUserPost.api';
import getUserInfo from '../../api/get/getUserInfo.api';

import PageTemplate from '../../components/layout/PageTemplate';
import defaultImg from '../../assets/img/basic-profile.svg';
import theme from '../../style/theme';
import pageUrlConfig from '../../config/pageUrlConfig';

const HomePage = () => {
  const navigate = useNavigate();
  const user = useRouteLoaderData('user');
  const [profileInfo, setProfileInfo] = useRecoilState(profileAtom);
  const [posts, setPosts] = useRecoilState(userPostAtom);
  
  const { location } = useGeoLocation();
  //사용자 위치 정보를 찾을 수 없을 때의 기본값 = 서울 중심부 좌표
  const { latitude, longitude } = location ?? {latitude: 37.566535, longitude: 126.9779692};

  const { data, isError, isLoading, isFetching } = useQuery(
    contactQuery(user?.accountname, user?.token)
  );

  useEffect(()=>{
    if(user){
      getUserInfo(user.accountname, user.token)
      .then((response)=>{
        setProfileInfo(response.data.profile);
        
      }).catch((error)=>{
          console.error(error);
      })
    }
  }, [user])

  const handleErrorImg = (event) => {
    event.target.src = defaultImg;
  }

  useEffect(() => {
    if(!isLoading && data){
      data?.data.post.map((post, index)=>{
        if (post.content?.includes('postId')) setPosts(data.data.post);
      })
    }
  }, [isLoading, data]);

  //Todo: 지도 레벨이 일정 이상 커지면 커스텀 오버레이에 글씨 없애기 대신 사용자 프로필?
  const level = 3;
  const [showContents, setShowContents] = useState(true);
  const mapRef = useRef();

  const handleZoomLevel = (event) => {
    const currentLevel = event.getLevel();
    if(currentLevel >= 4) setShowContents(false);
    else setShowContents(true);
  }
  
  const handleClickContents = (event) => {
    const feedId = event.currentTarget.id;
    navigate(`${pageUrlConfig.feedPage}/${feedId}`);
  }
  return (
    <PageTemplate>
      <Map 
      center={{ lat: latitude, lng: longitude }} 
      style={{ width: '100%', height: '100%' }} 
      level={level} 
      ref={mapRef}
      onZoomChanged={handleZoomLevel}
      >
        {posts.map((post, index) => {
          const contents = JSON.parse(post.content);
          return (
            <CustomOverlayMap
              key={post.id}
              position={{ lat: contents?.latitude ?? 0, lng: contents?.longitude ?? 0 }}
              xAnchor={0.3}
              yAnchor={0.9}
            >
              <StyledMarkerWrap>
                {showContents ? 
                <StyledMarker id={post.id} onClick={handleClickContents}>{contents.contents}</StyledMarker>
                :
                <StyledMarkerImg src={profileInfo.image} alt={profileInfo.username} onError={handleErrorImg} />
                }
              </StyledMarkerWrap>
            </CustomOverlayMap>
          );
        })}
        <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
      </Map>
    </PageTemplate>
  );
};

const StyledMarkerWrap = styled.div`
  background-color: ${theme.color.white};
  border-radius: 9999px;
  filter: drop-shadow( 0 10px 5px ${theme.color.grey});
  position: relative;
  min-width: 3em;
  min-height: 3em;

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 -3.8em 0;
    margin: auto;
    border-top: 5px solid ${theme.color.white};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 1px solid transparent;
    width: 2.5px;
    height: 10px;
  }
`;

const StyledMarker = styled.div`
  padding: 0 1em;
  max-width: 120px;
  line-height: 3em;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
`;

const StyledMarkerImg = styled.img`
  border-radius: 50%;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
  aspect-ratio: 1/1;

  padding: 0.5em;
`;


export default HomePage;
