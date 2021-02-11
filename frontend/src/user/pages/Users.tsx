import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import type { IUser as User } from '../../types/user-types';
import type { IGetResponse as Response } from '../../types/api-types';

const emptyUsers: User[] = [];

const Users: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadedUsers, setLoadedUsers] = useState(emptyUsers);

    useEffect(() => {
        const sendRequest = async() => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData:Response<User> = await response.json();
                console.log(responseData);

                if (response.ok && responseData.users){
                    setLoadedUsers(responseData.users);                    
                } else{
                    throw new Error(responseData.message);
                }
            } catch(err){
                setError(err.message);
            }
            setIsLoading(false);
        }
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError('');   // Clear error message
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} /> 
            {isLoading && 
                <div className="center">
                    <LoadingSpinner asOverlay={false} />
                </div>
            }
            {!isLoading && (loadedUsers) && <UserList items={loadedUsers}/>}
        </React.Fragment>
    );
}

export default Users;