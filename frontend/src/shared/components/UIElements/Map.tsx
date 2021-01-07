import React, { useRef, useEffect } from  'react';
import { Loader } from "@googlemaps/js-api-loader"

import './Map.css';
import { Coordinates } from '../../../places/components/types';

interface MapProp {
    coordinates: Coordinates;
    zoom: number;
    className?: String;
    style?: React.CSSProperties;
}
  
const Map:React.FC<MapProp> = (props) => {
    const mapRef = useRef<any>();
    
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY || "",
            version: "weekly"
        });
        const myCenter = { lat : props.coordinates.latitude, lng : props.coordinates.longitude }
        
        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: myCenter,
                zoom: props.zoom
            });

            new window.google.maps.Marker({position: myCenter, map: map})
        });
    }, [props.coordinates, props.zoom])

    return (
        <div 
            ref={mapRef}
            className={`map ${props.className}`} 
            style={props.style}
        >
        </div>
    );
}

export default Map;