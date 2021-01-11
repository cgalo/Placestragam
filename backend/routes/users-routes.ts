/**
 * Handles routing, mapping paths, http methods to controllers for users
*/

import { Router } from 'express';

import * as usersController from '../controllers/users-controller';

const route = Router();

route.get('/', usersController.getUsers);

route.post('/signup', usersController.createUser);

route.post('/login', usersController.loginUser)

export = route;