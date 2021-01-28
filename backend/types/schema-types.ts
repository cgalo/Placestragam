/**
 * Schema interfaces utilized for Mongoose in the models directory
 */

import { Document } from 'mongoose';
import { Location } from './places-types';

export interface IPlaceSchema extends Document {
    title: String;
    description: String;
    image: String;
    address: String;
    location: Location;
    creator: String;
}