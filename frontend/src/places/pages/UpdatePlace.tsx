import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { Place } from '../components/types';
import './PlacesForm.css';

interface ParamType {
    placeId: string;
}
const PLACES:Array<Place> = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famouse sky scrapers in the world!',
        imageUrl:
        'http://www.interestingamerica.com/images/NY_images/Manhattan/Empire_State_Building/ESB_Exterior_Sunset_Gary718_412_426.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1',
        location: {
            latitude: 40.7484,
            longitude: -73.9857            
        }
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famouse sky scrapers in the world!',
        imageUrl:
        'http://www.interestingamerica.com/images/NY_images/Manhattan/Empire_State_Building/ESB_Exterior_Sunset_Gary718_412_426.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u2',
        location: {
            latitude: 40.7484,
            longitude: -73.9857            
        }
    }
];

const UpdatePlace: React.FC<{}> = (props) => {
    const { placeId } = useParams<ParamType>();

    const identifiedPlace = PLACES.find(place => place.id === placeId);

    const [formState, inputHandler] = useForm ({
        title: {
            value: identifiedPlace?.title,
            isValid: true
        },
        description: {
            value: identifiedPlace?.description,
            isValid: true
        }
    }, true);

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace){
        return (
            <div className="center">
                <h2>
                    Could not find a place!
                </h2>
            </div>
        );
    }
    return (
        <form className="place-form" onSubmit={formSubmitHandler}>
            <Input 
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
    );
}

export default UpdatePlace;