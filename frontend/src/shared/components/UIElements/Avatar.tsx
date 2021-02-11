import React from 'react';

import './Avatar.css';

interface AvatarProps {
    image: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    return (
        <div className={`avatar ${props.className}`}>
            <img 
                src={props.image}
                alt={props.alt}
            />
        </div>
    );
}

export default Avatar;