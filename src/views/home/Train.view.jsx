import { useLoaderData, useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import PageTemplate from "../../components/layout/PageTemplate";
import TrainMap from "../../components/map/TrainMap";
import pageUrlConfig from "../../config/pageUrlConfig";

const HomeTrainPage = () => {
    const { stationname } = useParams();
    return(
        <PageTemplate>
            <TrainMap 
                stations={[stationname]}
                style={{width: `100%`, height: `100%`}}
            />
        </PageTemplate>
    )
}

export default HomeTrainPage;