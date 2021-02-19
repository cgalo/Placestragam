import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE 
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlacesForm.css';

const NewPlace:React.FC<{}> = (props) => {
    const authContext = useContext(AuthContext);    // Listener to context
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] =  useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

    const history = useHistory();       // Will assist in redirecting the user

    const placeSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const method = 'POST', url = 'http://localhost:5000/api/places';
            const body = JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: authContext.userId
            });
            const header = {'Content-Type' : 'application/json'};

            const responseData = await sendRequest(url, method, body, header);
            console.log(responseData);
            // Now we redirect the user to a different page -> New place page
            history.push('/');      // Redirects to the home page
        }
        catch (err){
            console.log(error);
        }
        console.log(formState.inputs);      // Send this to the backend
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form 
                className="place-form" 
                onSubmit={placeSubmitHandler}
            >

                {isLoading && <LoadingSpinner asOverlay/>}
                <Input 
                    id="title"
                    element="input" 
                    type="text" 
                    label="Title" 
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input 
                    id="description"
                    element="textarea" 
                    type="textarea" 
                    label="Description" 
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please entered a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input 
                    id="address"
                    element="input" 
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
}

export default NewPlace;