// Global interfaces regarding Users

import type { Place } from './places-types';
export interface IUser {
    email: string;
    first_name: string;
    last_name: string;
    id: string;
    image: string;
    isPublic: boolean;
    places: Array<Place>;
}