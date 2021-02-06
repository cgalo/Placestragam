/**
 * Interfaces for relating to the util directory
*/

// Response type from google when making a Geocoding location equest
export interface GeoCodeResponsePayload {
    results: google.maps.GeocoderResult[];
    status: google.maps.GeocoderStatus;
}

// Save the given lat and long provided by Google
export interface Location {
    latitude: number;
    longitude: number;
}