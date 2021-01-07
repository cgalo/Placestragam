import React from 'react';

import UserList from '../components/UserList';
import {User} from '../components/types';

const USERS: Array<User> = [
    {
        id: 'u1',
        name: 'Carlos Galo',
        image: 
        'https://s4.anilist.co/file/anilistcdn/character/large/n127596-L3R94Ds2OX1v.png',
        places: 3
    }
];

const Users: React.FC<{}> = () => {

    return (
        <UserList items={USERS}/>
    );
}

export default Users;