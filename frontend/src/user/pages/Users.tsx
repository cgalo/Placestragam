import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import type { IUser as User } from '../../types/user-types';

const emptyUsers: User[] = [];

const Users: React.FC<{}> = () => {
    const [loadedUsers, setLoadedUsers] = useState(emptyUsers);             // Users to display    
    const { isLoading, error, sendRequest, clearError } = useHttpClient();  // To handle http request & error handlding

    useEffect(() => {
        const getUsers = async() => {
            try {
                const url = 'http://localhost:5000/api/users', method = 'GET';  // Data needed to fetch users
                const responseData = await sendRequest<User>(url, method, null, {});
                const users:User[] = responseData.users || [];              // Get the list of users from the response
                setLoadedUsers(users);                                      // Set the users to display
            } catch(err){
                // The error state is handled inside the useHttpClient hook, therefore we can just log it
                console.log(err);                               
            }
        }
        getUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} /> 
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