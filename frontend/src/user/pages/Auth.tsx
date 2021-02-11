import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useForm } from '../../shared/hooks/form-hook';
import { 
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth: React.FC<{}> = (props) => {
    const auth = useContext(AuthContext);                       // Check if a user is signed in
    const [isLoggingMode, setIsLoggingMode] = useState(true);   // Keep track if the user is logging in or signing up
    const [isLoading, setIsLoading] = useState(false);          // This will change when we do requests
    const [error, setError] = useState("");              // This will change if we get an error

    const [formState, inputHandler, setFormData] = useForm ({   // Keep track of the form state
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
        if (!isLoggingMode) {
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
        setIsLoggingMode(prevMode => !prevMode);    // Flip the mode
    }

    const formSubmitHandler = async (event:React.FormEvent) => {
        event.preventDefault();

        if (isLoggingMode) {
        } else {
          try {
            setIsLoading(true);     // Set loading state to true as we are about to perform a request
            const response = await fetch('http://localhost:5000/api/users/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                first_name: formState.inputs.first_name.value,
                last_name: formState.inputs.last_name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                isPublic: true,
                image: 
                "https://c4.wallpaperflare.com/wallpaper/1012/53/295/monogatari-series-hachikuji-mayoi-anime-girls-twintails-wallpaper-thumb.jpg"
              })
            });
    
            const responseData = await response.json();
            // console.log(responseData);
            if (response.ok){
                auth.login();       // Set the user as logged in 
            }
            else {
                console.log("Else we got an error here boiii")
                throw new Error(responseData.message);
            }
            
          } catch (err) {
            console.log(err);
            setError(err.message || "Something went wrong, please try again.");
          }
          setIsLoading(false);
        }
    };

    const errorHandler = ():void => {
        setError('');
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form className="" onSubmit={formSubmitHandler}>
                    {!isLoggingMode && (
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
                        {isLoggingMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoggingMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </React.Fragment>
    );
}

export default Auth;