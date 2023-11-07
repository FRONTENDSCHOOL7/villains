import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


const TrainMap = ({stations, style, level = 3}) => {
    const [markers, setMarkers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [center, setCenter]= useState({lat: 0, lng: 0});
    const mapRef = useRef(null);
    const [map, setMap] = useState(mapRef);
   
    const bounds = useMemo(() => {
        const bounds = new kakao.maps.LatLngBounds();

        markers.map(marker => {
            bounds.extend(new kakao.maps.LatLng(marker.y, marker.x))
        });
        return bounds;
    }, [markers])

    useEffect(() => {
        if(!map) return;
        const ps = new kakao.maps.services.Places();
        const stationList = stations.map((stationname, index)=>{
            ps.keywordSearch(stationname, (data, status) => {
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
        setIsLoading(false);
    }, [map])

    useEffect(()=>{
        if(!isLoading){
            const lng = markers.reduce((allMarker, currentMarker)=>allMarker += +currentMarker.x, 0)
            const lat = markers.reduce((allMarker, currentMarker)=>allMarker += +currentMarker.y, 0)
            setCenter({lat: lat / markers.length, lng: lng / markers.length})
        }
    }, [isLoading])
    
    useEffect(()=>{
        if(center.lat != 0) map.current.setBounds(bounds);
    }, [isLoading])

    
    return  (
    <Map center={center} style={style} level={level} ref={map}>
        {markers.map((marker, index)=>{
            return <MapMarker key={index} position={{ lat: marker.y, lng: marker.x }} />
        })}
    </Map>
    )
}

export default TrainMap;