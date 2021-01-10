/**
 * Controller to handle the middleware functions that are reached for
 * 'places' routes.
**/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { v4 as uuidv4 } from 'uuid';

import HttpError from '../models/http-error';
import type { Place } from '../types/places-types';

const DUMMY_PLACES:Array<Place> = [
    // We'll be replaced when we link a DB
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the tallest buildings in NYC',
        location: {
            latitude: 40.74844,
            longitude: -73.98715
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Coca Cola Rotulo',
        description: 'Rotulo de Coca-Cola en la montaña Merendon',
        location: {
            latitude: 15.5083608,
            longitude: -88.0608642
        },
        address: '21104, Honduras',
        creator: 'u1'
    }
];

function getPlacesById (req: Request, res: Response, next: Next) {
    const placeId = req.params.pId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place){
        const message = "Could not find a place for the provided id.";
        const errorCode = 404;
        throw new HttpError(message, errorCode);
    }

    console.log('GET request in Places');
    res.json({place: place});
}

function getPlaceByUserId (req: Request, res: Response, next: Next) {
    const userId = req.params.uId;
    const userPlace = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    
    if (!userPlace){
        const message = "Could not find a place for the provided user ID";
        const errorCode = 404;
        return next(new HttpError(message, errorCode));
    }

    console.log('inside places/user/');
    res.json({userPlace: userPlace});
}

function createPlace(req: Request, res: Response, next: Next) {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace:Place = {
        id: uuidv4(),
        description: description,
        title: title,
        location: coordinates,
        address: address,
        creator: creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
}

export {
    getPlacesById, 
    getPlaceByUserId,
    createPlace
};