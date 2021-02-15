import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import './PlaceList.css';
import type { Place } from '../../types/places-types';

interface PlaceListProp {
    items: Array<Place>;
}

const PlaceList:React.FC<PlaceListProp> = (props) => {
    if (props.items.length === 0) {
        return (
        <div className="place-list center">
            <Card>
                <h2>No places found. Perhaps create one?</h2>
                <Button to={'/places/new'}>Share Place</Button>
            </Card>
        </div>
        );
    }

    // We get here if the user has at least one place
    return (
        <ul className="place-list">
            {props.items.map(place => (
                <PlaceItem 
                    key={place.id} 
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
}

export default PlaceList;