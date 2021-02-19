/**
 * Handles API key requests
 */

import { Router } from 'express';

import * as keysController from '../controllers/keys-controllers';

const route = Router();

route.get('/google', keysController.getGoogleAPI);

export = route;
