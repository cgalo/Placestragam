import mongoose, { Schema, Document } from 'mongoose';

import { IPlaceSchema } from '../types/schema-types';

const PlaceSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    address: {type: String, required: true},
    location: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    },
    creator: {type: String, required: true}
});

const PlaceModel = mongoose.model<IPlaceSchema>('Place', PlaceSchema);

export default PlaceModel;