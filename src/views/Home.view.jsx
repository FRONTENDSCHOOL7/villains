import React from "react";
import PageTemplate from "../components/PageTemplate";
import SearchBar from "../components/searchbar/searchbar";
import { useQuery } from '@tanstack/react-query';
import { maps } from "../config/api.config";
import { useEffect } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import { useState } from "react";

const HomePage = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_MAP_KEY}&autoload=false`;
        document.head.appendChild(script);
    
        script.addEventListener("load", () => {
            const {location} = useGeoLocation();
            console.log(location);
            window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(location.latitude, location.longitude), // 초기 중심 좌표 (위도, 경도)
              level: 3, // 지도 확대 레벨
            };
            new window.kakao.maps.Map(container, options);
          });
        });
      }, []);

    return(
        <PageTemplate>
            <SearchBar placeholder={"지하철역을 검색해주세요!"}/>
            <div id="map">

            </div>
        </PageTemplate>
    )
}

export default HomePage;