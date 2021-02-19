import React, { useRef, useEffect, useState } from  'react';
import { Loader } from "@googlemaps/js-api-loader"

import LoadingSpinner from '../../components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../hooks/http-hook';
import type { Coordinates } from '../../../types/places-types';
import './Map.css';

interface MapProp {
    coordinates: Coordinates;
    zoom: number;
    className?: String;
    style?: React.CSSProperties;
}
  
const Map:React.FC<MapProp> = (props) => {
    const mapRef = useRef<any>();
    const [isMarkerDone, setIsMarkerDone] = useState(false);
    const { sendRequest, error, isLoading } = useHttpClient();
    
    useEffect(() => {
        
        const fetchMapMarker = async() => {
            try {
                const method = 'GET', url="http://localhost:5000/api/keys/google";
                const response = await sendRequest(url, method, null, {});
                if (response.key){
                    const loader = new Loader({
                        apiKey: response.key,
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
                    setIsMarkerDone(true);
                }
            }
            catch (err){
                console.log(error);
            }
        }
        fetchMapMarker();
    }, [props.coordinates, props.zoom, sendRequest, error])


    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}

            {!isLoading && isMarkerDone && (
                <div 
                ref={mapRef}
                className={`map ${props.className}`} 
                style={props.style}
                >
                </div>
            )}
            
        </React.Fragment>
    );
}

export default Map;