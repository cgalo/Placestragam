/**
 * Interfaces for relating to the Users
*/

export interface User {
    id: String;
    first_name: String;
    last_name: String;
    image: String;
    isPublic: Boolean;
    email: String;
    password: String;
}