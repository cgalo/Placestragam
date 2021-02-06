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
import mongoose from 'mongoose';

// Models
import HttpError from '../models/http-error';
import PlaceModel from '../models/place';
import UserModel from '../models/user';

// Util function
import getCoordsForAddress from '../util/location';

// Interfaces
import type { Place, Location } from '../types/places-types';
import type { IPlaceSchema, IUserSchema } from '../types/schema-types';


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
        const message = "Fetching places failed, please try again later";
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

    let user:IUserSchema;                           // User that will 'own' this place
    try {
        user = await UserModel.findById(creator);   // Fetch user from the DB 
    } catch (err) {
        const message = "Creating place failed, please try again";
        const errorCode =  500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    if (!user){
        // If the user dooesn't exist in the DB, throw error
        const message = "Could not find user for the provided id";
        const errorCode = 404;
        const error =  new HttpError(message, errorCode);
        return next(error);
    }

    console.log(user);
    console.log(createdPlace);


    try {
        const session = await mongoose.startSession();      // Initiated new session
        session.startTransaction();
        await createdPlace.save({ session: session });      // Store the newly created place
        user.places.push(createdPlace.id);                  // Add the new place's ID to the user's places list
        await user.save({session: session});                // Save the changes to the user
        await session.commitTransaction();                  // Send all the transactions & end the session

    } catch(err){
        const message = "Could not insert place in DB";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next (error);
    }

    res.status(201).json({place: createdPlace});
}

async function updatePlace(req: Request, res:Response, next: Next) {
    const errors = validationResult(req);               // Check error validation from express-validation
    if (!errors.isEmpty()){
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        throw new HttpError(message, errorCode);
    }

    const { title, description } = req.body;            // We only allow to edit title & description
    const placeId = req.params.pId;

    let placeToUpdate: IPlaceSchema;                    // Place object that we'll fetch and then update values
    try {
        placeToUpdate = await PlaceModel.findById(placeId);     // Look for place with the given ID in the DB
    } catch (err){
        const message = "Something went wrong, could not update place.";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    if (!placeToUpdate){
        // If the place doesn't exist for some reason
        const message = "Could not find a place for the provided id.";
        const errorCode = 404;
        throw new HttpError(message, errorCode);
    }

    placeToUpdate.title = title;                        // Set the new title of the place
    placeToUpdate.description = description;            // Set the new description of the place

    // Now we update the place in the DB
    try {
        await placeToUpdate.save();                     // Save the changes to the place object in the DB
    } catch(esrr) {
        const message = "Something went wrong, could not update place";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    res.status(200).json({place: placeToUpdate.toObject({getters: true}) });
}

async function deletePlace(req: Request, res:Response, next: Next) {
    const placeId = req.params.pId;

    let placeToDelete: IPlaceSchema;                        // The place we are attempting to delete
    try {
        placeToDelete = await PlaceModel.findById(placeId); // Fetch the place from the DB w/ the given place ID
    } catch (err){
        const message = "Something went wrong, could not delete place";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    try {
        await placeToDelete.remove();                             // Delete place from DB
    } catch (err) {
        const message = "Something went wrong, could not delete place";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }
    

    res.status(200).json({message: "Deleted place"});
}

export {
    getPlaceById, 
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
};