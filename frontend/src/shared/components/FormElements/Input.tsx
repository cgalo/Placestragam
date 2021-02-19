import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

interface InputProp {
    type: string;
    label: string;
    validators: Array<any>;
    onInput: (id: string, input: boolean, isInputValid: boolean) => any;
    errorText: string;
    id: string;
    element: string;
    placeholder?: string;
    rows?: number;
    initValue?: string | number;
    initValid?: boolean;
}

const inputReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': 
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

const Input:React.FC<InputProp> = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initValue  || '', 
        isValid: props.initValid || false,
        isTouched: false
    });

    const {id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)  => {
        dispatch({
            type: 'CHANGE', 
            val: e.target.value,
            validators: props.validators
        });
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });   
    }

    const element = props.element === 'input' ? (
        <input 
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />
    ) : (
        <textarea 
            placeholder={props.placeholder}
            id={props.id} 
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />
    );


    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched
            && 'form-control--invalid'}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;