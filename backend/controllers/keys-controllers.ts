/**
 * This controller will allow to fetch API keys from the .env to the front-end.
 * This ensures that API keys remain protected when building the React application
 * https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import * as dotenv from 'dotenv';

// Models
import HttpError from '../models/http-error';

async function getGoogleAPI(req: Request, res: Response, next: Next) {
    const key:string  = process.env.GOOGLE_MAPS_API_KEY || "";

    res.status(200).json({key: key});
}

export {
    getGoogleAPI
}