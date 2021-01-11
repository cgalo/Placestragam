/**
 * Handles routing, mapping paths, http methods to controllers for places
*/

import { Router } from 'express';
import { check } from 'express-validator';

import * as placesController from '../controllers/places-controllers';

const route = Router();

route.get('/:pId', placesController.getPlaceById);

route.get('/user/:uId', placesController.getPlacesByUserId);

route.post('/', 
[
    check('title')
        .notEmpty(),
    check('description')
        .isLength({min: 5}),
    check('address')
        .notEmpty()
],
    placesController.createPlace
);

route.delete('/:pId', placesController.deletePlace);

route.patch('/:pId', 
    [
        check('title')
            .notEmpty(),
        check('description')
            .isLength({min: 5})
    ],
    placesController.updatePlace    
);

export = route;