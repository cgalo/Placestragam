import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

import { IUser } from '../../types/user-types';
import './UserList.css';

interface UserListProps {
    items: Array<IUser>;         // List of users
}

const UserList: React.FC<UserListProps> = (props) => {
    if  (props.items.length === 0){
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
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
                    name={user.first_name + " " + user.last_name} 
                    placeCount={user.places.length} />
            ))}
        </ul>
    );
}

export default UserList;