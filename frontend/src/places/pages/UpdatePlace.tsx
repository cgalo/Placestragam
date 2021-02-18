import React, { useEffect, useState } from 'react';
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
import type { Place } from '../../types/places-types';
import './PlacesForm.css';

interface ParamType {
    placeId: string;
    userId: string;
}

const UpdatePlace: React.FC<{}> = (props) => {
    const { placeId } = useParams<ParamType>();
    const [identifiedPlace, setIdentifiedPlace] = useState({} as Place);
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
                const place:Place = responseData.place || {} as Place;
                if (place){
                    setIdentifiedPlace(place);
                }
            }
            catch(err){}
        }

        fetchPlace();

        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: identifiedPlace.title
                }
            }, true);
        }
    }, [setFormData]);

    const updatePlace = async() => {
        try {
            // Variables/data needed to perform the request
            const method = 'PATCH', url = `http://localhost:5000/api/places/${placeId}`;
            const body = JSON.stringify({
                title: (formState.inputs.title.value === "") ? identifiedPlace.title : formState.inputs.title.value,
                description: formState.inputs.description.value
            });
            const header = {'Content-Type' : 'application/json'};
            
            // Now we can perform the PATCH request
            const responseData = await sendRequest<Place>(url, method, body, header);
            const updatedPlace:Place = responseData.place || {} as Place;
            
            // If we got the updated place object from the backend
            if (updatedPlace){
                history.push('/');
            }
        } catch{
            // Nothing to do here, the ErrorModal & useHttpClient hooks already handle the errors
        }
    }

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        updatePlace();
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (<div className="center">
                <LoadingSpinner asOverlay/>
            </div>)}

            {!isLoading && !identifiedPlace && (
                <div className="center">
                    <Card><h2>Could not find place!</h2></Card>
                </div>
            )}

            {!isLoading && identifiedPlace && (
                <form className="place-form" onSubmit={formSubmitHandler}>
                    <Input 
                        placeholder={identifiedPlace.title}
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        initValue={formState.inputs.title.value}
                        initValid={formState.inputs.title.isValid}
                    />
                    <Input 
                        placeholder="New description here..."
                        id="description"
                        element="textarea"
                        type="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (min. 5 length)."
                        onInput={inputHandler}
                        initValue={formState.inputs.description.value}
                        initValid={formState.inputs.description.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
}

export default UpdatePlace;