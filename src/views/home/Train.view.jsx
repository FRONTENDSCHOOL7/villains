import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import PageTemplate from "../../components/PageTemplate";
import TrainMap from "../../components/map/TrainMap";

const HomeTrainPage = () => {
    const { stationname } = useParams();
    const [position, setPosition] = useState([]);
    useEffect(()=>{
        const place = new kakao.maps.services.Places();
        place.keywordSearch(`${stationname}역 1호선`, (result) =>{
            position.push({lat: result[0]?.y , lng: result[0]?.x});
        })
    }, [stationname])
    return(
        <PageTemplate>
            {position && 
                <TrainMap center={position} style={{width: `100%`, height: `100%`}} places={position} />
            }
        </PageTemplate>
    )
}

export default HomeTrainPage;