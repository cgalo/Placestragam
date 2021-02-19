import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { Place } from '../../types/places-types';
import { useHttpClient } from '../../shared/hooks/http-hook';

const emptyPlaces:Array<Place> = [];
const UserPlaces:React.FC<{}> = (props) => {
    const [loadedPlaces, setLoadedPlaces] = useState(emptyPlaces);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId:string = useParams<any>().userId;     // Get the user id of the current user

    useEffect(() => {
        const fetchPlaces = async() => {
            try {
                const method = 'GET', url = `http://localhost:5000/api/places/user/${userId}`;
                console.log(url);
                const responseData = await sendRequest<Place>(url, method, null, {});
                const places = responseData.places;
                if (places){
                    setLoadedPlaces(places);
                }
            } 
            catch(err){
                // Eror is handled with ErrorModal & useHttpClient
            }
        }

        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletePlaceId: string):void => {
        // Filter the place that was just removed, the DB will already have the place deleted(in PlaceItem page)
        setLoadedPlaces(prevPlaces => 
            prevPlaces.filter(place => place.id !== deletePlaceId)
        ); 
    }
    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay={false} />
                </div>
            )}
            {!isLoading &&  
                <PlaceList 
                    items={loadedPlaces} 
                    onDeletePlace={placeDeleteHandler}
                />
            }
        </React.Fragment>
    );
}

export default UserPlaces;