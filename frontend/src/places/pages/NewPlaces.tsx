import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import { 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE 
} from '../../shared/util/validators';
import './NewPlaces.css';
interface NewPlacesProps {

}

const formReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
};

const NewPlaces:React.FC<NewPlacesProps> = (props) => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id: String | string, input: Boolean | boolean, isInputValid: Boolean | boolean) => {
        // Handle validity and values from form inputs
        dispatch({
            type: 'INPUT_CHANGE', 
            value: input, 
            isValid: isInputValid, 
            inputId: id
        });
    }, [dispatch]);

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