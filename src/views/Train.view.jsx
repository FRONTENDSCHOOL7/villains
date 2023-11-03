import React, { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate";
import { useParams } from "react-router";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HomeTrainPage = () => {
    const { stationname } = useParams();
    const [position, setPosition] = useState({});
    useEffect(()=>{
        const place = new kakao.maps.services.Places();
        place.keywordSearch(`${stationname}역 1호선`, (result) =>{
            result ? setPosition({lat: result[0]?.y , lng: result[0]?.x}) : console.log(result);
            console.log(result);
        })
    }, [stationname])
    return(
        <PageTemplate>
            {position && 
                <Map center={position} style={{ width: '100%', height: '100%' }} level={3}>
                    <MapMarker position={{ lat: position.lat, lng: position.lng }}></MapMarker>
                </Map>
            }
        </PageTemplate>
    )
}

export default HomeTrainPage;