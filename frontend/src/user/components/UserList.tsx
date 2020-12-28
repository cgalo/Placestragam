import React from 'react';

import UserItem from './UserItem';
import {User} from './types';
import './UserList.css';

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
                    key={user.id.valueOf()}
                    id={user.id} 
                    image={user.image} 
                    name={user.name} 
                    placeCount={user.places} />
            ))}
        </ul>
    );
}

export default UserList;