/**
 * Handles routing, mapping paths, http methods to controllers for places
*/

import express from 'express';

import * as placesController from '../controllers/places-controller';

const route = express.Router();

route.get('/:pId', placesController.getPlaceByUserId);

route.get('/user/:uId', placesController.getPlaceByUserId);

export = route;