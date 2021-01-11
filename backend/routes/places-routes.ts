/**
 * Handles routing, mapping paths, http methods to controllers for places
*/

import express, { Router } from 'express';

import * as placesController from '../controllers/places-controller';

const route = express.Router();

route.get('/:pId', placesController.getPlaceById);

route.get('/user/:uId', placesController.getPlacesByUserId);

route.post('/', placesController.createPlace);

route.delete('/:pId', placesController.deletePlace);

route.patch('/:pId', placesController.updatePlace);

export = route;