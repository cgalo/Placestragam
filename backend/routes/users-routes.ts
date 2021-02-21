/**
 * Handles routing, mapping paths, http methods to controllers for users
*/

import { Router } from 'express';
import { check } from 'express-validator';

import * as usersController from '../controllers/users-controllers';
import fileUpload from '../middleware/file-upload';

const route = Router();

route.get('/', usersController.getUsers);

route.post('/signup',
    fileUpload.single('image'),
    [
        check('first_name')
            .notEmpty(),
        check('last_name')
            .notEmpty(),
        check('isPublic')
            .notEmpty(),
        check('email')
            .normalizeEmail()
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
            .normalizeEmail()
            .isEmail(),
        check('password')
            .isLength({min: 6})
    ],
    usersController.loginUser
);

export = route;