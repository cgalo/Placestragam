import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import { useForm } from '../../shared/hooks/form-hook';
import { 
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
} from '../../shared/util/validators';
import './Auth.css';

const Auth: React.FC<{}> = (props) => {

    const [isLogged, setIsLogged] = useState(false);
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

    const formSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting form...");
        console.log(formState);
        
    };

    if (isLogged) {
        return (
            <Card>
                <h2>You are logged in.</h2>
            </Card>
        );
    }

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form className="" onSubmit={formSubmitHandler}>
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
                    LOGIN
                </Button>
            </form>
        </Card>
    );
}

export default Auth;