import express, { 
    Request, 
    Response, 
    NextFunction as Next
} from 'express';
import bodyParser from 'body-parser';

import placesRoute from './routes/places-routes';
import HttpError from './models/http-error';

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoute);

app.use((error:HttpError, req:Request, res:Response, next:Next ) => {
    if (res.headersSent) {
        return next(error);
      }
      res.status(error.errorCode || 500)
      res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen('5000');