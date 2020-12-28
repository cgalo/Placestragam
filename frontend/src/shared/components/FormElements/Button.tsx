import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

interface ButtonProp {
    href?: String;
    to?: String;
    size?: Number;
    inverse?: boolean;
    danger?: boolean;
    exact?: boolean;
    onClick?: () => void;
    type?: any;
    disabled?: boolean;
}

const Button:React.FC<ButtonProp> = (props) => {
    
    if (props.href) {
        return (
            <a 
                className={`button button--${props.size || 'default'} ${props.inverse &&
                    'button--inverse'} ${props.danger && 'button--danger'}`}
                href={props.href.valueOf()}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
          <Link
            to={props.to.valueOf()}
            // exact={props.exact}
            className={`button button--${props.size || 'default'} ${props.inverse &&
              'button--inverse'} ${props.danger && 'button--danger'}`}
          >
            {props.children}
          </Link>
        );
      }
      return (
        <button
          className={`button button--${props.size || 'default'} ${props.inverse &&
            'button--inverse'} ${props.danger && 'button--danger'}`}
          type={props.type}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
}

export default Button;