/**
 * Handles routing, mapping paths, http methods to controllers for places
*/

import express, { Router } from 'express';

import * as placesController from '../controllers/places-controller';

const route = express.Router();

route.get('/:pId', placesController.getPlacesById);

route.get('/user/:uId', placesController.getPlaceByUserId);

route.post('/', placesController.createPlace);

export = route;