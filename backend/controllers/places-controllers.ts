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

let DUMMY_PLACES:Array<Place> = [
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

function getPlaceById (req: Request, res: Response, next: Next) {
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

function getPlacesByUserId (req: Request, res: Response, next: Next) {
    const userId = req.params.uId;
    const userPlaces = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });
    
    if (!userPlaces || userPlaces.length === 0){
        const message = "Could not find a place for the provided user ID";
        const errorCode = 404;
        return next(new HttpError(message, errorCode));
    }

    res.status(200).json({userPlace: userPlaces});
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

function updatePlace(req: Request, res:Response, next: Next) {
    const { title, description } = req.body;            // We only allow to edit title & description
    const placeId = req.params.pId;

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    if (!updatedPlace){
        // If the place doesn't exist for some reason
        const message = "Could not find a place for the provided id.";
        const errorCode = 404;
        throw new HttpError(message, errorCode);
    }

    const placeIdx = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    res.status(200).json({place: updatedPlace});
}

function deletePlace(req: Request, res:Response, next: Next) {
    const placeId = req.params.pId;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: "Deleted place"});
    

}

export {
    getPlaceById, 
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
};