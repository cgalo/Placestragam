import express from 'express';
import bodyParser from 'body-parser';

import placesRoute from './routes/places-routes';

const app = express();

app.use('/api/places', placesRoute);

app.listen('5000');