import React from 'react';

import './UserItem.css';

interface UserItemProps {
    id: any;
    image: String;
    name: String;
    placeCount: number;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    return (
        <li className="user-item">
            <div className="user-item__content">
                <div className="user-item__image">
                    <img src={props.image.valueOf()} alt={props.name.valueOf()}/>
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </div>
        </li>
    );
}

export default UserItem;