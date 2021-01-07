import React from 'react';

import './Card.css';

interface CardProps {
    className?: String;
    style?: React.CSSProperties;
    children?: any;
}

const Card:React.FC<CardProps> = (props) => {
    return (
        <div className={`card ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
}

export default Card;