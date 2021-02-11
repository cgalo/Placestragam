import express, { 
    Request, 
    Response, 
    NextFunction as Next
} from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import placesRoute from './routes/places-routes';
import usersRoute from './routes/users-routes';
import HttpError from './models/http-error';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: Next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/places', placesRoute);

app.use('/api/users', usersRoute);

app.use ((req:Request, res:Response, next:Next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error:HttpError, req:Request, res:Response, next:Next) => {
    if (res.headersSent) {
        return next(error);
      }
      res.status(error.errorCode || 500)
      res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
    .connect(process.env.MONGO_DB_URI || "")
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });