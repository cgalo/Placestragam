import React from 'react';

import './UserList.css';
import UserItem from './UserItem';
import {User} from './types';

interface UserListProps {
    items: Array<User>;         // List of users
}

const UserList: React.FC<UserListProps> = (props) => {
    if  (props.items.length === 0){
        return (
            <div className="center">
                <h2>No users found.</h2>
            </div>
        );
    }
    
    return (
        <ul className="users-list">
            {props.items.map(user => (
                <UserItem 
                    key={user.id} 
                    id={user.id} 
                    image={user.image} 
                    name={user.name} 
                    placeCount={user.places} />
            ))}
        </ul>
    );
}

export default UserList;