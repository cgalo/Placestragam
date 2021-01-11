/**
 * Controller to handle the middleware functions that are reached for
 * 'users' routes.
*/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { v4 as uuidv4 } from 'uuid';

import HttpError from '../models/http-error';
import type { User } from '../types/users-types';

const DUMMY_USERS:Array<User> = [
    // We'll be replaced when we link a DB
    {
        id: 'u1',
        email: "ckasdmc@somethign.com",
        password: "yourMom",
        first_name: 'John',
        last_name:'Smith',
        isPublic: true,
        image: 
        'https://s4.anilist.co/file/anilistcdn/character/large/n127595-IOMRQyMSypre.png'
    },
    {
        id: 'u2',
        email: "ckasdmc@somethign.com",
        password: "yourMom",
        first_name: 'Carlos',
        last_name:'Galo',
        isPublic: true,
        image: 
        'https://s4.anilist.co/file/anilistcdn/character/large/b127222-IY5iDRuXLY8i.png'
    }
];

function getUsers(req: Request, res: Response, next: Next) {
    const users = DUMMY_USERS.filter(u => (u.isPublic));
    res.status(200).json({users: users});
}

function createUser(req: Request, res: Response, next: Next) {
    const { 
        first_name, 
        last_name, 
        public_profile, 
        image, 
        email, 
        password 
    } = req.body;

    const isUser = DUMMY_USERS.find(u => u.email === email);    // Check if user exists
    if (isUser) {
        // If user exists already
        const message = "Email is already in use";
        const errorCode = 422;
        throw new HttpError(message, errorCode);
    }

    const createdUser:User = {
        id: uuidv4(),
        first_name: first_name,
        last_name: last_name,
        image: image,
        isPublic: public_profile,
        password: password,
        email: email
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({user:createdUser});
}

function loginUser(req: Request, res: Response, next: Next) {
    const { email, password } = req.body;
    
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password){
        const message = 'Email or password are incorrect';
        const errorCode = 401;
        throw new HttpError(message, errorCode);
    }

    res.status(200).json({message: "Logged in!"});

}

export {
    getUsers,
    createUser,
    loginUser
};