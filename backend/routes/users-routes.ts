/**
 * Handles routing, mapping paths, http methods to controllers for users
*/

import { Router } from 'express';
import { check } from 'express-validator';

import * as usersController from '../controllers/users-controllers';

const route = Router();

route.get('/', usersController.getUsers);

route.post('/signup', 
    [
        check('first_name')
            .notEmpty(),
        check('last_name')
            .notEmpty(),
        check('isPublic')
            .notEmpty(),
        check('email')
            .isEmail(),
        check('password')
            .isLength({min: 6}),
        check('image')
            .notEmpty()
    ],
    usersController.createUser
);

route.post('/login', 
    [
        check('email')
            .isEmail(),
        check('password')
            .isLength({min: 6})
    ],
    usersController.loginUser
);

export = route;