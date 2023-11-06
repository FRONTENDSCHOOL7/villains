import { useLoaderData, useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import PageTemplate from "../../components/PageTemplate";
import TrainMap from "../../components/map/TrainMap";
import pageUrlConfig from "../../config/pageUrlConfig";

const HomeTrainPage = () => {
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    });
    const searchResult = useLoaderData();
    setTimeout(()=>{
        setPosition({
            lat: searchResult[0].y,
            lng: searchResult[0].x
        })
    }, 1000)
    return(
        <PageTemplate>
            {position.lat === 0 ? 
                <div>loading...</div>
            : <TrainMap 
                center={position}
                style={{width: `100%`, height: `100%`}}
                places={[searchResult[0]]}
            /> }
        </PageTemplate>
    )
}

export default HomeTrainPage;