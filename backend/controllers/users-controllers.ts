/**
 * Controller to handle the middleware functions that are reached for
 * 'users' routes.
*/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';
import UserModel from '../models/user';
import type { IUserSchema } from '../types/schema-types';


async function getUsers(req: Request, res: Response, next: Next) {
    /**
     *  Function looks up for all users in the DB and returns only the ones that are public
     */
    
    let publicUsers: Array<IUserSchema>;
    try {
        // Fetch & save all public users with all their attributes except their passwords
        publicUsers = await UserModel.find({isPublic: true}, '-password'); 
    }catch(err){
        const message = "Failed fetching users, please try again later";
        const errorCode = 500;
        const error =  new HttpError(message, errorCode);
        return next(error);
    }
    
    res.status(200).json({users: publicUsers.map(user => user.toObject({getters: true}) )});
}

async function createUser(req: Request, res: Response, next: Next) {
    const errors = validationResult(req);           // Check error validation from express-validation
    if (!errors.isEmpty()){
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    const { 
        first_name, 
        last_name, 
        isPublic, 
        image, 
        email, 
        password,
    } = req.body;

    let existingUser;               // Will use this to check if the user/email already exists in the DB
    try {
        existingUser = await UserModel.findOne({email: email});     // Lookup email in the DB
    } catch{
        const message = "Creating user failed, please try again later.";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    if (existingUser) {
        // If user exists already
        const message = "User exists already, please login instead.";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    // Create the new user object
    const createdUser:IUserSchema = new UserModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        image: image,
        isPublic: isPublic,
        places: []
    });

    try {
        await createdUser.save();               // Save the user into the DB
    } catch (err) {
        const message = "Creating user failed, please try again later.";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }
    
    res.status(201).json({user:createdUser.toObject({getters: true}) });
}

async function loginUser(req: Request, res: Response, next: Next) {
    const errors = validationResult(req);           // Check error validation from express-validation
    if (!errors.isEmpty()){
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        throw new HttpError(message, errorCode);
    }
    
    const { email, password } = req.body;

    let existingUser:IUserSchema;
    try {
        existingUser = await UserModel.findOne({email: email});     // Look for user by the given email in the DB
    } catch(err){
        const message = "Loggin failed, please try again later";
        const errorCode = 500;
        const error =  new HttpError(message, errorCode);
        return next(error);
    }
    
    if (!existingUser || existingUser.password !== password){
        const message = 'Failed logging, email or password are incorrect';
        const errorCode = 401;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    res.status(200).json({message: "Logged in!"});
}

export {
    getUsers,
    createUser,
    loginUser
};