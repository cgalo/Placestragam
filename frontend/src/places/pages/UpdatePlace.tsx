import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

// Hooks, utilities, interfaces and styling
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { 
    VALIDATOR_REQUIRE, 
    VALIDATOR_MINLENGTH 
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import type { Place } from '../../types/places-types';
import './PlacesForm.css';

interface ParamType {
    placeId: string;
}

const UpdatePlace: React.FC<{}> = (props) => {
    const auth = useContext(AuthContext);
    const { placeId } = useParams<ParamType>();
    const [loadedPlace, setLoadedPlace] = useState({} as Place);
    const [isPlaceLoaded, setIsPlaceLoaded] = useState(false);      // Keep track if we finished fetching the place
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();                   // Will assist in redirecting the user

    const [formState, inputHandler, setFormData] = useForm ({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlace = async() => {
            // Get the place object/data from the backend and set it as the 'identifiedPlace'
            try {
                const method = 'GET', url = `http://localhost:5000/api/places/${placeId}`;
                const responseData = await sendRequest(url, method, null, {});
                const place = responseData.place;
                if (place){
                    setLoadedPlace(place);
                    setIsPlaceLoaded(true);
                    setFormData({
                        title: {
                            value: place.title,
                            isValid: true
                        },
                        description: {
                            value: place.description,
                            isValid: true
                        }
                    }, true);
                }
            }
            catch(err){}
        }
        fetchPlace();   // Get the place data from the backend and set the form values
    }, [sendRequest, placeId, setFormData]);

    const updatePlace = async() => {
        try {
            // Variables/data needed to perform the request
            const method = 'PATCH', url = `http://localhost:5000/api/places/${placeId}`;
            const body = JSON.stringify({
                title:  formState.inputs.title.value,
                description: formState.inputs.description.value
            });
            const header = {'Content-Type' : 'application/json'};
            
            // Now we can perform the PATCH request
            const responseData = await sendRequest<Place>(url, method, body, header);
            const updatedPlace = responseData.place;
            
            // If we got the updated place object from the backend
            if (updatedPlace){
                history.push('/' + auth.userId + '/places');
            }
        } catch (err) {
            // Nothing to do here, the ErrorModal & useHttpClient hooks already handle the errors
        }
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        updatePlace();          // Send the changes of the 'place' to the backend
    };

    const isThereAChange = ():boolean => {
        // Check if the 'place' from the backend has different title/description compared to the one in the form
        if (loadedPlace.title === formState.inputs.title.value 
            && loadedPlace.description === formState.inputs.description.value ){
                // If the title & description of the 'place' have not been changed in the form
                return false;
            }
        else {
            // The form has at least one value different than the loadedPlace's title/description
            return true;
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>

            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay={false} />
                </div>
            )}

            {!isLoading && !error && !isPlaceLoaded && (
                <div className="center">
                    <Card>
                        <h2>Could not find place!</h2>
                    </Card>
                </div>
            )}

            {!isLoading && !error && isPlaceLoaded && (
                <form className="place-form" onSubmit={formSubmitHandler}>
                    <Input 
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        initValue={loadedPlace.title}
                        initValid={true}
                    />
                    <Input 
                        id="description"
                        element="textarea"
                        type="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (min. 5 length)."
                        onInput={inputHandler}
                        initValue={loadedPlace.description}
                        initValid={true}
                    />
                    <Button type="submit" disabled={!isThereAChange()}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
}

export default UpdatePlace;