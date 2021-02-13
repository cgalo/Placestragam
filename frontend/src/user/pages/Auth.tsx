import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { 
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import { IUser } from '../../types/user-types';

const Auth: React.FC<{}> = (props) => {
    const auth = useContext(AuthContext);                                   // Check if a user is signed in
    const [isLoginMode, setIsLoginMode] = useState(true);                   // Keep track if the user is logging in or signing up
    const { isLoading, error, sendRequest, clearError} = useHttpClient();   // To handle http request & error handlding

    const [formState, inputHandler, setFormData] = useForm ({               // Keep track of the form state
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        // Switch between logging and signup mode
        if (!isLoginMode) {
            // If we are in signup mode
            setFormData({
                ...formState.inputs,
                first_name: undefined,
                last_name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            // We are in loggin mode
            setFormData({
                ...formState.inputs,
                first_name: {
                    value: '',
                    isValid: false
                },
                last_name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);    // Flip the mode
    }

    const loginRequest = async () => {      // Called when a user is attempting to login
    
        // Setup the information needed to make the request for the httpCliet.sendRequest()
        const headers =  { 'Content-Type': 'application/json' };
        const method = 'POST';
        const body = JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        });
        const url = 'http://localhost:5000/api/users/login';

        try {
            const response = await sendRequest<IUser>(url, method, body, headers);  // Send the request to the backend
            const user = response.user;
            if (user){
                auth.login(user.id);
            }
        }
        catch(err){
            // The error state is handled inside the useHttpClient hook, therefore we can just log it
            console.log(err);
        }
    }

    const signupRequest = async() => {  // Called when a user is trying to create an account
        const headers = { 'Content-Type': 'application/json' };
        const method = 'POST';
        const body = JSON.stringify({
            first_name: formState.inputs.first_name.value,
            last_name:  formState.inputs.last_name.value,
            email:      formState.inputs.email.value,
            password:   formState.inputs.password.value,
            isPublic:   true,
            image: 
                "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b459761-7VN7G9wf2mfN.jpg"
        })
        const url = 'http://localhost:5000/api/users/signup';
        try {
            const responseData = await sendRequest(url, method, body, headers);
            const user = responseData.user;
            if (user){
                auth.login(user.id);
            }
        }
        catch (err) {
            // The error state is handled inside the useHttpClient hook, therefore we can just log it
            console.log(err); 
        }
    }

    const formSubmitHandler = async (event:React.FormEvent) => {
        event.preventDefault();
        if (isLoginMode) {
            // User is attempting to login
            loginRequest();
        } 
        else {
            // User is attempting to signup
            signupRequest();
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form className="" onSubmit={formSubmitHandler}>
                    {!isLoginMode && (
                        <React.Fragment>
                            <Input 
                                id="first_name"
                                element="input"
                                type="text"
                                label="First Name"
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                errorText={"Please enter your first name."}
                            />
                            <Input 
                                id="last_name"
                                element="input"
                                type="text"
                                label="Last Name"
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                errorText={"Please enter your last name."}
                            />
                        </React.Fragment>
                    )}
                    <Input 
                        id="email"
                        type="email"
                        element="input"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText={"Please enter a valid email."}
                    />

                    <Input 
                        id="password"
                        type="password"
                        element="input"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        onInput={inputHandler}
                        errorText="Please enter a password with at least 6 characters."
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </React.Fragment>
    );
}

export default Auth;