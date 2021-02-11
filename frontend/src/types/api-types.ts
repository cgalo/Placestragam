// Interfaces from API responses

import type { IUser } from './user-types';

export interface IUserResponse extends IUser {
    // When fetching all users from backend
    __v: number;
    _id: string;
}