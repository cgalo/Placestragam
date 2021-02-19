/**
 * Schema interfaces utilized for Mongoose in the models directory
 */

import { Document } from 'mongoose';
import type { Location } from './util-types';

export interface IPlaceSchema extends Document {
    title: String;
    description: String;
    image: String;
    address: String;
    location: Location;
    creator: IUserSchema['id'];
}

export interface IUserSchema extends Document {
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    places: Array<IPlaceSchema['id']>;
    isPublic: Boolean;
}