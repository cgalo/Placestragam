// Interfaces from API responses

import type { IUser } from './user-types';

export interface IGetUserResponse {
    users: IUser[];
    message?: string;
}