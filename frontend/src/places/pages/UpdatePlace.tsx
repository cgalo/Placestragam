import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import BUtton from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { Place } from '../components/types';
import Button from '../../shared/components/FormElements/Button';

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
        <form>
            <Input 
                id="title"
                element="text"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={() => {}}
                // value={identifiedPlace.title}
                // valid={true}
            />

            <Input 
                id="description"
                element="textarea"
                type="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 length)."
                onInput={() => {}}
                // value={identifiedPlace.description}
                // valid={true}
            />
            <Button type="submit" disabled={true}>
                UPDATE PLACE
            </Button>
        </form>
    );
}

export default UpdatePlace;