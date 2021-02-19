import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false, 
    login: (uId:string) => {}, 
    logout: () => {},
    userId: ''
});