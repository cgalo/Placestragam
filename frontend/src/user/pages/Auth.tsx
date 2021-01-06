import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import { useForm } from '../../shared/hooks/form-hook';
import { 
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import './Auth.css';

const Auth: React.FC<{}> = (props) => {

    const [isLoggingMode, setIsLoggingMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm ({
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

    const formSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting form...");
        console.log(formState.inputs);
        
    };

    return (
        <Card className="authentication">
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
    );
}

export default Auth;