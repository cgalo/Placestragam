import React from 'react';

import Card from '../../shared/components/UIElements/Card';

import './PlaceItem.css';
import { Coordinates } from './types';

interface PlaceItemProp {
    id: String;
    image: String;
    title: String;
    description: String;
    address: String;
    creatorId: String;
    coordinates: Coordinates;
}

const PlaceItem:React.FC<PlaceItemProp> = (props) => {
    return (
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={props.image.valueOf()} alt={props.title.valueOf()} />                
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    {/* Buttons to allow the user to interact with the 'Place' */}
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    );
}

export default PlaceItem;