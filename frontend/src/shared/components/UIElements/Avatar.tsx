import React from 'react';

import './Avatar.css';

interface AvatarProps {
    image: String;
    alt: String;
    className?: String;
    style?: React.CSSProperties;
    width?: Number;
    height?: Number;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    return (
        <div className={`avatar ${props.className}`}>
            <img 
                src={props.image.valueOf()}
                alt={props.alt.valueOf()}
            />
        </div>
    );
}

export default Avatar;