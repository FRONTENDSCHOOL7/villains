import { useParams } from "react-router";
import React from "react";

import PageTemplate from "../../components/layout/PageTemplate";
import TrainMap from "../../components/map/TrainMap";

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