/**
 * Handle the API request to Google's Geocoding service to get
 * coordinates given an address
*/

import axios from 'axios';
import * as dotenv from 'dotenv';

import HttpError from '../models/http-error';
import { Location } from '../types/util-types';
import { GeoCodeResponsePayload } from '../types/util-types';

const API_KEY:string = process.env.GOOGLE_MAPS_API_KEY || "";

async function getCoordsForAddress(address:string) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=
        ${encodeURI(address)}
        &key=${API_KEY}`
    );
    
    const data:GeoCodeResponsePayload = response.data;
    
    if (!data || data.status === 'ZERO_RESULTS'){
        // User entered valid address but it can't be found from Google
        const message = "Could not find location for the specified address.";
        const errorCode = 422;
        throw new HttpError(message, errorCode);
    }

    const {lat, lng} = data.results[0].geometry.location;  // Get coordinates from response
    const location:Location = {                             // Convert response to Location object
        latitude: Number(lat),
        longitude: Number(lng)
    }
    
    return location;                                        // Return final location object
}

export default getCoordsForAddress;