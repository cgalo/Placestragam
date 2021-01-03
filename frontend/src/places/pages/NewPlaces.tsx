import React from 'react';

import Input from '../../shared/components/FormElements/Input';
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
                validators={[]}
                errorText="Please enter a valid title."
                id="u1"
            />
        </form>
    );
}

export default NewPlaces;