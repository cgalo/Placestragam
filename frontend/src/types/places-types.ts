// Global interfaces for place/components

export interface Place {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: Coordinates;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}