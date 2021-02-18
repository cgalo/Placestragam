// Interfaces from API responses
import type { IUser } from './user-types';
import type { Place } from './places-types';

export interface IGetResponse<T> {
    user?: IUser;
    users?: Array<T>;
    place?: Place;
    places?: Array<T>;
    message?: string;
}