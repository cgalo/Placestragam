import React, { useReducer } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

interface InputProp {
    type: String;
    label: String;
    validators: Array<any>;
    errorText?:String;
    id: String | string;
    element: String;
    placeholder?: String | string;
    rows?: Number | number;
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
        value: '', 
        isValid: false,
        isTouched: false
    });

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
            id={props.id.valueOf()}
            type={props.type.valueOf()}
            placeholder={props.placeholder?.valueOf()}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />
    ) : (
        <textarea 
            id={props.id.valueOf()} 
            rows={props.rows?.valueOf() || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />
    );


    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched
            && 'form-control--invalid'}`}
        >
            <label htmlFor={props.id.valueOf()}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;