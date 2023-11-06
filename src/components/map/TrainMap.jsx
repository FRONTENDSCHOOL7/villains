import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const TrainMap = ({center, style, places, level = 3}) => {
    return <Map center={center} style={style} level={level}>
        {places.map((place, index)=>{
            return (
                <MapMarker key={index} position={{ lat: place.y, lng: place.x }} />
            )
        })}
    </Map>
}

export default TrainMap;