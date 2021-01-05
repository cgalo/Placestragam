import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import { 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE 
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlacesForm.css';

const NewPlaces:React.FC<{}> = (props) => {

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

    const placeSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);      // Send this to the backend
    }

    return (
        <form 
            className="place-form" 
            onSubmit={placeSubmitHandler}
        >
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
    );
}

export default NewPlaces;