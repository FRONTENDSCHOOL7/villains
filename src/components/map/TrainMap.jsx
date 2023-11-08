import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


const TrainMap = ({stations, style, level = 3}) => {
    const [markers, setMarkers] = useState([])
    const [center, setCenter]= useState({lat: 0, lng: 0});
    const mapRef = useRef(null);
    const [map, setMap] = useState(mapRef);
   
    const bounds = useMemo(() => {
        const bounds = new kakao.maps.LatLngBounds();
        markers.map(marker => {
            bounds.extend(new kakao.maps.LatLng(marker.y, marker.x))
        });
        return bounds;
    }, [center, markers])
    useEffect(() => {
        if(!map) return;
        const ps = new kakao.maps.services.Places();
        stations.map((stationname)=>{
            ps.keywordSearch(`${stationname} 1호선`, (data, status) => {
                if(status === 'OK') {
                  setMarkers([...markers, {
                    y: data[0].y,
                    x: data[0].x,
                  }])
                }
            }, {
                category_group_code: 'SW8'
            })
        })
    }, [map])

    useEffect(()=>{
        if(markers.length === 0) return;
        const lng = markers.reduce((allMarker, currentMarker)=>allMarker += +currentMarker.x, 0)
        const lat = markers.reduce((allMarker, currentMarker)=>allMarker += +currentMarker.y, 0)
        setCenter((prev) => ({...prev, lat: lat / markers.length, lng: lng / markers.length}))
        map.setBounds(bounds);
    }, [markers])
    
    return  (
        <Map 
        center={center} 
        isPanto={true} 
        style={style} 
        level={level} 
        ref={setMap}>
        {markers.map((marker, index)=>{
            return <MapMarker key={index} position={{ lat: marker.y, lng: marker.x }} />
                })}
        </Map>
    )
}

export default TrainMap;