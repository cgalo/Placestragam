import React from  'react';

import './Map.css';

interface MapProp {
    className?: String;
    style?: React.CSSProperties;
}

const Map:React.FC<MapProp> = (props) => {
    return (
        <div 
            className={`map ${props.className}`} 
            style={props.style}
        >

        </div>
    );
}

export default Map;