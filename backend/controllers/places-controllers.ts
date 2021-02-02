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
import { validationResult } from 'express-validator';
import * as mongoose from 'mongoose';

// Models
import HttpError from '../models/http-error';
import PlaceModel from '../models/place';

// Util function
import getCoordsForAddress from '../util/location';

// Interfaces
import type { Place, Location } from '../types/places-types';
import type { IPlaceSchema } from '../types/schema-types';


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

async function getPlaceById (req: Request, res: Response, next: Next) {
    const placeId = req.params.pId;

    let place:IPlaceSchema;
    try {
        place = await PlaceModel.findById(placeId);     // Look for the place in the DB
    } catch (err) {
        const message = "Something went wrong, could not find a place.";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    if (!place){
        const message = "Could not find a place for the provided id.";
        const errorCode = 404;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    res.json({place: place.toObject( { getters: true }) });  // To add ID property to mongoose
}

    async function getPlacesByUserId (req: Request, res: Response, next: Next) {
    const userId = req.params.uId;
    
    let userPlaces: Array<IPlaceSchema>;

    try {
        userPlaces = await PlaceModel.find({creator: userId});      // Get all the places that match the creator value with the userID
        
    } catch(err){
        const message = "Fetching places failed, please tray again";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    if (!userPlaces || userPlaces.length === 0){
        const message = "Could not find a place for the provided user ID";
        const errorCode = 404;
        return next(new HttpError(message, errorCode));
    }

    res.status(200).json({
        places: userPlaces.map(place => place.toObject({getters: true}))    // To add attribute id and not _id
    });
}

async function createPlace(req: Request, res: Response, next: Next) {
    const errors = validationResult(req);           // Check error validation from express-validation
    
    if (!errors.isEmpty()){
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        return next(new HttpError(message, errorCode));
    }

    const { title, description, address, creator } = req.body;

    let coordinates:Location;
    try {
        coordinates = await getCoordsForAddress(address);    // Request location from address
    } catch(error){
        return next(error);
    }

    const createdPlace:IPlaceSchema = new PlaceModel({
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator,
        image: 
        "https://www.metro.us/wp-content/uploads/2020/02/wall-street-582921_1280.jpg"
    });

    try {
        await createdPlace.save();      // Save is a mongoose function that handles saving data to MongoDB
    } catch(err){
        const message = "Could not insert place in DB";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next (error);
    }

    res.status(201).json({place: createdPlace});
}

function updatePlace(req: Request, res:Response, next: Next) {
    const errors = validationResult(req);               // Check error validation from express-validation
    if (!errors.isEmpty()){
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        throw new HttpError(message, errorCode);
    }

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
    const foundPlace = DUMMY_PLACES.find(p => p.id === placeId);

    if (!foundPlace){
        const message = "Could not find place with given id";
        const errorCode = 404;
        throw new HttpError(message, errorCode);
    }
    
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