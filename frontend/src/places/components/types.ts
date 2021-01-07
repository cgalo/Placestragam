// Global interfaces for place/components

export interface Place {
    id: String;
    imageUrl: String;
    title: String;
    description: String;
    address: String;
    creator: String;
    location: Coordinates;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}