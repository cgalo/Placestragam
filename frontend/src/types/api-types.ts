// Interfaces from API responses
import type { IUser } from './user-types';

export interface IGetResponse<T> {
    user?: IUser;
    users?: Array<T>;
    places?: Array<T>;
    message?: string;
}