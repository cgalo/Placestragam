import { useCallback, useReducer } from 'react';

interface FormType {
  inputs: String | Number;
  isValid: Boolean; 
}

const formReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
};

export const useForm = (initialInputs: any, initialFormValidity: any) => {

  const form: FormType = {
    inputs: initialInputs,
    isValid: initialFormValidity
  }
  const [formState, dispatch] = useReducer(formReducer, form);

  const inputHandler = useCallback ((id, input, isInputValid) => {
    dispatch({
      type: 'INPUT_CHANGE', 
      value: input, 
      isValid: isInputValid, 
      inputId: id
    });
  }, [dispatch]);

  return [formState, inputHandler];
};