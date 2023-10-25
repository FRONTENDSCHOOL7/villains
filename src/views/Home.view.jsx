import React from "react";
import PageTemplate from "../components/PageTemplate";
import SearchBar from "../components/searchbar/searchbar";
import useGeoLocation from "../hooks/useGeoLocation";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HomePage = () => {
  const {location} = useGeoLocation();

  return(
    <PageTemplate>
      <SearchBar placeholder={"지하철역을 검색해주세요!"}/>
      <Map 
        center={{ lat: location.latitude, lng: location.longitude }}   
        style={{ width: '100%', height: '600px' }} 
        level={3}                                  
      >
        <MapMarker position={{lat: location.latitude, lng: location.longitude}}></MapMarker>
      </Map>
    </PageTemplate>
  )
}

export default HomePage;