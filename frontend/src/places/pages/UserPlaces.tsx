import React from 'react';

import PlaceList from '../components/PlaceList';

import { Place } from '../components/types';

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

const UserPlaces:React.FC<{}> = (props) => {
    
    return (
        <PlaceList items={PLACES} />
    );
}

export default UserPlaces;