import {  useNavigate, useParams } from 'react-router';
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import useGeoLocation from '../../hooks/useGeoLocation';
import contactQuery from '../../api/get/getUserPost.api';
import getSubOneInfo from '../../api/get/getSubOneInfo.api';
import subOneAtom from '../../atoms/subOneAtom';
import userAtom from '../../atoms/userAtom';

import PageTemplate from '../../components/PageTemplate';
import userPostAtom from '../../atoms/userPostAtom';

const HomePage = () => {
  const {id} = useParams();
  
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  

  const { location } = useGeoLocation();
  //사용자 위치 정보를 찾을 수 없을 때의 기본값이 필요합니다.
  const { latitude, longitude } = location ?? { latitude: 33, longitude: 130 };

  //로컬 스토리지의 사용자를 관리자로 해놓았습니다. 이 부분 나중에 교체 필요!!
  const { data, isError, isLoading, isFetching } = useQuery(
    contactQuery(user?.accountname, user?.token)
    );
  
  const [posts, setPosts] = useRecoilState(userPostAtom);

  useEffect(() => {
    if (data) setPosts(data.data.post);
  }, [!isLoading && data]);

  return (
    <PageTemplate>
      <Map center={{ lat: latitude, lng: longitude }} style={{ width: '100%', height: '100%' }} level={3}>
        {posts.map((post, index) => {
          return (
            <CustomOverlayMap
              key={post.id}
              position={{ lat: post?.latitude ?? 0, lng: post?.longitude ?? 0 }}
            >
              <StyledMarker>{post.content}</StyledMarker>
            </CustomOverlayMap>
          );
        })}
        <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
      </Map>
    </PageTemplate>
  );
};

const StyledMarker = styled.div`
  background-color: white;
  border-radius: 9999px;
  padding: 0.5em 1em;
  box-shadow: 0 10px 20px -5px #555;
  position: relative;

  &::after {
    content: '';
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

export { contactQuery };

export default HomePage;
