/**
 * Interfaces for relating to the Places
 */

export interface Place {
    id: String;
    title: String;
    description: String;
    location: Location;
    address: String;
    creator: String;
}

export interface Location {
    latitude: number;
    longitude: number;
}