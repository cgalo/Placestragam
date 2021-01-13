/**
 * Interfaces for relating to the util directory
*/

// Response type from google when making a Geocoding location equest
export interface GeoCodeResponsePayload {
    results: google.maps.GeocoderResult[];
    status: google.maps.GeocoderStatus;
}