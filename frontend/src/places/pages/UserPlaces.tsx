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
    const { isLoading, error, sendRequest, clearError  } = useHttpClient();
    const userId:string = useParams<any>().userId;     // Get the user id of the current user

    useEffect(() => {
        const fetchPlaces = async() => {
            try {
                const method = 'GET', url = `http://localhost:5000/api/places/user/${userId}`;
                console.log(url);
                const responseData = await sendRequest<Place>(url, method, null, {});
                const places:Array<Place> = responseData.places || [];
                setLoadedPlaces(places);
                console.log(responseData);
            } catch(err){
                console.log(error);
            }
        }

        fetchPlaces();
    }, [sendRequest, userId]);

    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading &&  <PlaceList items={loadedPlaces} />}
        </React.Fragment>
    );
}

export default UserPlaces;