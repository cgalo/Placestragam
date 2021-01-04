import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './NewPlaces.css';
interface NewPlacesProps {

}

const NewPlaces:React.FC<NewPlacesProps> = (props) => {
    return (
        <form className="place-form">
            <Input 
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                id="u1"
            />
        </form>
    );
}

export default NewPlaces;