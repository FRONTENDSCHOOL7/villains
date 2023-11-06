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
    //loader 함수 내에서도 콜백을 사용하기 때문에 데이터가 온전히 도착하는데 시간이 걸립니다. 이를 해결하기 위해 setTimeout을 사용했습니다.
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